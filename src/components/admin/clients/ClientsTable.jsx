import { useState } from "react";
// Image standard import as per your requirement
import profile from '../../../assets/images/profileImage.jpg';

// Exact style colors matched with your screenshot
const statusStyles = {
  Active: "bg-[#E6F6EC] text-[#15803D] font-medium rounded-lg text-xs px-3 py-1.5 text-center border border-transparent",
  InActive: "bg-[#EFF6FF] text-[#1D4ED8] font-medium rounded-lg text-xs px-3 py-1.5 text-center border border-transparent",
  Block: "bg-[#FEE2E2] text-[#DC2626] font-semibold rounded-lg text-xs px-3 py-1.5 text-center border border-transparent",
};

// Dummy data setup strictly representing your Client View schema from screenshots
const initialData = Array.from({ length: 50 }, (_, i) => {
  const names = ["Imran Khan", "Saad"];
  const phones = ["0301-2345678", "0322-9876543"];
  const locations = ["Multan", "Overseas", "Lahore"];
  
  const name = names[i % 2];
  const phone = phones[i % 2];
  const location = locations[i % 3];
  
  // Status matching your exact screenshot patterns (1, 2, 8, 9 Active | 10 Block | rest InActive)
  const status =
    i === 0 || i === 1 || i === 7 || i === 8 || i === 9
      ? i === 9 ? "Block" : "Active"
      : "InActive";

  return {
    id: i + 1,
    no: String(i + 1).padStart(2, "0"),
    clientName: name,
    phoneNumber: phone,
    createdDate: "24-10-2025",
    location: location,
    status,
  };
});

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

export default function ClientsTable() {
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

  // Handlers for client action triggers
  const handleEdit = (row) => {
    console.log("Edit clicked for client:", row);
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for client ID:", id);
  };

  return (
    <div className="w-full bg-white rounded-2xl py-2 px-1 border border-gray-100 shadow-sm">
      <div className="w-full mx-auto">
        
        {/* --- MAIN DASHBOARD INTERACTIVE TABLE INNER CARD --- */}
        <div className="bg-white rounded-xl overflow-hidden w-full">
          <div className="overflow-x-auto w-full ">
            {/* min-w layout locked at 1050px to perfectly blend extra actions column */}
            <table className="w-full text-left border-collapse min-w-[1050px] table-fixed">
              <thead>
                <tr className="bg-[#F7F7F7] border-b border-gray-100">
                  <th className="py-4 px-5 w-[50px] text-center">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight w-[70px]">
                    No
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap w-[200px]">
                    Client Name <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap w-[180px]">
                    Phone Number <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap w-[160px]">
                    Created Date <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap w-[150px]">
                    Location <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap text-center w-[130px]">
                    Status <SortIcon />
                  </th>
                  {/* Action Header Column */}
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight text-center w-[110px]">
                    Action
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
                      
                      {/* Serial Number */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 truncate">
                        {row.no}
                      </td>
                      
                      {/* Profile Image & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5 max-w-full">
                          <img 
                            src={profile} 
                            alt={row.clientName} 
                            className="w-7 h-7 rounded-full object-cover shadow-sm flex-shrink-0 ring-1 ring-gray-100"
                          />
                          <span className="text-[12px] font-normal text-gray-800 truncate">
                            {row.clientName}
                          </span>
                        </div>
                      </td>
                      
                      {/* Phone Number */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 tracking-wide truncate">
                        {row.phoneNumber}
                      </td>
                      
                      {/* Created Date */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700 truncate">
                        {row.createdDate}
                      </td>
                      
                      {/* Location Badge */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#F1F3F5] text-gray-700 text-[11px] font-medium px-2 py-1 rounded border border-gray-200/50 truncate max-w-full">
                          {row.location}
                        </span>
                      </td>
                      
                      {/* Status Pills */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block min-w-[85px] ${statusStyles[row.status]}`}>
                          {row.status}
                        </span>
                      </td>

                      {/* ACTIONS COLUMN BUTTONS */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          
                          {/* Edit Action Button */}
                          <button
                            onClick={() => handleEdit(row)}
                            type="button"
                            title="Edit Client"
                            className="w-7 h-7 flex items-center justify-center bg-[#F4F4F5] hover:bg-[#E4E4E7] text-gray-700 rounded-lg transition-colors cursor-pointer active:scale-95"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>

                          {/* Delete Action Button */}
                          <button
                            onClick={() => handleDelete(row.id)}
                            type="button"
                            title="Delete Client"
                            className="w-7 h-7 flex items-center justify-center bg-[#FEE2E2] hover:bg-[#FEE2E2]/90 text-[#DC2626] rounded-lg transition-colors cursor-pointer active:scale-95"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* --- TABLE FOOTER SECTION --- */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-white">
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