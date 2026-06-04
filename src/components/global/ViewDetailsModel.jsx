import { createPortal } from "react-dom";
import { HiOutlineEye } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function ViewDetailsModal({ isOpen, onClose, title }) {
  const [searchParams] = useSearchParams();
  const dataType = searchParams.get("type");

  const rowData = useSelector((state) => {
    if (dataType === "entry-vehicle") return state.entryVehicles.selectedItem;
    if (dataType === "vehicle-ledger") return state.vehicleLedger.selectedItem;
    return null;
  });

  if (!isOpen || !rowData) return null;

  const formatKey = (key) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const ignoredKeys = ["id", "id_", "_id", "action"];

  const displayableData = Object.entries(rowData).filter(
    ([key]) => !ignoredKeys.includes(key.toLowerCase()),
  );

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 select-none">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl p-5 sm:p-6 w-full max-w-[480px] flex flex-col gap-y-4 z-10 border border-gray-100"
      >
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 shrink-0">
            <HiOutlineEye size={22} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {title} ({dataType === "entry-vehicle" ? "Vehicle" : dataType})
            </h2>
            <p className="text-[11px] text-gray-400">
              Information details container
            </p>
          </div>
        </div>

        <div className="bg-gray-50/70 border border-gray-100/80 rounded-xl p-4 max-h-[350px] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
            {displayableData.length > 0 ? (
              displayableData.map(([key, value]) => (
                <div key={key} className="break-words">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    {formatKey(key)}
                  </p>
                  <p className="text-gray-900 font-medium mt-0.5">
                    {value === true
                      ? "Yes"
                      : value === false
                        ? "No"
                        : String(value || "—")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-2 text-center py-2">
                No information available.
              </p>
            )}
          </div>
        </div>

        <div className="w-full mt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gray-900 text-white font-medium text-xs rounded-xl active:scale-[0.98] transition-all cursor-pointer hover:bg-black text-center"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
