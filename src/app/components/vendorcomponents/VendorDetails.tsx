"use client";
import React, { useState } from "react";
import { Trash2, Eye } from "lucide-react";

type VendorForm = {
  MOQ: string;
  materialDesc: string;
  leadTime: string;
  delivery: string;
  Rate: string;
  attachment?: File;
};

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="w-full">
    <label htmlFor={label} className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded-2xl transition-all duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500"
    />
  </div>
);

const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className="w-full">
    <label htmlFor={label} className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded-2xl transition-all duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500 resize-y"
      rows={4}
    />
  </div>
);

const VendorDetails = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [vendorList, setVendorList] = useState<VendorForm[]>([]);
  const [vendorWarning, setVendorWarning] = useState("");
  const [vendorForm, setVendorForm] = useState<VendorForm>({
    MOQ: "",
    materialDesc: "",
    leadTime: "",
    delivery: "",
    Rate: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setVendorWarning("");
    }
  };

  const handleVendorDelete = (index: number) => {
    setVendorList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVendorChange = (field: keyof VendorForm, value: string) => {
    setVendorForm({ ...vendorForm, [field]: value });
    setVendorWarning("");
  };

  const addVendor = () => {
    const { MOQ, materialDesc, leadTime, delivery, Rate } = vendorForm;

    if (!MOQ || !materialDesc || !leadTime || !delivery || !Rate || !selectedFile) {
      setVendorWarning("Please fill all fields and attach a file before adding a vendor.");
      return;
    }

    setVendorList((prev) => [...prev, { ...vendorForm, attachment: selectedFile }]);
    setVendorForm({ MOQ: "", materialDesc: "", leadTime: "", delivery: "", Rate: "" });
    setSelectedFile(null);
    setVendorWarning("");
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Details to be filled by vendor</h3>
      <div className="border border-gray-300 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Input
            label="Rate"
            placeholder="Enter rate"
            value={vendorForm.Rate}
            onChange={(e) => handleVendorChange("Rate", e.target.value)}
          />
          <Input
            label="Lead Time"
            placeholder="Enter lead time"
            value={vendorForm.leadTime}
            onChange={(e) => handleVendorChange("leadTime", e.target.value)}
          />
          <Input
            label="Delivery"
            type="date"
            placeholder="Select delivery date"
            value={vendorForm.delivery}
            onChange={(e) => handleVendorChange("delivery", e.target.value)}
          />
          <Textarea
            label="Material Desc"
            placeholder="Enter material description"
            value={vendorForm.materialDesc}
            onChange={(e) => handleVendorChange("materialDesc", e.target.value)}
          />
          <Input
            label="MOQ"
            placeholder="Enter MOQ"
            value={vendorForm.MOQ}
            onChange={(e) => handleVendorChange("MOQ", e.target.value)}
          />
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-800">Attachment Upload</h3>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
        </div>

        <button
          onClick={addVendor}
          className="bg-blue-500 text-white px-6 py-2 rounded-2xl hover:bg-blue-600"
        >
          Add
        </button>

        {vendorWarning && <p className="text-red-600 text-sm">{vendorWarning}</p>}

        {vendorList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full mt-4 border border-gray-300 text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left">Sr. No</th>
                  <th className="px-4 py-2 text-left">Material Desc</th>
                  <th className="px-4 py-2 text-left">Lead Time</th>
                  <th className="px-4 py-2 text-left">Delivery</th>
                  <th className="px-4 py-2 text-left">Rate</th>
                  <th className="px-4 py-2 text-left">MOQ</th>
                  <th className="px-4 py-2 text-left">Attachment</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {vendorList.map((vendor, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{vendor.materialDesc}</td>
                    <td className="px-4 py-2">{vendor.leadTime}</td>
                    <td className="px-4 py-2">{vendor.delivery}</td>
                    <td className="px-4 py-2">{vendor.Rate}</td>
                    <td className="px-4 py-2">{vendor.MOQ}</td>
                    <td className="px-4 py-2">
                      {vendor.attachment ? (
                        <button
                          onClick={() => {
                            const fileURL = URL.createObjectURL(vendor.attachment!);
                            window.open(fileURL, "_blank");
                          }}
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400">No File</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleVendorDelete(index)}
                        className="text-red-600 hover:text-red-800"
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
    </div>
  );
};

export default VendorDetails;
