import { useEffect, useRef, useState } from "react";
import profile from "../../../assets/images/profileImage.jpg";
import PaymentReceivedButton from "../../global/PaymentreceivedButton";
import GenerateBillButton from "../../global/GenerateBillButton";
import ViewButton from "../../global/ViewButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setvehicleLedgerById } from "../../../redux/slices/vehicleLedgerSlice";

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
//   const names = ["Imran Khan", "Saad"];
//   const sites = ["Multan", "Overseas", "Lahore"];

//   const materials = ["Concrete", "Sand"];
//   const rateTypes = ["per sft", "per vehicle"];
//   const rate = ["50", "70", "80"];
//   const totalSft = ["100", "150", "200"];
//   const totalVehicles = ["5", "10", "15"];
//   const totalRate = Number(rateTypes[i % 2] === "per sft" ? totalSft[i % 3] * rate[i % 3] : totalVehicles[i % 3] * rate[i % 3]);
//   // const vendors = ["Mudasir", "Muaaz", "Musaz"];
//   const driverExpense = 300;
//   const loading = 200;
//   const materialCost = 500;
//   const otherExpenses = 200;
//   const  diesal= 350;
//   const paymentReceived = ['received', 'pending'];
//     const billStatus = ['generated', 'pending'];
//   return {
//     id: i + 1,
//     no: String(i + 1).padStart(2, "0"),
//     date: "24-10-2025",
//     clientName: names[i % 2],
//     site: sites[i % 3],
//     material: materials[i % 2],
//     rateType: rateTypes[i % 2],
//     rate: rate[i % 3],
//     totalSft: totalSft[i % 3],
//     totalVehicles: totalVehicles[i % 3],
//     totalRate: totalRate,
//     diesal: diesal,
//     driverExpense: driverExpense,
//     loading: loading,
//     materialCost: materialCost,
//     otherExpenses: otherExpenses,
//     // vendorName: vendors[i % 3],
//     // fuel: "35,000",
//     remaingAmount: totalRate-driverExpense - diesal-loading-materialCost-otherExpenses,
//     paymentReceived: paymentReceived[i % 2],
//     billStatus: billStatus[i % 2] ,
//   };
// });

export default function VehicleTable() {
  const dispatch = useDispatch();
  const initialData = useSelector((state) => state.vehicleLedger.items);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showPerPage, setShowPerPage] = useState(false);
  const [activeRowMenu, setActiveRowMenu] = useState(null);

  const menuRef = useRef(null);

  const handleActionClick = (model, id) => {
    dispatch(setvehicleLedgerById(id));
    const newUrl = `${window.location.pathname}?modal=${model}&id=${id}&type=vehicle-ledger`;
    window.history.pushState({}, "", newUrl);

    setActiveRowMenu(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("modal")) {
        return;
      }

      if (menuRef.current && menuRef.current.contains(event.target)) {
        return;
      }

      setActiveRowMenu(null);
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
                    Material <SortIcon />
                  </th>

                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Rate Type <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Rate <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Total Sft/Vehicles <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Total Rate <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Material Cost <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Diesal <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Driver Expense <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Loading <SortIcon />
                  </th>

                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Other Expenses <SortIcon />
                  </th>

                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Remaining Amount <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Payment Status <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap">
                    Bill Status <SortIcon />
                  </th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 tracking-tight whitespace-nowrap sticky right-0 z-40 bg-[#F7F7F7]">
                    Action <SortIcon />
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50/60">
                {pageData.map((row) => {
                  const isRowSelected = selected.includes(row.id);
                  const isMenuOpen = activeRowMenu === row.id;
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
                          onChange={() => toggleRow(row.id)}
                          className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800">
                        {row.no}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-800 tracking-wide select-none">
                        {row.date}
                      </td>

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

                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#F1F3F5] text-gray-700 text-[11px] font-medium px-2 py-1 rounded border border-gray-200/50">
                          {row.site}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.material}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700 whitespace-nowrap">
                        {row.rateType}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.rate}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.rateType === "per sft"
                          ? `${row.totalSft} sft`
                          : `${row.totalVehicles} vehicles`}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.totalRate}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.materialCost}
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.diesal}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.driverExpense}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.loading}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.otherExpenses}
                      </td>

                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.remaingAmount}
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.paymentReceived}
                      </td>
                      <td className="py-3.5 px-4 text-[12px] font-normal text-gray-700">
                        {row.billStatus}
                      </td>
                      <td
                        className={`py-3.5 px-4 text-[12px] font-normal sticky right-0 transition-colors duration-150 overflow-visible ${
                          isRowSelected ? "bg-[#F3F7FE]" : "bg-white"
                        } ${isMenuOpen ? "z-[100]" : "z-30"}`}
                      >
                        <div className="flex justify-center items-center w-full h-full">
                          <BsThreeDotsVertical
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveRowMenu(isMenuOpen ? null : row.id);
                            }}
                            className="cursor-pointer text-gray-500 hover:text-black text-xl p-1 rounded hover:bg-gray-100"
                          />
                        </div>

                        {isMenuOpen && (
                          <div
                            ref={menuRef}
                            className="absolute right-12 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-2xl py-2 px-2 w-44 z-[9999] flex flex-col gap-1.5 animation-fade-in"
                          >
                            {row.paymentReceived === "received" ? (
                              ""
                            ) : (
                              <PaymentReceivedButton
                                onClick={() =>
                                  handleActionClick("payment", row.id)
                                }
                                type="vehicle-ledger"
                                row={row}
                              />
                            )}

                            {row.billStatus === "generated" ? (
                              ""
                            ) : (
                              <GenerateBillButton
                                onClick={() =>
                                  handleActionClick("bill", row.id)
                                }
                                type="vehicle-ledger"
                                row={row}
                              />
                            )}

                            {/* <button 
            className="inline-block text-left cursor-pointer px-2 py-1 text-xs font-medium  text-gray-500 hover:bg-gray-300  border-b  border-gray-300"
      >
        
        View 
      </button> */}
                            <ViewButton
                              onClick={() => handleActionClick("view", row.id)}
                              type="vehicle-ledger"
                              row={row}
                            />
                          </div>
                        )}
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
                })}
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
                {Math.min(page * perPage, initialData.length)} of{" "}
                {initialData.length} entries
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
