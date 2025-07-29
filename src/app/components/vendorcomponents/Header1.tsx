export default function Header(){
    return(
        <>
        
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Quotation</h2>
                <div className="flex gap-3">
                    <button className="bg-blue-500 text-white px-7 py-3 rounded-full hover:bg-blue-600 transition">
                        Download PDF
                    </button>
                    <button className="border border-blue-500 px-7 py-3 rounded-full hover:bg-blue-100 transition">
                        Back
                    </button>
                </div>
            </div>
        
        </>
    )
}