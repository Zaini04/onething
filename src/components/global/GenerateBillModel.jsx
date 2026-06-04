import { createPortal } from "react-dom";
import { RiBillLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function GenerateBillModal({ isOpen, onClose, onConfirm }) {
  const [searchParams] = useSearchParams();
  const dataType = searchParams.get("type");

  const rowData = useSelector((state) => {
    if (dataType === "entry-vehicle") return state.entryVehicles.selectedItem;
    if (dataType === "vehicle-ledger") return state.vehicleLedger.selectedItem;

    return null;
  });

  if (!isOpen || !rowData) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl p-5 sm:p-6 w-full max-w-[420px] flex flex-col gap-y-4 z-10 border border-gray-100">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
            <RiBillLine size={22} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Generate Bill
            </h2>
          </div>
        </div>

        <div className="bg-gray-50/70 border border-gray-100/80 rounded-xl p-4 space-y-2.5 text-xs">
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pb-2.5 border-b border-gray-200/60 font-medium text-gray-600">
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Date
              </p>
              <p className="text-gray-900 mt-0.5">{rowData.date}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Sites
              </p>
              <p className="text-gray-900 mt-0.5">{rowData.site}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Vehicle No
              </p>
              <p className="text-gray-900 mt-0.5  py-0.5 rounded inline-block">
                {rowData.vehicleNo}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Material
              </p>
              <p className="text-gray-900 mt-0.5">{rowData.material}</p>
            </div>
          </div>

          <div className="pt-0.5 text-gray-600">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
              Vehicle
            </p>
            <p className="font-medium text-gray-800 mt-0.5">
              {rowData.vehicle}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-2.5 mt-1 space-y-1.5 shadow-xs">
            <div className="flex justify-between text-gray-500">
              <span>Rate Type:</span>
              <span className="font-medium text-gray-700 capitalize">
                {rowData.rateType}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Rate:</span>
              <span className="font-medium text-gray-700">
                Rs. {rowData.rate}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Total Sft/Vehicles:</span>
              <span className="font-medium text-gray-700">
                {rowData.rateType === "per sft"
                  ? `${rowData.totalSft} sft`
                  : `${rowData.totalVehicles} vehicles`}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-100 mt-1">
              <span className="font-bold text-gray-900">Total Rate:</span>
              <span className="text-sm font-extrabold text-blue-600">
                Rs. {rowData.totalRate}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-500 font-medium text-xs rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(rowData)} // Purane flow ki tarah rowData pass ho rha h
            className="flex-1 py-2.5 px-4 bg-black text-white font-medium text-xs rounded-xl hover:bg-gray-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
