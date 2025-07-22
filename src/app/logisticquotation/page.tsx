"use client";
import React, { useState } from "react";
import { Trash2, Eye } from "lucide-react";

// Read-only field
const Field = ({ label }: { label: string }) => (
  <div className="flex flex-col text-xs gap-1 min-w-[150px]">
    <span className="text-gray-600">{label}</span>
    <div className="border border-gray-300 rounded-xl px-3 py-1.5 bg-gray-50 text-sm">
      no value
    </div>
  </div>
);

// Input field
const Input = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <div className="w-full">
    <label htmlFor={label} className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      id={label}
      type="text"
      placeholder={placeholder}
      className="w-full border border-gray-300 p-2 rounded-2xl transition-all duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500"
    />
  </div>
);

// Select field
const Select = ({ label }: { label: string }) => (
  <div className="w-full relative">
    <label htmlFor={label} className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <select
        id={label}
        className="w-full border border-gray-300 p-2 pr-10 rounded-2xl bg-white appearance-none transition-all duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500"
      >
        <option>Select</option>
        {[
          "Austrian schilling", "Indonesian Rupiah", "Afghani (OID)", "West indian Guilder",
          "Aruban Guilder", "Barbados Dollar", "United Arab Emirates Dirham",
          "Angolan New Kwanza (OID)", "Armenian Dram", "Bangladesh Taka", "Argentine Peso"
        ].map((currency, i) => (
          <option key={i}>{currency}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

const QuotationPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [warningMessage, setWarningMessage] = useState<string>("");

  const companyFields = ["Division", "Sr.No"];
  const logisticFields = [
    "RFQ CutOff", "RFQ Date", "Mode of Shipment", "Destination Port", "Port Code", "Port of Loading",
    "Inco Terms", "Ship to Address", "Package Type", "No of Pkg Units", "Product Category",
    "Vol Weight(KG)", "Actual Weight(KG)", "Invoice Date", "Invoice No", "Shipment Date",
    "Shipment Type", "Consignee Name", "Remarks"
  ];

  const totalCells = 20;
  const remainingEmptyCells = totalCells - (logisticFields.length + 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setWarningMessage("");
    }
  };

  const handleAddFile = () => {
    if (!selectedFile) {
      setWarningMessage("No file chosen. Please select a file before clicking Add.");
      return;
    }

    setFileList((prev) => [...prev, selectedFile]);
    setSelectedFile(null);
    setWarningMessage("");

    const input = document.getElementById("fileInput") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleDelete = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-blue-50 min-h-screen py-10">
      <div className="bg-white max-w-screen-xl mx-auto p-6 text-sm space-y-10 rounded-xl shadow-lg">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Quotation Data</h2>
          <div className="flex gap-3">
            <button className="bg-blue-500 text-white px-7 py-3 rounded-full hover:bg-blue-600 transition">Download PDF</button>
            <button className="border border-blue-500 px-7 py-3 rounded-full hover:bg-blue-100 transition">Back</button>
          </div>
        </div>

        <hr className="border-t border-blue-500" />

        {/* Company Details */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Details</h3>
          <div className="border border-gray-300 rounded-2xl p-4 grid grid-cols-2 gap-4">
            {companyFields.map((label, i) => <Field key={i} label={label} />)}
          </div>
        </div>

        <hr className="border-t border-blue-500" />

        {/* Logistic Details */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Logistic Details</h3>
          <div className="border border-gray-300 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {logisticFields.map((label, i) => <Field key={i} label={label} />)}

            <div className="flex flex-col text-xs gap-1 min-w-[150px]">
              <span className="text-gray-600">File Attachment</span>
              <div className="text-blue-600 flex items-center gap-1 cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Download File</span>
              </div>
            </div>

            {Array.from({ length: remainingEmptyCells }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
          </div>
        </div>

        <hr className="border-t border-blue-500" />

        {/* Service Provider Form */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Details to be Filled by Service Provider</h3>
          <div className="border border-gray-300 rounded-2xl p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Input label="Name" placeholder="Enter Name" />
              <Input label="Chargeable Weight (kg)" placeholder="Enter Weight" />
              <Input label="Rate/kg*" placeholder="Enter Rate" />
              <Input label="Fuel surcharge*" placeholder="Enter Fuel Surcharge" />
              <Input label="Surcharge" placeholder="Enter Surcharge" />
              <Input label="X-Ray" placeholder="Enter X-Ray" />
              <Input label="Pick Up/Origin" placeholder="Enter Pick-up Location" />
              <Input label="Ex Works" placeholder="Enter Ex Works Value" />
              <Input label="Total Freight*" placeholder="Enter Total Freight" />
              <Select label="From Currency *" />
              <Select label="To Currency *" />
              <Input label="XR (XE.COM)*" placeholder="Enter XE Conversion Rate" />
              <Input label="Total Freight INR*" placeholder="Enter Freight in INR" />
              <Input label="Destination Charges (INR)*" placeholder="Enter Destination Charges" />
              <Input label="Shipping Line Charges*" placeholder="Enter Shipping Charges" />
              <Input label="CSF Charges*" placeholder="Enter CSF Charges" />
              <Input label="Total Landing Price (INR)*" placeholder="Enter Landing Price" />
              <Input label="Transit Days*" placeholder="Enter Transit Days" />
              <Input label="Remarks*" placeholder="Enter Remarks" />
            </div>
          </div>
        </div>

        <hr className="border-t border-blue-500" />

        {/* Attachments */}
        <div className="space-y-4 border border-gray-300 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800">Attachment Upload</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            <button
              onClick={handleAddFile}
              className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>

          {warningMessage && (
            <p className="text-red-600 text-sm">{warningMessage}</p>
          )}

          {fileList.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full mt-4 border border-gray-300 text-sm">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Sr. No</th>
                    <th className="px-4 py-2 text-left">File Name</th>
                    <th className="px-4 py-2 text-left">View</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fileList.map((file, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{file.name}</td>
                      <td className="px-4 py-2">
                        <a
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </a>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <hr className="border-t border-blue-500" />

        {/* Quote + Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="w-full md:w-auto">
            <label htmlFor="quoteAmount" className="block mb-1 text-xl font-medium text-gray-800">Quote Amount*</label>
            <input
              id="quoteAmount"
              type="text"
              className="w-full border border-gray-300 px-10 py-2 rounded-xl transition-all duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500"
            />
          </div>
          <div className="flex gap-4 ml-auto">
            <button className="border-2 border-blue-500 px-7 py-3 rounded-3xl hover:bg-blue-100 transition">
              Discard
            </button>
            <button className="bg-blue-500 px-7 py-3 rounded-3xl text-white hover:bg-blue-600 transition">
              Place Bid
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuotationPage;

