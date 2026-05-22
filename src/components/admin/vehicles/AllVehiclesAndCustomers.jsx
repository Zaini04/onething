import { useState } from "react";
// Image standard import path
import profile from '../../../assets/images/profileImage.jpg';

function SortIcon() {
  return (
    <svg
      className="inline ml-1.5 w-2.5 h-2.5 text-gray-400 cursor-pointer align-middle"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// Dummy data structure mapping image_72a4e4.png perfectly with all columns
const initialData = Array.from({ length: 50 }, (_, i) => {
  const names = ["Imran Khan", "Saad"];
  const sites = ["Multan", "Overseas", "Lahore"];
  const vehicles = ["Standard Dump Truck", "Mini Dump Trucks", "Low-Side Dump Trucks"];
  const materials = ["Concrete", "Sand"];
  const rateTypes = ["50 sft", "12"];
  const vendors = ["Mudasir", "Muaaz", "Musaz"];

  return {
    id: i + 1,
    no: String(i + 1).padStart(2, "0"),
    date: "24-10-2025",
    clientName: names[i % 2],
    site: sites[i % 3],
    vehicle: vehicles[i % 3],
    material: materials[i % 2],
    rateType: rateTypes[i % 2],
    driverExpense: "5,000",
    loading: "5,000",
    scholarTex: "5,000",
    miscellaneousExpenses: "12,000",
    vendorName: vendors[i % 3],
    fuel: "35,000"
  };
});

export default function AllVehiclesAndCustomers() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showPerPage, setShowPerPage] = useState(false);

  const totalPages = Math.ceil(initialData.length / perPage);
  const pageData = initialData.slice((page - 1) * perPage, page * perPage);
  const allSelected = pageData.length > 0 && pageData.every((r) => selected.includes(r.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) => prev.filter((id) => !pageData.map((r) => r.id).includes(id)));
    } else {
      setSelected((prev) => [
        ...prev,
        ...pageData.map((r) => r.id).filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getPaginationNumbers = () => {
    const nums = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) nums.push(i);
    } else {
      nums.push(1);
      if (page > 3) nums.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        nums.push(i);
      }
      if (page < totalPages - 2) nums.push("...");
      nums.push(totalPages);
    }
    return nums;
  };

  return (
    <div className="w-full bg-white rounded-2xl py-2 px-1 border border-gray-100 shadow-sm">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl overflow-hidden">
          
          {/* Strict Wrapper: `max-w-full block` poore web page ko scroll hone se rokega */}
          <div className="overflow-x-auto max-w-full">
            {/* Table layout fixed dynamic space maintain rakhega aur columns scrollable honge */}
            <table className="w-full text-left border-collapse min-w-[1100px] table-auto">
              <thead>
                <tr className="bg-[#F7F7F7] border-b border-gray-100">
                  {/* Checkbox Column */}
                  <th className="py-4 px-5 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                    />
                  </th>
                  
                  {/* Table Headers */}
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight w-16">
                    No
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Date <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Client Name <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Sites <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Vehicle <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Material <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Rate Type <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Driver Expense <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Loading <SortIcon />
                  </th>
                  {/* New Image Columns added smoothly */}
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Scholar+tex <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Miscellaneous Expenses <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Vendor Name <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Fuel <SortIcon />
                  </th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-50/60">
                {pageData.map((row) => {
                  const isRowSelected = selected.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`transition-colors duration-150 ${
                        isRowSelected ? "bg-blue-50/20" : "hover:bg-gray-50/30"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-5 text-center">
                        <input
                          type="checkbox"
                          checked={isRowSelected}
                          onChange={() => toggleRow(row.id)}
                          className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                        />
                      </td>
                      
                      {/* Serial No */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800">
                        {row.no}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 tracking-wide select-none">
                        {row.date}
                      </td>
                      
                      {/* Client Avatar + Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={profile} 
                            alt={row.clientName} 
                            className="w-7 h-7 rounded-full object-cover shadow-sm ring-1 ring-gray-100"
                          />
                          <span className="text-[12px] font-normal text-gray-800 whitespace-nowrap">
                            {row.clientName}
                          </span>
                        </div>
                      </td>
                      
                      {/* Sites pill badge styling */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#F1F3F5] text-gray-700 text-[11px] font-medium px-2 py-1 rounded border border-gray-200/50">
                          {row.site}
                        </span>
                      </td>

                      {/* Vehicle */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700 whitespace-nowrap">
                        {row.vehicle}
                      </td>

                      {/* Material */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.material}
                      </td>

                      {/* Rate Type */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700 whitespace-nowrap">
                        {row.rateType}
                      </td>

                      {/* Driver Expense */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.driverExpense}
                      </td>

                      {/* Loading */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.loading}
                      </td>

                      {/* Scholar+tex */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.scholarTex}
                      </td>

                      {/* Miscellaneous Expenses */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.miscellaneousExpenses}
                      </td>

                      {/* Vendor Avatar + Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={profile} 
                            alt={row.vendorName} 
                            className="w-7 h-7 rounded-full object-cover shadow-sm ring-1 ring-gray-100"
                          />
                          <span className="text-[12px] font-normal text-gray-800 whitespace-nowrap">
                            {row.vendorName}
                          </span>
                        </div>
                      </td>

                      {/* Fuel */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.fuel}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* --- TABLE FOOTER SECTION --- */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-white">
            
            {/* Pagination controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {getPaginationNumbers().map((num, i) =>
                  num === "..." ? (
                    <span key={`ellipsis-${i}`} className="w-6 h-8 flex items-center justify-center text-gray-400 text-xs">
                      ...
                    </span>
                  ) : (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-normal cursor-pointer transition ${
                      page === num
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-100 border border-gray-200"
                    }`}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Pagination Entries Label Info */}
            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium w-full sm:w-auto justify-between sm:justify-end">
              <span>
                Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, initialData.length)} of {initialData.length} entries
              </span>
              
              <div className="relative">
                <button
                  onClick={() => setShowPerPage((s) => !s)}
                  className="flex items-center gap-1 px-2 py-1 rounded cursor-pointer border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-normal"
                >
                  Show {perPage}
                  <svg className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${showPerPage ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showPerPage && (
                  <div className="absolute bottom-full right-0 mb-1 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-20 min-w-[85px]">
                    {[5, 10, 20, 50].map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          setPerPage(n);
                          setPage(1);
                          setShowPerPage(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition ${
                          perPage === n ? "font-bold text-blue-600 bg-blue-50/40" : "text-gray-600"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}