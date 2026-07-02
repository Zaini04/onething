import { useRef, useEffect, useState } from "react";
import { Search, X, Calendar as CalendarIcon } from "lucide-react";
import SearchSelect from "./SearchSelect";
import FormInput from "./FormInput";

// 🔥 React Date Range Packages
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Default theme css file

function SearchFilters({ config, filters, onFilterChange, onSubmit }) {
  const dropdownRef = useRef(null);
  const [isRangeOpen, setIsRangeOpen] = useState(false);

  // Calendar ke baahar click karne se popup close karne ke liye
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRangeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(filters);
  };

  // Calendar state helper
  const selectionRange = {
    startDate: filters.from ? new Date(filters.from) : new Date(),
    endDate: filters.to ? new Date(filters.to) : new Date(),
    key: "selection",
  };

  const handleSelectRange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    
    const fromStr = format(startDate, "yyyy-MM-dd");
    const toStr = format(endDate, "yyyy-MM-dd");
    
    onFilterChange("dateRange", { from: fromStr, to: toStr });

    if (startDate.getTime() !== endDate.getTime()) {
      setTimeout(() => setIsRangeOpen(false), 300);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-5 md:p-4 shadow-sm mb-6">
      
   <style>{`
  /* Parent box ko as a container register kar rahe hain */
  .calendar-wrapper-box {
    container-type: inline-size;
  }

  .custom-mini-calendar .rdrCalendarWrapper {
    font-size: 11px !important;
    width: 100% !important;
    background: transparent;
  }
  .custom-mini-calendar .rdrMonth {
    width: 100% !important;
    padding: 0 4px 4px 4px !important;
  }
  .custom-mini-calendar .rdrDays {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr) !important;
  }
  .custom-mini-calendar .rdrDay {
    height: 28px !important;
    line-height: 28px !important;
    width: auto !important;
  }
  .custom-mini-calendar .rdrDayNumber {
    font-size: 11px !important;
    top: 0 !important;
    bottom: 0 !important;
    height: 28px !important;
  }

  /* Default Header Style */
  .custom-mini-calendar .rdrMonthAndYearWrapper {
    padding-top: 4px !important;
    height: 35px !important;
  }
  .custom-mini-calendar .rdrMonthAndYearPickers {
    font-size: 12px !important;
    font-weight: 600;
  }

  /* 🔥 JAB CALENDAR ELEMENT KI APNI WIDTH 350px SE LESS HOGI (Screen se farq nahi parta) */
  @container (max-width: 300px) {
    .custom-mini-calendar .rdrMonthAndYearWrapper {
      height: auto !important;
      padding: 8px 4px !important;
    }
    .custom-mini-calendar .rdrMonthAndYearPickers {
      flex-direction: column !important; /* Month/Year upar neeche ho jayein ge */
      gap: 4px !important;
    }
    .custom-mini-calendar .rdrMonthPicker select{
      padding: 2px 4px !important;
    }
    .custom-mini-calendar .rdrYearPicker select {
      padding: 2px 20px !important;
    }
    .custom-mini-calendar .rdrNextPrevButton {
      margin: 0 !important;
    }
  }

  .custom-mini-calendar .rdrSelected, 
  .custom-mini-calendar .rdrStartEdge, 
  .custom-mini-calendar .rdrEndEdge, 
  .custom-mini-calendar .rdrInRange {
    top: 2px !important;
    bottom: 2px !important;
  }
`}</style>

      <h2 className="text-sm font-normal text-gray-700 mb-4 tracking-tight">
        Search Filters
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row items-center gap-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:flex-1">
          {config.map((field) => {

            if (field.type === "select" && field.searchable) {
              return (
                <div key={field.name} className="relative">
                  <SearchSelect
                    label={field.label || ""}
                    placeholder={field.placeholder}
                    options={field.options || []}
                    value={filters[field.name] || ""}
                    onChange={(val) => onFilterChange(field.name, val)}
                  />
                  {filters[field.name] && (
                    <button
                      type="button"
                      className="absolute right-12 top-3 cursor-pointer z-50 text-gray-400 hover:text-gray-600"
                      onClick={() => onFilterChange(field.name, "")}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              );
            }

            // 2. 🔥 EXACT INPUT WIDTH DATE-RANGE (NO OVERFLOW, COMPACT DATA)
            if (field.type === "date-range") {
              const displayValue = filters.from && filters.to 
                ? `${format(new Date(filters.from), "MM/dd/yyyy")} - ${format(new Date(filters.to), "MM/dd/yyyy")}` 
                : "";

              return (
                <div key={field.name} ref={dropdownRef} className="relative flex flex-col w-full calendar-wrapper-box">
                  
                  <div className="relative w-full">
                    <input
                      type="text"
                      readOnly
                      placeholder={ "MM/DD/YYYY - MM/DD/YYYY"}
                      value={displayValue}
                      onClick={() => setIsRangeOpen(!isRangeOpen)}
                      className="w-full bg-white border placeholder:text-[11px] border-gray-200 rounded-xl px-4 py-2.5 text-[12px] font-normal text-gray-800 cursor-pointer  hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                    
                    

                    {/* Right Reset Cross Button */}
                    {displayValue ? (
                      <button
                        type="button"
                        className="absolute right-3 top-3 cursor-pointer z-40 text-gray-400 hover:text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onFilterChange("dateRange", { from: "", to: "" });
                        }}
                      >
                        <X size={16} />
                      </button>
                    ):

                     <div className="absolute right-3 top-[13px] text-gray-400 pointer-events-none">
                       <CalendarIcon size={16} />
                    </div>


                    }
                   
                  </div>

                  {/* ⚡ DROPDOWN BOX: Width is exactly 100% of the Input above */}
                  {isRangeOpen && (
                    <div className="absolute top-[48px] left-0 z-50 w-full bg-white border border-gray-200 rounded-xl shadow-xl p-1 animate-in fade-in duration-100 overflow-hidden custom-mini-calendar">
                      <DateRange
                        ranges={[selectionRange]}
                        onChange={handleSelectRange}
                        months={1}
                        direction="horizontal"
                        showDateDisplay={false}
                        rangeColors={["#1A1C1E"]}
                        minDate={new Date("2000-01-01")}
                      />
                    </div>
                  )}
                </div>
              );
            }

            // 3. NON-SEARCHABLE SELECT
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

            // 4. STANDARD SINGLE DATE
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

            // 5. DEFAULT TEXT INPUT
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