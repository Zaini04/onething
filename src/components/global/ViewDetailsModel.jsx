import { createPortal } from "react-dom";
import { HiOutlineEye } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function ViewDetailsModal({ isOpen, onClose, title }) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const dataType = searchParams.get("type");
  const activeId = searchParams.get("id");
  
  // --- TANSTACK CACHE FINDER ---
  let rowData = null;

  if (isOpen && activeId) {
    const cacheKey = dataType === "entry-vehicle" ? "entry-vehicles" : dataType;
    const queriesData = queryClient.getQueriesData({ queryKey: [cacheKey] });
    
    for (const [, cacheResponse] of queriesData) {
      if (!cacheResponse) continue;

      const records = cacheResponse.docs || 
                      (Array.isArray(cacheResponse) ? cacheResponse : 
                      (cacheResponse.data || cacheResponse.vehicles || cacheResponse.entries || cacheResponse));

      if (Array.isArray(records)) {
        const found = records.find((item) => String(item._id) === activeId);
        if (found) {
          rowData = found;
          break;
        }
      }
    }
  }

  if (!isOpen || !rowData) return null;

  // --- DATE FORMATTER FUNCTION ---
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) return "—";
    return parsedDate.toLocaleDateString(); // Exact Table format: .toLocaleDateString()
  };

  // 🛠️ EXACT TABLE MAPPING STRUCTURE & SEQUENCE
  const displayableData = [
    { label: "Client Name", value: rowData.client?.name },
    { label: "Sites", value: rowData.site?.siteName },
    { label: "Vehicle", value: rowData.vehicle?.vehicleNo },
    { label: "Material", value: rowData.materialType },
    { label: "Rate Type", value: rowData.rateType },
    { label: "Rate", value: rowData.rate },
    { 
      label: rowData.rateType === "per sft" ? "Total Sft" : "Total Vehicles", 
      value: rowData.rateType === "per sft" ? `${rowData.totalSftVehicles} sft` : `${rowData.totalSftVehicles} vehicles` 
    },
    { label: "Total Rate", value: rowData.totalRate },
    { label: "Material Cost", value: rowData.materialCost },
    { label: "Diesel Liters", value: rowData.dieselInLitters },
    { label: "Diesel Cost", value: rowData.dieselCost },
    { label: "Driver Expense", value: rowData.driverExpense },
    { label: "Loading Cost", value: rowData.loading },
    { label: "Other Expenses", value: rowData.otherExpenses },
    { label: "Remaining Amount", value: rowData.remainingAmount },
    { label: "Payment Status", value: rowData.paymentStatus },
    { label: "Bill Status", value: rowData.billStatus },
    { label: "Received", value: rowData.payment?.amountReceived },
    { label: "Due", value: rowData.clientDue }
  ];

  const headerDate = rowData.date ? formatDate(rowData.date) : null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 select-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300" onClick={onClose} />
      <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-2xl shadow-2xl p-5 sm:p-6 w-full max-w-[480px] flex flex-col gap-y-4 z-10 border border-gray-100">
        
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 shrink-0">
              <HiOutlineEye size={22} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {title} ({dataType === "entry-vehicle" ? "Vehicle" : dataType})
              </h2>
              <p className="text-[11px] text-gray-400">Information details container</p>
            </div>
          </div>

          {/* DATE AT THE RIGHT END */}
          {headerDate && (
            <div className="text-right shrink-0">
              <span className="text-xs font-medium text-gray-900 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg block mt-0.5">
                {headerDate}
              </span>
            </div>
          )}
        </div>

        {/* DATA GRID SECTION */}
        <div className="bg-gray-50/70 border border-gray-100/80 rounded-xl p-4 max-h-[350px] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
            {displayableData.map((item, index) => {
              const val = item.value === "" || item.value === null || item.value === undefined ? "—" : item.value;
              return (
                <div key={index} className="flex flex-col gap-1">
                  <span className="font-medium text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-800 break-words">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-black hover:bg-gray-800 rounded-xl transition duration-150 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}