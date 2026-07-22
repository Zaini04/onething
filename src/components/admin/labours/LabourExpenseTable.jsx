import { useState } from "react";
import profile from "../../../assets/images/profileImage.jpg";
import DeleteButton from "../../global/DeleteButton";
import { useNavigate } from "react-router-dom";
import { TableSkeletonRows } from "../../global/TableSkeletonRows";
import Axios from "../../../configs/api";
import { useEffect } from "react";
import { useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const statusStyles = {
  Active:
    "bg-[#E6F6EC] text-[#15803D] font-medium rounded-lg text-xs px-3 py-1.5 text-center border border-transparent",
  Inactive:
    "bg-[#EFF6FF] text-[#1D4ED8] font-medium rounded-lg text-xs px-3 py-1.5 text-center border border-transparent",
  Blocked:
    "bg-[#FEE2E2] text-[#DC2626] font-semibold rounded-lg text-xs px-3 py-1.5 text-center border border-transparent",
  Deleted:
    "bg-[#FEE2E2] text-[#DC2626] font-semibold rounded-lg text-xs px-3 py-1.5 text-center border border-transparent",
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

export default function LabourExpenseTable({  setEditedLabour,
            laboursData = [],
            isLoading,
            page,
            perPage,setPerPage,
            setPage,
            totalPages,
          totalEntries,
        setSelectedRows
        }) {
  const [selected, setSelected] = useState([]);
  const [showPerPage, setShowPerPage] = useState(false);

  const [activeRowMenu, setActiveRowMenu] = useState(null);

  const menuRef = useRef(null);


  const navigate = useNavigate();
  const pageData = laboursData
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

  const handleEdit = (row) => {
    
    setEditedLabour(row)
    setActiveRowMenu(null)
    console.log("Edit clicked for Labour:", row);
  };

  

  const handleView = (id) => {
    console.log("View details for labour ID:", id);
    setActiveRowMenu(null)
  };

   useEffect(() => {
      function handleClickOutside(event) {
        
  
        if (menuRef.current && menuRef.current.contains(event.target)) {
          return;
        }
  
        setActiveRowMenu(null);
      }
  
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);

  return (
    <div className="w-full bg-white rounded-2xl py-2 px-1 border border-gray-100 shadow-sm">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl overflow-hidden w-full">
          <div className="overflow-x-auto w-full ">
            <table className="w-full text-left border-collapse min-w-[1050px] table-auto">
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
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight">
                    No
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap ">
                    Labour Name <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap ">
                    Phone Number <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap ">
                    Amount <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap ">
                    Expense Note <SortIcon />
                  </th>
                  
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Created Date <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Location <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap text-center">
                    Status <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap text-center">
                    Created By <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs w-16 font-semibold text-gray-400 tracking-tight whitespace-nowrap sticky right-0 z-10 bg-[#F7F7F7]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50/60">
              {isLoading ? (
   <TableSkeletonRows rowsCount={perPage || 5} />
                ) : pageData.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="py-8 text-center text-sm text-gray-400">
                      No entries found.
                    </td>
                  </tr>
                ) :(
 pageData.map((row,index) => {
                  const isRowSelected = selected.includes(row._id);
                                      const isMenuOpen = activeRowMenu === row._id;

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

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 truncate">
                        {(page - 1) * perPage + index + 1}

                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5 max-w-full">
                          <img
                            src={row?.labour?.image || profile}
                            alt={row.labour?.name}
                            className="w-7 h-7 rounded-full object-cover shadow-sm flex-shrink-0 ring-1 ring-gray-100"
                          />
                          <span className="text-[12px] font-normal text-gray-800 truncate">
                            {row.labour?.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 tracking-wide truncate">
                        {row.labour?.phoneNumber}
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 tracking-wide truncate">
                        {row.amount}
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 tracking-wide truncate">
                        {row.notes }
                      </td>


                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700 truncate">
{new Date(row.date).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#F1F3F5] text-gray-700 text-[11px] font-medium px-2 py-1 rounded border border-gray-200/50 truncate max-w-full">
                          {row.labour?.city}
                        </span>
                      </td>

                      <td className="py-3.5  text-center">
                        <span
                          className={`inline-block min-w-[85px] ${statusStyles[row.labour?.status]}`}
                        >
                          {row.labour?.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-center px-4 text-[12px] font-normal text-gray-700">
                        
                          {row.createdBy?.username || '-'}
                      </td>

                       <td
                          className={`py-3.5 px-4 text-[12px] font-normal sticky right-0 transition-colors duration-150 overflow-visible ${
                            isRowSelected ? "bg-[#F3F7FE]" : "bg-white"
                          } ${isMenuOpen ? "z-[100]" : "z-10"}`}
                        >
                          <div className="flex justify-center items-center w-full h-full">
                            <BsThreeDotsVertical

                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveRowMenu(isMenuOpen ? null : row._id);
                              }}
                              className="cursor-pointer text-gray-500 hover:text-black text-xl p-1 rounded-lg hover:bg-gray-100"
                            />
                          </div>
                          {isMenuOpen && (
                            <div
                              ref={menuRef}
                              className="absolute right-12 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded shadow-2xl   w-32 z-[9999] flex flex-col  animation-fade-in"
                            >
                              <div className="flex flex-col items-center justify-center ">
                            <button
                              onClick={() => handleEdit(row)}
                              type="button"
                              title="Edit Labour"
      className="inline-block text-left cursor-pointer px-2 py-2 text-xs font-medium text-blue-500 hover:bg-blue-200/50 border-b border-gray-300 w-full"
                            >
                              Edit
                            </button>

                            <DeleteButton
                              row={row}
                              deleteFn={(id) => Axios.delete(`/labour/labour_expense/${id}`)}
                              queryKey="labours-bills"
                              title="Delete Labour Expense"
                            />
                          </div>

                            </div>)}



                          
                          
                          
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