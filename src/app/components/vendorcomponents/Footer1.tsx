export default function Footer(){
    return(
        <>
        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="w-full md:w-auto">
            <label htmlFor="quoteAmount" className="block mb-1 text-xl font-medium text-gray-800">
              Quote Amount*
            </label>
            <input
              id="quoteAmount"
              type="number"
              className="w-full border border-gray-300 px-2 py-2 rounded-xl transition-all duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-500"
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
        </>
    )
}