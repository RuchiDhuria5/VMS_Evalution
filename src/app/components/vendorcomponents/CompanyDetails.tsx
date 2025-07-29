// components/CompanyDetails.tsx
import React from "react";

const Field = ({ label }: { label: string }) => (
  <div className="flex flex-col text-xs gap-1 min-w-[150px]">
    <span className="text-gray-600">{label}</span>
    <div className="border border-gray-300 rounded-xl px-3 py-1.5 bg-gray-50 text-sm" />
  </div>
);

const CompanyDetails = () => {
  const companyFields = ["Division", "Sr.No"];
  
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Details</h3>
      <div className="border border-gray-300 rounded-2xl p-4 grid grid-cols-2 gap-4">
        {companyFields.map((label, i) => <Field key={i} label={label} />)}
      </div>
    </div>
  );
};

export default CompanyDetails;