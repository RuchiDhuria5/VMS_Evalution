// components/PaymentTerms.tsx
"use client";
import React, { useState } from "react";

const PaymentTerms = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    // Reset end date if it's before the new start date
    if (endDate && new Date(endDate) < new Date(newStartDate)) {
      setEndDate('');
    }
  };

  return (
    <div className="border border-gray-300 rounded-2xl p-6 space-y-6">
      {/* Pay Terms and Radio */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="w-full sm:w-1/2">
          <label htmlFor="payterms" className="text-sm font-medium text-gray-700">
            Pay terms
          </label>
          <input
            type="text"
            id="payterms"
            placeholder="Enter pay terms"
            className="border border-gray-300 w-full py-2.5 px-4 rounded-2xl focus:outline-none focus:border-blue-500 hover:border-blue-500 transition"
          />
        </div>

        <div className="flex flex-col gap-2 mt-5 px-3">
          <label className="flex items-center gap-2">
            <input type="radio" name="paymentTerms" className="accent-blue-500" />
            Negotiable
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="paymentTerms" className="accent-blue-500" />
            Non-Negotiable
          </label>
        </div>
      </div>

      {/* Validity Start and End */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Validity Start
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            Validity End
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            disabled={!startDate}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      {/* Tax Field */}
      <div className="w-full sm:w-1/2">
        <label htmlFor="tax" className="text-sm font-medium text-gray-700">Tax (%)</label>
        <input
          type="text"
          placeholder="Enter Tax"
          className="border border-gray-300 w-full py-2.5 px-4 rounded-2xl focus:outline-none focus:border-blue-500 hover:border-blue-500 transition"
          onChange={(e) => {
            const value = e.target.value;
            const cleanedValue = value.replace(/[^0-9.%]/g, '');
            const validValue = cleanedValue.replace(/%+/, '%').replace(/%$/, '') + (cleanedValue.includes('%') ? '%' : '');
            e.target.value = validValue;

            const numericValue = parseFloat(value.replace('%', ''));
            console.log('Parsed value:', numericValue);
          }}
        />
      </div>
    </div>
  );
};

export default PaymentTerms;
