import { useState } from "react";
import { clientInitialData } from "../../../assets/mockData";
import { TableSkeletonRows } from "../../global/TableSkeletonRows";

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

// const initialData = Array.from({ length: 50 }, (_, i) => {
//   const sites = ["Multan", "Overseas", "Lahore"];
//   const vehicles = [
//     "Standard Dump Truck",
//     "Mini Dump Trucks",
//     "Low-Side Dump Trucks",
//   ];
//   const vehicleNo = ["TLL-4679", "MJU-5210", "ABC-1234"];
//   const materials = ["Concrete", "Sand"];
//   const rateTypes = ["per sft", "per vehicle"];
//   const rate = ["50", "70", "80"];
//   const totalSft = ["100", "150", "200"];
//   const totalVehicles = ["12", "17", "22"];
//   const totalRate = Number(
//     rateTypes[i % 2] === "per sft"
//       ? totalSft[i % 3] * rate[i % 3]
//       : totalVehicles[i % 3] * rate[i % 3],
//   );

//   const paymentBy = ["cash", "fuel", "check", "other"];
//   const amount = ["1000", "25", "5000", "75"];
//   const note = [
//     "paid in full",
//     "pending",
//     "half payment",
//     "payment on delivery",
//   ];
//   return {
//     id: i + 1,
//     no: String(i + 1).padStart(2, "0"),
//     date: "24-10-2025",
//     vehicleNo: vehicleNo[i % 3],
//     vehicle: vehicles[i % 3],
//     material: materials[i % 2],
//     rateType: rateTypes[i % 2],
//     rate: rate[i % 3],
//     totalSft: totalSft[i % 3],
//     site: sites[i % 3],
//     totalRate: totalRate,
//     paymentBy: paymentBy[i % 4],
//     amount: amount[i % 4],
//     note: note[i % 4],
//   };
// });

export default function Billings({
  clientLedgerData,
  isLoading,
  page,
  setPage,
  perPage,
  setPerPage,
  totalPages,
}) {
  const [selected, setSelected] = useState([]);
  const [showPerPage, setShowPerPage] = useState(false);

  const pageData = clientLedgerData.slice(
    (page - 1) * perPage,
    page * perPage,
  );
  const allSelected =
    pageData.length > 0 && pageData.every((r) => selected.includes(r._id));

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
  console.log("clientledger",clientLedgerData)

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
    <div className="w-full bg-white rounded-2xl py-2 px-1 border border-gray-100 shadow-sm">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left border-collapse min-w-[1100px] table-auto">
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

                  <th className=" py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight w-16">
                    No
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Date <SortIcon />
                  </th>

                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Sites <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Vehicle No <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Vehicle <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Material Type<SortIcon />
                  </th>

                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Total Rate <SortIcon />
                  </th>

                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Payment By <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Amount <SortIcon />
                  </th>
                  <th className="w-16 py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Note <SortIcon />
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50/60">
                {isLoading ? (
                  <TableSkeletonRows rowsCount={perPage || 5} />
                ) : pageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-8 text-center text-sm text-gray-400"
                    >
                      No entries found.
                    </td>
                  </tr>
                ) : (
                  pageData.map((row, index) => {
                    const isRowSelected = selected.includes(row._id);
                    return (
                      <tr
                        key={row._id}
                        className={`transition-colors duration-150 ${
                          isRowSelected
                            ? "bg-blue-50/20"
                            : "hover:bg-gray-50/30"
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

                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800">
                          {(page - 1) * perPage + index + 1}
                        </td>

                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 tracking-wide select-none">
                          {new Date(row.date).toLocaleDateString()}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-block bg-[#F1F3F5] text-gray-700 text-[11px] font-medium px-2 py-1 rounded border border-gray-200/50">
                            {row.site?.siteName}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700 whitespace-nowrap">
                          {row.vehicle?.vehicleNo}
                        </td>

                        {/* Vehicle */}
                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700 whitespace-nowrap">
                          {row.vehicle?.typeVehicle}
                        </td>

                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                          {row.materialType}
                        </td>

                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                          {row.totalRate}
                        </td>

                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                          {row.payment?.method}
                        </td>
                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                          {row.payment?.amountReceived}
                        </td>
                        <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                          {row.payment?.note}
                        </td>
                        {/* <td className="py-3.5 px-4">
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
                      </td> */}

                        {/* <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.fuel}
                      </td> */}
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
                Showing {(page - 1) * perPage + 1} to{" "}
                {Math.min(page * perPage, clientLedgerData.length)} of{" "}
                {clientLedgerData.length} entries
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
