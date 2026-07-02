import { useState } from "react";
import profile from "../../../assets/images/profileImage.jpg";
import { TableSkeletonRows } from "../../global/TableSkeletonRows";
import DeleteButton from "../../global/DeleteButton";
import Axios from "../../../configs/api";
import { useRef } from "react";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const statusStyles = {
  Active:
    "bg-[#E6F6EC] text-[#15803D] font-normal cursor-pointer rounded-lg text-xs px-3 py-1 text-center border border-transparent",
  InActive:
    "bg-[#EFF6FF] text-[#1D4ED8] font-normal cursor-pointer rounded-lg text-xs px-3 py-1 text-center border border-transparent",
  Block:
    "bg-[#FEE2E2] text-[#DC2626] font-normal cursor-pointer rounded-lg text-xs px-3 py-1 text-center border border-transparent",
  Deleted:
    "bg-[#FEE2E2] text-[#DC2626] font-normal cursor-pointer rounded-lg text-xs px-3 py-1 text-center border border-transparent",

  };

// const initialData = Array.from({ length: 50 }, (_, i) => {
//   const clients = ["Imran Khan", "Saad"];
//   const sites = ["Multan", "Overseas", "Lahore"];
//   const addresses = ["Plot 41 B, Block B...", "Plot 41 B, Block B..."];

//   const clientName = clients[i % 2];
//   const site = sites[i % 3];
//   const address = addresses[i % 2];
//   const sftPerVehicle = "49,000";

//   const status =
//     i === 0 || i === 1 || i === 7 || i === 8 || i === 9
//       ? i === 9
//         ? "Block"
//         : "Active"
//       : "InActive";

//   return {
//     id: i + 1,
//     no: String(i + 1).padStart(2, "0"),
//     clientName,
//     site,
//     address,
//     sftPerVehicle,
//     status,
//   };
// });

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

export default function AllSitesTable(   {      
   setEditedSite,
            sitesData,
            isLoading ,
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

  const [activeRowMenu, setActiveRowMenu] = useState(null);

  const menuRef = useRef(null);


  const pageData = sitesData
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
    setEditedSite(row)
    setActiveRowMenu(null)
    console.log("Edit clicked for client:", row);
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
    <div className="w-full bg-white rounded-2xl py-2 px-1 border border-gray-100 shadow-sm ">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
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
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight ">
                    No
                  </th>
                  <th className="w-16 py-4  px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Client Name <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Site <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Address <SortIcon />
                  </th>
                  
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap text-center ">
                    Status <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap text-center ">
                    CreatedBy <SortIcon />
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
                                  <td colSpan="7" className="py-8 text-center text-sm text-gray-400">
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

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 ">
                        {(page - 1) * perPage + index + 1}
                      </td>

                      <td className="py-3.5 px-4">
                                              <div className="flex items-center gap-2.5 max-w-full">
                                                <img
                                                  src={row.client?.image || profile}
                                                  alt={row.name}
                                                  className="w-7 h-7 rounded-full object-cover shadow-sm flex-shrink-0 ring-1 ring-gray-100"
                                                />
                                                <span className="text-[12px] font-normal text-gray-800 truncate">
                                                  {row.client?.name}
                                                </span>
                                              </div>
                                            </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 ">
                          {row.siteName}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 ">
                        {row.address}
                      </td>

                      

                      <td className="py-3.5 px-4 text-center ">
                        <span
                          className={`inline-block min-w-[85px] ${statusStyles[row.status]}`}
                        >
                          {row.status}
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
                              title="Edit Site"
      className="inline-block text-left cursor-pointer px-2 py-2 text-xs font-medium text-blue-500 hover:bg-blue-200/50 border-b border-gray-300 w-full"
                            >
                              Edit
                              {/* <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg> */}
                            </button>

                            <DeleteButton
                              row={row}
                              deleteFn={(id) => Axios.delete(`/site/${id}`)}
                              queryKey="sites"
                              title="Delete Site"
                            />
                          </div>

                            </div>)}



                          
                          
                          
                        </td>
                    </tr>
                  );
                })
                              )
                            }
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
                      className={`w-7 h-7 flex items-center justify-center rounded text-xs transition cursor-pointer ${
                        page === num
                          ? "bg-blue-50 text-[#1D4ED8] font-bold border border-blue-200"
                          : "text-gray-600 hover:bg-gray-50 font-medium"
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
