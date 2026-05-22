import { useState } from "react";

// Table actions ke colors aur format aapke custom theme ke mutabik
const actionStyles = {
  view: "p-2 rounded-xl bg-[#E6F7F5] text-[#00A389] hover:bg-[#D4F2EE] transition cursor-pointer",
  delete: "p-2 rounded-xl bg-[#FFF2F3] text-[#D93F4C] hover:bg-[#FFE5E7] transition cursor-pointer",
};

// Dummy data jo exact aapki image (image_d6c116.png) ki tarah rendering sequence follow karega
const initialData = Array.from({ length: 50 }, (_, i) => {
  const companies = ["PSO", "Shell"];
  const litters = [25, 600];

  return {
    id: i + 1,
    no: String(i + 1).padStart(2, "0"),
    fuelCompany: i % 2 === 0 ? companies[0] : companies[1],
    fuelLitter: i === 9 ? litters[1] : litters[0], // 10th entry par 600 litter baki sab 25
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

export default function AllFuelCompanies() {
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

  const handleEdit = (row) => {
    console.log("Editing Fuel Company Details:", row);
  };

  const handleDelete = (id) => {
    console.log("Deleting Fuel Company Entry for ID:", id);
  };

  return (
    <div className="w-full bg-white rounded-2xl py-2 px-1 border border-gray-100 shadow-sm">
      <div className="w-full mx-auto">
        
        {/* --- MAIN INTERACTIVE TABLE INNER CARD --- */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-[#F7F7F7] border-b border-gray-100">
                  <th className="py-4 px-5 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight w-16">
                    No
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Fuel Company <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Fuel Litter <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap text-center pr-8 w-32">
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
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-500">
                        {row.no}
                      </td>
                      
                      {/* Fuel Company Name */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-900 tracking-wide">
                        {row.fuelCompany}
                      </td>
                      
                      {/* Fuel Litter Quantity */}
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800">
                        {row.fuelLitter}
                      </td>
                      
                      {/* Action Triggers (View & Delete Icons) */}
                      <td className="py-2.5 px-4 text-center pr-8">
                        <div className="flex items-center justify-center gap-3">
                          {/* View Button */}
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

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(row.id)}
                            className={actionStyles.delete}
                            title="Delete Company"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            
            {/* Left Control Arrow Buttons */}
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

              {/* Page Selection Numbers */}
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

              {/* Right Pagination Trigger */}
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

            {/* Pagination Standard Info Labels */}
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