import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

function SearchSelect({
  label,
  placeholder,
  options = [],
  value,
  onChange,
  onBlur,
  isError,
  errorMessage,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!document.body.contains(event.target)) return;

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen && onBlur) {
          onBlur();
        }
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onBlur]);

  const filteredOptions = options.filter((opt) => {
    const textToSearch = typeof opt === "object" ? opt.name : opt;
    return textToSearch?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectedItem = options.find((opt) => {
    if (typeof opt === "object") return opt.id === value || opt.name === value;
    return opt === value;
  });

  const displayLabel = selectedItem
    ? typeof selectedItem === "object"
      ? selectedItem.name
      : selectedItem
    : placeholder;

  return (
    <div className="relative w-full group" ref={dropdownRef}>
      {label && (
        <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 z-10 transition-colors group-focus-within:text-black">
          {label}
        </label>
      )}

      <div
        onClick={() => {
          if (isOpen && onBlur) onBlur();
          setIsOpen(!isOpen);
          setSearchQuery("");
        }}
        className={`w-full px-4 py-3 border rounded-xl text-xs font-normal bg-white focus:outline-none transition-all cursor-pointer flex items-center justify-between ${
          isError
            ? "border-red-500 focus:border-red-500"
            : isOpen
              ? "border-black"
              : "border-gray-200"
        } ${value ? "text-black" : "text-gray-400"}`}
      >
        <span>{displayLabel}</span>
        <FiChevronDown
          className={`text-gray-400 text-base transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-50 p-2 flex flex-col gap-2 max-h-56">
          <div className="relative">
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 text-black text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none "
              autoFocus
            />
            <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          <div className="overflow-y-auto flex-1 max-h-36 scrollbar-thin scrollbar-thumb-gray-200">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const optValue = typeof opt === "object" ? opt.id : opt;
                const optLabel = typeof opt === "object" ? opt.name : opt;

                return (
                  <div
                    key={optValue}
                    onClick={() => {
                      onChange(optValue);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-2 text-xs rounded-lg cursor-pointer transition-colors ${
                      value === optValue
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-50"
                    }`}
                  >
                    {optLabel}
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-xs text-gray-400 text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}

      {isError && errorMessage && (
        <p className="text-[11px] text-red-500 mt-0.5 ml-1 block">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default SearchSelect;
