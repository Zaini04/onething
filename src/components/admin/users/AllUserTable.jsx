import { useState } from "react";
import DeleteButton from "../../global/DeleteButton";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/actions/superAdminActions";
// import { useNavigate } from "react-router-dom";

const statusStyles = {
  Active :
    "bg-[#E6F6EC] text-[#15803D] font-medium rounded-lg text-xs px-3 py-1 text-center border border-transparent",
  InActive:
    "bg-[#EFF6FF] text-[#1D4ED8] font-medium rounded-lg text-xs px-3 py-1 text-center border border-transparent",
  view: "p-2 rounded-xl bg-[#E6F7F5] text-[#00A389] hover:bg-[#D4F2EE] transition cursor-pointer",

  Blocked:
    "bg-[#FEE2E2] text-[#DC2626] font-semibold rounded-lg text-xs px-3 py-1 text-center border border-transparent",

  Deleted:
    "bg-[#FEE2E2] text-[#DC2626] font-semibold rounded-lg text-xs px-3 py-1 text-center border border-transparent",
};
const statusStyle = {
  active :
    "bg-[#E6F6EC] text-[#15803D] font-medium rounded-lg text-xs px-3 py-1 text-center border border-transparent",
  inactive:
    "bg-[#EFF6FF] text-[#1D4ED8] font-medium rounded-lg text-xs px-3 py-1 text-center border border-transparent",
  view: "p-2 rounded-xl bg-[#E6F7F5] text-[#00A389] hover:bg-[#D4F2EE] transition cursor-pointer",

  blocked:
    "bg-[#FEE2E2] text-[#DC2626] font-semibold rounded-lg text-xs px-3 py-1 text-center border border-transparent",

  deleted:
    "bg-[#FEE2E2] text-[#DC2626] font-semibold rounded-lg text-xs px-3 py-1 text-center border border-transparent",
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

function TableSkeletonRows({ rowsCount = 5 }) {
  return Array.from({ length: rowsCount }).map((_, idx) => (
    <tr key={`skeleton-${idx}`} className="animate-pulse border-b border-gray-50">
      {/* Checkbox Column */}
      <td className="py-4 px-5 text-center">
        <div className="w-4 h-4 bg-gray-200 rounded mx-auto"></div>
      </td>
      {/* No Column */}
      <td className="py-4 px-4">
        <div className="h-3 w-6 bg-gray-200 rounded"></div>
      </td>
      {/* User Name + Image Column */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </td>
      {/* Email Column */}
      <td className="py-4 px-4">
        <div className="h-3 w-40 bg-gray-200 rounded"></div>
      </td>
      {/* Role Column */}
      <td className="py-4 px-4">
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </td>
      {/* Status Column */}
      <td className="py-4 px-4 text-center">
        <div className="h-5 w-16 bg-gray-200 rounded-lg mx-auto"></div>
      </td>
      {/* Action Column */}
      <td className="py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-7 h-7 bg-gray-200 rounded-xl"></div>
          <div className="w-7 h-7 bg-gray-200 rounded-lg"></div>
          <div className="w-7 h-7 bg-gray-200 rounded-lg"></div>
        </div>
      </td>
    </tr>
  ));
}

export default function AllUserTable({
  setEditedUser,
  usersData = [],
  isLoading,
  page,
  setPage,
  perPage,
  setPerPage,
  totalPages,
  totalEntries
}) {
  const [selected, setSelected] = useState([]);
  const [showPerPage, setShowPerPage] = useState(false);

  const dispatch = useDispatch()
  const pageData = usersData;
  const allSelected =
    pageData.length > 0 && pageData.every((r) => selected.includes(r._id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) =>
        prev.filter((id) => !pageData.map((r) => r._id).includes(id))
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
  setEditedUser(row);
};

//   const handleView = (row) => {
//     console.log("View clicked for vehicle:", row);
//   };

  return (
    <div className="w-full bg-white rounded-2xl py-2 px-1 border border-gray-100 shadow-sm">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-[#F7F7F7] border-b border-gray-100">
                  <th className="py-4 px-5 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      disabled={isLoading || pageData.length === 0}
                      className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer disabled:opacity-30"
                    />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight ">
                    No
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    User Name <SortIcon />
                  </th>
                  <th className="w-16  py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Email <SortIcon />
                  </th>
                  <th className="w-4 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Role <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap text-center">
                    Status <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight text-center ">
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
                ) : (
                  pageData.map((row, index) => {
                    const isRowSelected = selected.includes(row?.id);
                    return (
                      <tr
                        key={row?._id || index}
                        className={`transition-colors duration-150 ${
                          isRowSelected ? "bg-blue-50/20" : "hover:bg-gray-50/30"
                        }`}
                      >
                        <td className="py-3.5 px-5 text-center">
                          <input
                            type="checkbox"
                            checked={isRowSelected}
                            onChange={() => toggleRow(row?._id)}
                            className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800">
                          {(page - 1) * perPage + index + 1}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            {row?.image ? <img
                              src={row?.image}
                              alt={row?.username}
                              className="w-7 h-7 rounded-full object-cover shadow-sm ring-1 ring-gray-100 bg-gray-100"
                            />
                        :
                        ''
                        }
                            
                            <span className="text-[12px] font-normal text-gray-800">
                              {row?.username}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5  text-[12px] font-normal text-gray-900 ">
                          {row?.email}
                        </td>

                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                          {row?.role?.name || "-"}
                        </td>

                        <td className="py-3.5 px-4 text-center text-[12px] font-normal text-gray-700">
                          <span className={row?.status ? statusStyle[row.status] || statusStyles[row.status] : ""}>
                            {row?.status || "-"}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* <button
                              onClick={() => handleView(row)}
                              className={statusStyles.view}
                              title="View Record Details"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button> */}

                            {/* <ViewButton row /> */}

                            <button
                              onClick={() => handleEdit(row)}
                              type="button"
                              title="Edit Vehicle"
                              className="w-7 h-7 flex items-center justify-center bg-[#F4F4F5] hover:bg-[#E4E4E7] text-gray-700 rounded-lg transition-colors cursor-pointer active:scale-95"
                            >
                              <svg
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
                              </svg>
                            </button>

                            <DeleteButton row={row} deleteFn={(id) => dispatch(deleteUser(id))} 
  queryKey="users" 
  title="Delete User" />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-white">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {!isLoading &&
                  getPaginationNumbers().map((num, i) =>
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
                    )
                  )}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || isLoading}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
                  disabled={isLoading}
                  className="flex items-center gap-1 px-2 py-1 rounded cursor-pointer border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-normal disabled:opacity-50"
                >
                  Show {perPage}
                  <svg
                    className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                      showPerPage ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
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