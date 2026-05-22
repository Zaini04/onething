import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

function VehicleFilters({ onSearch }) {
  // Filters ki local state
  const [filters, setFilters] = useState({
    number: "",
    ownerName: "",
    status: "",
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
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-5 md:p-4 shadow-sm mb-6">
      {/* Title */}
      <h2 className="text-sm font-normal text-gray-700 mb-4 tracking-tight">
        Search Filters
      </h2>

      {/* --- FILTERS FORM --- */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-end gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:flex-1">
          
          {/* 1. Number Input / Dropdown Container */}
          <div className=" w-full">
            <select
              name="number"
              value={filters.number}
              onChange={handleChange}
              className="w-full  appearance-none  bg-white border border-gray-200 hover:border-gray-300 text-gray-500 font-normal text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-black transition-all cursor-pointer"
            >
              <option value="">Number</option>
              <option value="dl1c">DL 1C XX 1234</option>
              <option value="mh12">MH 12 XX 5678</option>
            </select>
            {/* <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
          </div>

          {/* 2. Owner Name Input / Dropdown Container */}
          <div className="relative w-full">
            <select
              name="ownerName"
              value={filters.ownerName}
              onChange={handleChange}
              className="w-full appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-500 font-normal text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-black transition-all cursor-pointer"
            >
              <option value="">Owner Name</option>
              <option value="imran">Imran Khan</option>
              <option value="saad">Saad</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* 3. Status Input / Dropdown Container */}
          <div className="relative w-full">
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-500 font-normal text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-black transition-all cursor-pointer"
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">InActive</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

        </div>

        {/* --- SEARCH BUTTON --- */}
        <button
          type="submit"
          className="w-fit lg:w-auto self-start flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-sm"
        >
          <Search size={16} className="stroke-[2.5]" />
          <span>Search Filters</span>
        </button>
      </form>
    </div>
  );
}

export default VehicleFilters;