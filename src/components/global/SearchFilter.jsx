import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import SearchSelect from "./SearchSelect";

function SearchFilters({ config, filters, onFilterChange, onSubmit }) {
  // Searchable dropdown ke states ko manage karne ke liye
  const [activeDropdown, setActiveDropdown] = useState(null); // Kis field ka dropdown open hai
  const [searchQuery, setSearchQuery] = useState(""); // Dropdown ke andar search input ki value
  const dropdownRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(filters);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-5 md:p-4 shadow-sm mb-6">
      {/* Container Title */}
      <h2 className="text-sm font-normal text-gray-700 mb-4 tracking-tight">
        Search Filters
      </h2>

      {/* --- FORM LAYOUT --- */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-4">
        {/* Dynamic Inputs Grid (3 columns layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:flex-1">
          {config.map((field) => {
            const hasValue = !!filters[field.name];

            // ==========================================
            // 1. SEARCHABLE SELECT DROPDOWN (For Name, Phone, etc.)
            // ==========================================
            if (field.type === "select" && field.searchable) {
              const isDropdownOpen = activeDropdown === field.name;
              
              // Filter options based on user typing
              const filteredOptions = field.options?.filter((opt) =>
                opt.label.toLowerCase().includes(searchQuery.toLowerCase())
              ) || [];

              // Selected option ka label nikalne ke liye
              const selectedOption = field.options?.find(opt => opt.value === filters[field.name]);

              return (
                <div key={field.name} className="relative w-full" ref={isDropdownOpen ? dropdownRef : null}>
                  {/* Fake Input Display Box */}
                  <div
                    onClick={() => {
                      setActiveDropdown(isDropdownOpen ? null : field.name);
                      setSearchQuery(""); // Har dafa kholne par search query reset ho
                    }}
                    className={`w-full bg-white border border-gray-200 hover:border-gray-300 font-normal text-sm rounded-xl px-4 py-3  transition-all cursor-pointer flex items-center justify-between ${
                      hasValue ? "text-black" : "text-gray-400"
                    } ${isDropdownOpen ? "border-black" : ""}`}
                  >
                    <span>{selectedOption ? selectedOption.label : field.placeholder}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </div>

                  {/* Dropdown Menu Overlay */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-50 p-2 flex flex-col gap-2 max-h-60">
                      {/* Search Input Inside Dropdown */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 text-black text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none "
                          autoFocus
                        />
                        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>

                      {/* Options List */}
                      <div className="overflow-y-auto flex-1 max-h-40 dynamic-scrollbar">
                        {/* Clear/Placeholder Option */}
                        <div
                          onClick={() => {
                            onFilterChange(field.name, "");
                            setActiveDropdown(null);
                          }}
                          className="px-3 py-2 text-xs text-gray-400 hover:bg-gray-50 rounded-lg cursor-pointer"
                        >
                          {field.placeholder}
                        </div>

                        {/* Filtered Dynamic Options */}
                        {filteredOptions.length > 0 ? (
                          filteredOptions.map((opt) => (
                            <div
                              key={opt.value}
                              onClick={() => {
                                onFilterChange(field.name, opt.value);
                                setActiveDropdown(null);
                              }}
                              className={`px-3 py-2 text-xs rounded-lg cursor-pointer transition-colors ${
                                filters[field.name] === opt.value
                                  ? "bg-black text-white"
                                  : "text-black hover:bg-gray-50"
                              }`}
                            >
                              {opt.label}
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-xs text-gray-400 text-center">
                            No results found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // ==========================================
            // 2. NORMAL DROPDOWN SELECT (For Status, etc.)
            // ==========================================
            if (field.type === "select" && !field.searchable) {
              return (
                // <div key={field.name} className="relative w-full">
                //   <select
                //     name={field.name}
                //     value={filters[field.name] || ""}
                //     onChange={(e) => onFilterChange(field.name, e.target.value)}
                //     className={`w-full appearance-none bg-white border border-gray-200 hover:border-gray-300 font-normal text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none  transition-all cursor-pointer ${
                //       hasValue ? "text-black" : "text-gray-400"
                //     }`}
                //   >
                //     <option value="" className="text-gray-400">{field.placeholder}</option>
                //     {field.options?.map((opt) => (
                //       <option key={opt.value} value={opt.value} className="text-black">
                //         {opt.label}
                //       </option>
                //     ))}
                //   </select>
                //   <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                // </div>
                <SearchSelect
  label=""
  placeholder="Select Client"
  options={config.options || []}
  value={filters[field.name] || ""}
  onChange={(val) => onFilterChange(field.name, val)}
/>
              );
            }

            // ==========================================
            // 3. DATE PICKER INPUT
            // ==========================================
            if (field.type === "date") {
              return (
                <div key={field.name} className="relative w-full">
                  <input
                    type="date"
                    name={field.name}
                    value={filters[field.name] || ""}
                    onChange={(e) => onFilterChange(field.name, e.target.value)}
                    className={`w-full bg-white border border-gray-200 hover:border-gray-300 font-normal text-sm rounded-xl px-4 py-3  focus:outline-none focus:border-black transition-all custom-date-input ${
                      hasValue ? "text-black" : "text-gray-400"
                    }`}
                  />
                  {/* <Calendar size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
                </div>
              );
            }

            // ==========================================
            // 4. NORMAL TEXT INPUT
            // ==========================================
            return (
              <div key={field.name} className="relative w-full">
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={filters[field.name] || ""}
                  onChange={(e) => onFilterChange(field.name, e.target.value)}
                  className="w-full bg-white border border-gray-200 hover:border-gray-300 text-black placeholder:text-gray-400 font-normal text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-all"
                />
              </div>
            );
          })}
        </div>

        {/* --- COMMON SEARCH BUTTON --- */}
        <button
          type="submit"
          className="w-fit self-start lg:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-sm h-[46px]"
        >
          <Search size={16} className="stroke-[2.5]" />
          <span>Search Filters</span>
        </button>
      </form>
    </div>
  );
}

export default SearchFilters;