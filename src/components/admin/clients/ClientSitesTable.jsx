import { useState } from "react";
import {  fetchSitesWithClients } from "../../../redux/actions/siteAction";
import { useQuery } from "@tanstack/react-query";
import { TableSkeletonRows } from "../../global/TableSkeletonRows";
import { useParams } from "react-router-dom";

const statusStyles = {
  Active:
    "bg-[#E6F6EC] text-[#15803D] font-normal cursor-pointer rounded-lg text-xs px-3 py-1 text-center border border-transparent",
  InActive:
    "bg-[#EFF6FF] text-[#1D4ED8] font-normal cursor-pointer rounded-lg text-xs px-3 py-1 text-center border border-transparent",
  Block:
    "bg-[#FEE2E2] text-[#DC2626] font-normal cursor-pointer rounded-lg text-xs px-3 py-1 text-center border border-transparent",
};

// const initialData = Array.from({ length: 50 }, (_, i) => {
//   const sites = ["Multan", "Overseas", "Lahore"];
//   const addresses = ["Plot 41 B, Block B...", "Plot 41 B, Block B..."];
//   const material = ["sand", "soil", "concrete"];

//   const site = sites[i % 3];
//   const address = addresses[i % 2];
//   const rateType = ["perSft", "perVehicle"][i % 2];
//   const materialType = material[i % 3];

//   const status =
//     i === 0 || i === 1 || i === 7 || i === 8 || i === 9
//       ? i === 9
//         ? "Block"
//         : "Active"
//       : "InActive";

//   return {
//     id: i + 1,
//     no: String(i + 1).padStart(2, "0"),
//     site,
//     address,
//     rateType,
//     materialType,
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

export default function ClientSitesTable() {

  const {id} = useParams()
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showPerPage, setShowPerPage] = useState(false);


  const [apiFilters, setApiFilters] = useState({});

  console.log(id)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["client-sites", page, perPage , apiFilters,id],
    queryFn: fetchSitesWithClients,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  });

  const clientSites = data?.docs || [];
  
  const totalPages = data?.pages || 1;
    const totalEntries = data?.docsCount || 10



  const pageData = clientSites.slice((page - 1) * perPage, page * perPage);
  const allSelected =
    pageData.length > 0 && pageData.every((r) => selected.includes(r._id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) =>
        prev.filter((id) => !pageData.map((r) => r._id).includes(id)),
      );
    } else {
      setSelected((prev) => [
        ...prev,
        ...pageData.map((r) => r._id).filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const toggleRow = (id) => {
    setSelected((prev) =>
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
    <div className="w-full bg-white rounded-2xl py-2 px-1">
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
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight w-16">
                    No
                  </th>

                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Site <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Address <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Material <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Rate Type <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Rate <SortIcon />
                  </th>

                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap text-right pr-8">
                    Status <SortIcon />
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
                                  console.log("roma",row.materialsRates)
                  const isRowSelected = selected.includes(row._id);
                  return (
                    <tr
                      key={row.id}
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

                      <td className="py-3.5 px-4 text-[11px] font-normal text-black">
                        {(page - 1) * perPage + index + 1}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#F1F3F5] text-gray-700 text-[11px] font-medium px-2 py-1 rounded border border-gray-200/50">
                          {row.siteName}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[11px] font-normal text-black">
                        {row.address}
                      </td>

                      <td className="py-3.5 px-4 text-[11px] font-normal text-black">
                        {row.materialsRates?.map(item => (<p>{item.materialType}</p>) )}
                      </td>

                      <td className="py-3.5 px-4 text-[11px] font-normal text-black tracking-wide">
                        {row.materialsRates?.map(item => (<p>{item.rateType}</p>) )}
                      </td>
                      <td className="py-3.5 px-4 text-[11px] font-normal text-black tracking-wide">
                        {row.materialsRates?.map(item => (<p>{item.rate}</p>) )}
                      </td>

                      <td className="py-3.5 px-4 text-right pr-8">
                        <span
                          className={`inline-block min-w-[80px] ${statusStyles[row.status]}`}
                        >
                          {row.status}
                        </span>
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
