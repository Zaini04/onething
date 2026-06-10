import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import SearchSelect from "./SearchSelect";
import FormInput from "./FormInput";

function SearchFilters({ config, filters, onFilterChange, onSubmit }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // setActiveDropdown(null);
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
      <h2 className="text-sm font-normal text-gray-700 mb-4 tracking-tight">
        Search Filters
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row items-center gap-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:flex-1">
          {config.map((field) => {
            console.log("Rendering field:", field.options);

            if (field.type === "select" && field.searchable) {
              return (
                <div className="relative">
                <SearchSelect
                  key={field.name}
                  label={field.label || ""}
                  placeholder={field.placeholder}
                  options={field.options || []}
                  value={filters[field.name] || ""}
                  onChange={(val) => onFilterChange(field.name, val)}
                />
                {filters[field.name] && (
  <button
    type="button"
    className="absolute right-12 top-3 cursor-pointer z-50"
    onClick={() => onFilterChange(field.name, "")}
  >
    <X size={16}/>
  </button>
)}
                </div>
              );
            }

            if (field.type === "select" && !field.searchable) {
              return (
                <FormInput
                  key={field.name}
                  type="select"
                  label={field.label || ""}
                  id={field.name}
                  defaultOption={field.placeholder}
                  options={field.options?.map((opt) => opt.value) || []}
                  value={filters[field.name] || ""}
                  onChange={(e) => onFilterChange(field.name, e.target.value)}
                />
              );
            }

            if (field.type === "date") {
              return (
                <FormInput
                  key={field.name}
                  type="date"
                  label={field.label || ""}
                  id={field.name}
                  value={filters[field.name] || ""}
                  onChange={(e) => onFilterChange(field.name, e.target.value)}
                />
              );
            }

            return (
              <FormInput
                key={field.name}
                type="text"
                label={field.label || ""}
                id={field.name}
                placeholder={field.placeholder}
                value={filters[field.name] || ""}
                onChange={(e) => onFilterChange(field.name, e.target.value)}
              />
            );
          })}
        </div>

        <button
          type="submit"
          className="w-fit self-start lg:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-sm h-[42px] lg:mt-0 mt-2"
        >
          <Search size={16} className="stroke-[2.5]" />
          <span>Search Filters</span>
        </button>
      </form>
    </div>
  );
}

export default SearchFilters;
