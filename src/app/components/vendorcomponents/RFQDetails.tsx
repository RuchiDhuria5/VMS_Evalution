// components/RFQDetails.tsx
import React from "react";

const Field = ({ label }: { label: string }) => (
  <div className="flex flex-col text-xs gap-1 min-w-[150px]">
    <span className="text-gray-600">{label}</span>
    <div className="border border-gray-300 rounded-xl px-3 py-1.5 bg-gray-50 text-sm" />
  </div>
);

const RFQDetails = () => {
  const logisticFields = [
    "RFQ CutOff", "RFQ Date", "Mode of Shipment", "Destination Port", "Port Code", "Port of Loading",
    "Inco Terms", "Ship to Address", "Package Type", "No of Pkg Units", "Product Category",
    "Vol Weight(KG)", "Actual Weight(KG)", "Invoice Date", "Invoice No", "Shipment Date",
    "Shipment Type", "Consignee Name", "Remarks"
  ];
  const totalCells = 20;
  const remainingEmptyCells = totalCells - (logisticFields.length + 1);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">RFQ Details</h3>
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
  );
};

export default RFQDetails;