"use client";

import React, { useState, useRef, useEffect } from "react";

export default function SupplierEvaluationForm() {
  const evaluationTable = [
    ["100% Compliance", 30, "ISO/ANV Certification", 30, "On Time", 10, "Lowest (L1)", 20, "100% Commitment", 10],
    ["95% Compliance", 24, "Non ISO but Excellent system performance", 24, "1-2 Weeks Late", 8, "2nd Lowest (L2)", 16, "95% Commitment", 8],
    ["90% Compliance", 15, "Non ISO but Good system performance", 15, "3-4 Weeks Late", 5, "3rd Lowest (L3)", 10, "90% Commitment", 5],
    ["85% Compliance", 6, "Basic Quality Processes", 6, "4-5 Weeks Late", 2, "4th Lowest (L4)", 4, "85% Commitment", 2],
  ];

  const [selectedIndices, setSelectedIndices] = useState(Array(5).fill(-1));
  const [preparedSignature, setPreparedSignature] = useState("");
  const [approvedSignature, setApprovedSignature] = useState("");
  const preparedCanvasRef = useRef(null);
  const approvedCanvasRef = useRef(null);
  const [isDrawingPrepared, setIsDrawingPrepared] = useState(false);
  const [isDrawingApproved, setIsDrawingApproved] = useState(false);

  const handleSelection = (col, rowIndex) => {
    const updated = [...selectedIndices];
    updated[col] = rowIndex;
    setSelectedIndices(updated);
  };

  const getScore = (col) => {
    const rowIndex = selectedIndices[col];
    return rowIndex >= 0 ? evaluationTable[rowIndex][col * 2 + 1] : 0;
  };

  const totalScore = [0, 1, 2, 3, 4].reduce((sum, col) => sum + getScore(col), 0);
  const grade = totalScore === 0 ? "" : totalScore >= 70 ? "Grade-A" : totalScore >= 41 ? "Grade-B" : "Grade-C";

  const parameters = [
    "Quality of Items",
    "Quality System of Supplier",
    "Delivery Performance",
    "Price",
    "Quantity Commitment",
  ];

  const startDrawing = (e, canvasRef, setIsDrawing) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e, canvasRef, isDrawing, setIsDrawing) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = (setIsDrawing) => {
    setIsDrawing(false);
  };

  const saveSignature = (canvasRef, setSignature) => {
    const canvas = canvasRef.current;
    setSignature(canvas.toDataURL());
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const clearSignature = (canvasRef, setSignature) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature("");
  };

  useEffect(() => {
    const preparedCanvas = preparedCanvasRef.current;
    const approvedCanvas = approvedCanvasRef.current;
    const preparedCtx = preparedCanvas.getContext("2d");
    const approvedCtx = approvedCanvas.getContext("2d");
    preparedCtx.strokeStyle = "black";
    preparedCtx.lineWidth = 2;
    approvedCtx.strokeStyle = "black";
    approvedCtx.lineWidth = 2;
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans py-10 px-4">
      <div className="w-full max-w-7xl mx-auto shadow-xl rounded-md bg-white p-6">
        {/* Full Width Header with Logo and Format Info */}
        <div className="w-full border-b-2 border-gray-300 p-6 md:px-12 flex flex-col lg:flex-row justify-between items-center bg-white mb-8">
          <div className="flex flex-col items-center lg:items-start">
            <img
              className="h-20 w-20 object-contain"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNeWQPPw3D0A-4GbBqyuGJa6KHFOa6cO3giQ&s"
              alt="logo"
            />
            <p className="text-gray-600 mt-1 text-sm italic">Diagnostics</p>
          </div>
          <div className="text-center lg:flex-1 mt-4 lg:mt-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 uppercase tracking-wide">
              Supplier Evaluation Form
            </h1>
          </div>
          <div className="text-sm text-gray-700 text-right mt-4 lg:mt-0">
            <p><span className="font-semibold">Format No:</span> XYZ-123</p>
            <p><span className="font-semibold">Supersedes No:</span> ABC-456</p>
          </div>
        </div>

        {/* Supplier Details Form */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Supplier Details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Supplier Name</label>
                <input type="text" placeholder="Enter Supplier Name" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block font-medium mb-1">Product Supplied</label>
                <input type="text" placeholder="Enter Product Name" className="w-full p-2 border rounded-md" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block font-medium mb-1">Period (From)</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
                <div className="w-1/2">
                  <label className="block font-medium mb-1">Period (To)</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Quantity Supplied</label>
                <input type="text" placeholder="Enter Quantity Supplied" className="w-full p-2Соответствие border rounded-md" />
              </div>
            </div>
          </form>
        </div>

        {/* Summary Table */}
        <div className="overflow-x-auto mb-8">
          <h2 className="text-xl font-bold text-blue-800 mb-3">Summary</h2>
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-2 text-left">Parameters</th>
                <th className="border p-2 text-center">Individual Score Obtained</th>
                <th className="border p-2 text-center">Total Score</th>
                <th className="border p-2 text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, index) => (
                <tr key={index}>
                  <td className="border p-2">{param}</td>
                  <td className="border p-2 text-center">{getScore(index)}</td>
                  {index === 0 && (
                    <>
                      <td className="border p-2 text-center font-semibold" rowSpan={parameters.length}>
                        {totalScore}
                      </td>
                      <td className="border p-2 text-center font-semibold" rowSpan={parameters.length}>
                        {grade || ""}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grade Criteria */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Grade and Acceptance Criteria</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li><strong>Grade-A:</strong> Total score 70 & above — <em>Continued as approved supplier</em></li>
            <li><strong>Grade-B:</strong> Total score between 41 to 69 — <em>Warning to improve</em></li>
            <li><strong>Grade-C:</strong> Total score ≤ 40 — <em>Discontinue</em></li>
          </ul>
        </div>

        {/* Evaluation Table */}
        <div className="overflow-x-auto mb-10">
          <h2 className="text-xl font-bold text-blue-800 mb-3">Evaluation Table</h2>
          <table className="w-full text-sm border border-gray-300 text-center">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {parameters.map((param, i) => (
                  <th key={i} colSpan={2} className="border p-2">{param}</th>
                ))}
              </tr>
              <tr>
                {parameters.map((_, i) => (
                  <React.Fragment key={i}>
                    <th className="border p-2">Criteria</th>
                    <th className="border p-2">Score</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {evaluationTable.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {[0, 1, 2, 3, 4].map((colIndex) => (
                    <React.Fragment key={colIndex}>
                      <td
                        className="border p-2 cursor-pointer"
                        onClick={() => handleSelection(colIndex, rowIndex)}
                      >
                        {row[colIndex * 2]}
                      </td>
                      <td
                        className={`border p-2 cursor-pointer ${
                          selectedIndices[colIndex] === rowIndex ? "bg-green-100 font-semibold rounded-full" : ""
                        }`}
                        onClick={() => handleSelection(colIndex, rowIndex)}
                      >
                        {row[colIndex * 2 + 1]}
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 gap-10 px-4">
          <div className="w-full md:w-1/2">
            <label className="block font-semibold mb-1">Prepared By:</label>
            <input type="text" placeholder="Enter Name" className="w-full p-2 border rounded-md mb-2" />
            <label className="block font-medium mb-1">Signature:</label>
            <canvas
              ref={preparedCanvasRef}
              width={400}
              height={100}
              className="border border-gray-300 rounded-md mb-2"
              onMouseDown={(e) => startDrawing(e, preparedCanvasRef, setIsDrawingPrepared)}
              onMouseMove={(e) => draw(e, preparedCanvasRef, isDrawingPrepared, setIsDrawingPrepared)}
              onMouseUp={() => stopDrawing(setIsDrawingPrepared)}
              onMouseOut={() => stopDrawing(setIsDrawingPrepared)}
            />
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => saveSignature(preparedCanvasRef, setPreparedSignature)}
              >
                Save Signature
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => clearSignature(preparedCanvasRef, setPreparedSignature)}
              >
                Clear
              </button>
            </div>
            <label className="block font-medium mb-1">Date:</label>
            <input type="date" className="w-full p-2 border rounded-md" />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block font-semibold mb-1">Approved By:</label>
            <input type="text" placeholder="Enter Name" className="w-full p-2 border rounded-md mb-2" />
            <label className="block font-medium mb-1">Signature:</label>
            <canvas
              ref={approvedCanvasRef}
              width={400}
              height={100}
              className="border border-gray-300 rounded-md mb-2"
              onMouseDown={(e) => startDrawing(e, approvedCanvasRef, setIsDrawingApproved)}
              onMouseMove={(e) => draw(e, approvedCanvasRef, isDrawingApproved, setIsDrawingApproved)}
              onMouseUp={() => stopDrawing(setIsDrawingApproved)}
              onMouseOut={() => stopDrawing(setIsDrawingApproved)}
            />
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => saveSignature(approvedCanvasRef, setApprovedSignature)}
              >
                Save Signature
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => clearSignature(approvedCanvasRef, setApprovedSignature)}
              >
                Clear
              </button>
            </div>
            <label className="block font-medium mb-1">Date:</label>
            <input type="date" className="w-full p-2 border rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}