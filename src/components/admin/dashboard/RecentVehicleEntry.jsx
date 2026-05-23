import { useState } from "react";
import profile from "../../../assets/images/profileImage.jpg";

const statusStyles = {
  Active: "bg-[#E6F6EC] text-[#15803D] border border-[#DCFCE7]",
  InActive: "bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]",
  Block: "bg-[#FEE2E2] text-[#DC2626] border border-[#FEE2E2]",
};

const initialData = Array.from({ length: 50 }, (_, i) => {
  const names = ["Imran Khan", "Saad"];
  const name = names[i % 2];

  const site =
    i === 0
      ? "Multan"
      : i === 1
        ? "Overseas"
        : i === 7 || i === 8 || i === 9
          ? "Multan"
          : "Lahore";

  const status =
    i === 0 || i === 1 || i === 7 || i === 8
      ? "Active"
      : i === 9
        ? "Block"
        : "InActive";

  return {
    id: i + 1,
    no: String(i + 1).padStart(2, "0"),
    date: "24-10-2025",
    clientName: name,
    site,
    phone: "0301-2345678",
    status,
  };
});

function SortIcon() {
  return (
    <svg
      className="inline ml-1 w-3 h-3 text-gray-400 cursor-pointer"
      fill="none"
      viewBox="0 0 10 14"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        d="M5 1v12M1 9l4 4 4-4M1 5l4-4 4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RecentVehicleEntry() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showPerPage, setShowPerPage] = useState(false);

  const totalPages = Math.ceil(initialData.length / perPage);
  const pageData = initialData.slice((page - 1) * perPage, page * perPage);
  const allSelected =
    pageData.length > 0 && pageData.every((r) => selected.includes(r.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) =>
        prev.filter((id) => !pageData.map((r) => r.id).includes(id)),
      );
    } else {
      setSelected((prev) => [
        ...prev,
        ...pageData.map((r) => r.id).filter((id) => !prev.includes(id)),
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
    <div className="w-full bg-white rounded-2xl py-6 px-4 md:px-6">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Title */}
        <h2 className="text-[15px] font-medium text-black mb-4 tracking-tight">
          Recent Vehicle Entry
        </h2>

        {/* Table Container Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
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
                  <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 tracking-wide w-16">
                    No
                  </th>
                  <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 tracking-wide whitespace-nowrap">
                    Date <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 tracking-wide whitespace-nowrap">
                    Client Name <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 tracking-wide whitespace-nowrap">
                    Site <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 tracking-wide whitespace-nowrap">
                    Phone Number <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 tracking-wide whitespace-nowrap">
                    Status <SortIcon />
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {pageData.map((row) => {
                  const isRowSelected = selected.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`transition-colors duration-150 ${
                        isRowSelected ? "bg-blue-50/30" : "hover:bg-gray-50/50"
                      }`}
                    >
                      <td className="py-3.5 px-5 text-center">
                        <input
                          type="checkbox"
                          checked={isRowSelected}
                          onChange={() => toggleRow(row.id)}
                          className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-black">
                        {row.no}
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-black">
                        {row.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={profile}
                            alt={row.clientName}
                            className="w-8 h-8 rounded-full object-cover border border-gray-100 shadow-sm"
                          />
                          <span className="text-[12px] font-normal text-black">
                            {row.clientName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-3 py-1 rounded-lg bg-[#F1F5F9] text-black text-[12px] font-normal border border-gray-200">
                          {row.site}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-black tracking-wide">
                        {row.phone}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-4 py-1.5 rounded-xl text-[12px] font-medium cursor-pointer tracking-wide min-w-[76px] text-center ${statusStyles[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-gray-100 bg-white">
            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5 order-2 sm:order-1">
              {/* Prev Button */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg font-medium cursor-pointer border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
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

              {/* Page Numbers */}
              {getPaginationNumbers().map((num, i) =>
                num === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
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

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium cursor-pointer transition"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto text-[13px] text-gray-400 order-1 sm:order-2 font-normal">
              <span>
                Showing {(page - 1) * perPage + 1} to{" "}
                {Math.min(page * perPage, initialData.length)} of{" "}
                {initialData.length} entries
              </span>

              <div className="relative">
                <button
                  onClick={() => setShowPerPage((s) => !s)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer border border-gray-200 text-black hover:bg-gray-50 transition text-xs font-normal"
                >
                  Show {perPage}
                  <svg
                    className={`w-3 h-3 text-black transition-transform duration-200 ${showPerPage ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showPerPage && (
                  <div className="absolute bottom-full right-0 mb-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-20 min-w-[90px]">
                    {[5, 10, 20, 50].map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          setPerPage(n);
                          setPage(1);
                          setShowPerPage(false);
                        }}
                        className={`block w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 transition ${
                          perPage === n
                            ? "font-normal text-black bg-gray-50"
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
