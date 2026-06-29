import { useState } from "react";
import DeleteButton from "../../global/DeleteButton";
import { TableSkeletonRows } from "../../global/TableSkeletonRows";

const actionStyles = {
  view: "p-2 rounded-xl bg-[#E6F7F5] text-[#00A389] hover:bg-[#D4F2EE] transition cursor-pointer",
  delete:
    "p-2 rounded-xl bg-[#FFF2F3] text-[#D93F4C] hover:bg-[#FFE5E7] transition cursor-pointer",
};



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

export default function EntryFuelTable({
  entryFuels,
            isLoading,
            page,
            perPage,
            setPage,
            setPerPage,
            totalPages,
            totalEntries,
            setSelectedRows
}) {
  const [selected, setSelected] = useState([]);
  const [showPerPage, setShowPerPage] = useState(false);

  const pageData = entryFuels
  
 const allSelected =
    pageData.length > 0 && pageData.every((r) => selected.includes(r._id));

  



  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) =>
        prev.filter((id) => !pageData.map((r) => r._id).includes(id)),
      );
      setSelectedRows((prev) =>
        prev.filter((id) => !pageData.map((r) => r._id).includes(id)),
      );
    } else {
      setSelected((prev) => [
        ...prev,
        ...pageData.map((r) => r._id).filter((id) => !prev.includes(id)),
      ]);
      setSelectedRows((prev) => [
        ...prev,
        ...pageData.map((r) => r._id).filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  

  const getPaginationNumbers = () => {
    const nums = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) nums.push(i);
    } else {
      nums.push(1);
      if (page > 3) nums.push("...");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
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
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
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
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight w-16">
                    No
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight w-16">
                    Date
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Vehicle No <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Vehicle Name <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Fuel Company <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Fuel Litter <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Total Price <SortIcon />
                  </th>
                  
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50/60">
               {isLoading ? (
                               <TableSkeletonRows rowsCount={perPage || 5} />
                                            ) : pageData.length === 0 ? (
                                              <tr>
                                                <td colSpan="7" className="py-8 text-center text-sm text-gray-400">
                                                  No entries found.
                                                </td>
                                              </tr>
                                            ) :(
pageData.map((row,index) => {
                    const isRowSelected = selected.includes(row._id);

                  return (
                     <tr
                      key={row._id}
                      className={`transition-colors duration-150 ${
                        isRowSelected ? "bg-blue-50/20" : "hover:bg-gray-50/30"
                      }`}
                    >
                      <td className="py-3.5 px-5 text-center">
                        <input
                          type="checkbox"
                          checked={isRowSelected}
                          onChange={() => toggleRow(row._id)}
                          className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                        />
                      </td>
                      

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-500">
                                                {(page - 1) * perPage + index + 1}
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-500">
{new Date(row.date).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-900 tracking-wide">
                        {row.vehicle?.vehicleNo}
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-900 tracking-wide">
                        {row.vehicle?.typeVehicle}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-500">
                        {row.fuelCompany?.fuelCompany}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800">
                        {row.dieselInLitters}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800">
                        {row.dieselCost}
                      </td>

                   
                    </tr>
                  );
                })
                                            )}
                
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-white">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {getPaginationNumbers().map((num, i) =>
                  num === "..." ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="w-6 h-8 flex items-center justify-center text-gray-400 text-xs"
                    >
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
                  ),
                )}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium w-full sm:w-auto justify-between sm:justify-end">
              <span>
                {isLoading ? (
                  "Loading entries..."
                ) : (
                  <span>
  Showing {totalEntries === 0 ? 0 : (page - 1) * perPage + 1} to{" "}
  {Math.min(page * perPage, totalEntries)} of{" "}
  {totalEntries} entries
</span>
                )}
              </span>

              <div className="relative">
                <button
                  onClick={() => setShowPerPage((s) => !s)}
                  className="flex items-center gap-1 px-2 py-1 rounded cursor-pointer border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-normal"
                >
                  Show {perPage}
                  <svg
                    className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${showPerPage ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
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
                          perPage === n
                            ? "font-bold text-blue-600 bg-blue-50/40"
                            : "text-gray-600"
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
