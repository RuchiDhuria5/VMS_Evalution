// app/QuotationPage.tsx
"use client";
import React from "react";
import Header1 from "../components/vendorcomponents/Header1";
import CompanyDetails from "../components/vendorcomponents/CompanyDetails";
import RFQDetails from "../components/vendorcomponents/RFQDetails";
import VendorDetails from "../components/vendorcomponents/VendorDetails";
import PaymentTerms from "../components/vendorcomponents/PaymentTerms";
import Footer1 from "../components/vendorcomponents/Footer1";

export default function QuotationPage(){
  return (
    <div className="bg-blue-50 min-h-screen py-10">
      <div className="bg-white max-w-screen-xl mx-auto p-6 text-sm space-y-10 rounded-xl shadow-lg">

        {/* page Header */}
        <Header1/>

        <hr className="border-t border-blue-500" />

        {/* Company Details */}
        <CompanyDetails />

        {/* RFQ Details */}
        <RFQDetails />

        <hr className="border-t border-blue-500" />

        {/* Vendor Details */}
        <VendorDetails/>

        {/* Payment Terms */}
        <PaymentTerms />

         <hr className="border-t border-blue-500" />
        
        <Footer1/>
        
        </div>
      </div>
    
  );
};


