import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

function FuelFilters({ onSearch }) {
  // Image ke mutabiq local state me sirf 2 filters hain
  const [filters, setFilters] = useState({
    fuelLitter: "",
    fuelCompany: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(filters);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
      {/* Title */}
      <h2 className="text-sm font-medium text-gray-700 mb-5 tracking-tight">
        Search Filters
      </h2>

      {/* --- FILTERS FORM --- */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-4">
        {/* 2 Columns Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:flex-1">
          
          {/* 1. Fuel Litter Dropdown */}
          <div className="relative w-full">
            <select
              name="fuelLitter"
              value={filters.fuelLitter}
              onChange={handleChange}
              className="w-full appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-400 font-normal text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-black transition-all cursor-pointer"
            >
              <option value="">Fuel Litter</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* 2. Fuel Company Dropdown */}
          <div className="relative w-full">
            <select
              name="fuelCompany"
              value={filters.fuelCompany}
              onChange={handleChange}
              className="w-full appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-400 font-normal text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-black transition-all cursor-pointer"
            >
              <option value="">Fuel Company</option>
              <option value="PSO">PSO</option>
              <option value="Shell">Shell</option>
              <option value="Total">Total</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

        </div>

        {/* --- SEARCH BUTTON --- */}
        <button
          type="submit"
          className="w-fit self-start lg:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-[#1C1C1E] hover:bg-black text-white font-medium text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-sm"
        >
          <Search size={15} className="stroke-[2.5]" />
          <span>Search Filters</span>
        </button>
      </form>
    </div>
  );
}

export default FuelFilters;