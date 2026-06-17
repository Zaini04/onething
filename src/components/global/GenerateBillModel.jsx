import { createPortal } from "react-dom";
import { RiBillLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Axios from "../../configs/api";
import { toast } from "react-toastify";
import { toastError } from "../../hooks/toastError";

export default function GenerateBillModal({ isOpen, onClose, onConfirm }) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const dataType = searchParams.get("type");
  const activeId = searchParams.get("id");

  // Print karne wale area ka reference create karein
  const componentRef = useRef(null);

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

  // --- TANSTACK MUTATION (Runs ONLY after successful print/download) ---
  const generateBillMutation = useMutation({
    mutationFn: async (id) => {
      const response = await Axios.post(`/entry-vehicle/generate_bill/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      const message = data?.data?.message || "Bill status updated in backend!";
      toast.success(message);
      
      if (onConfirm) onConfirm(rowData);

      // Refresh cache table data
      const cacheKey = dataType === "entry-vehicle" ? "entry-vehicles" : dataType;
      queryClient.invalidateQueries({ queryKey: [cacheKey] });
      
      onClose(); // Backend response ke baad modal close hoga
    },
    onError: (error) => {
      toastError(error);
    }
  });

  // --- REACT TO PRINT CONFIGURATION ---
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Receipt-${rowData?.vehicle?.vehicleNo || "Bill"}`,
    onAfterPrint: () => {
      // 🚀 Yeh tab chalega jab print popup band ho jayega (User clicked Print or Save)
      if (rowData?._id) {
        generateBillMutation.mutate(rowData._id);
      }
    },
  });
  

  if (!isOpen || !rowData) return null;

  const formattedPreviewDate = rowData.date 
    ? new Date(rowData.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) 
    : "—";

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Container Card (Aapka exact model UI) */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-5 sm:p-6 w-full max-w-[420px] flex flex-col gap-y-4 z-10 border border-gray-100">
        
        {/* PRINTABLE AREA TARGET (Srf yeh box print ya PDF me jayega) */}
        <div ref={componentRef} className="w-full bg-white p-2 print:p-6 flex flex-col gap-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0 print:border print:border-blue-100">
              <RiBillLine size={22} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Generate Bill Receipt
              </h2>
            </div>
          </div>

          <div className="bg-gray-50/70 border border-gray-100/80 rounded-xl p-4 space-y-2.5 text-xs print:bg-gray-50 print:border">
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pb-2.5 border-b border-gray-200/60 font-medium text-gray-600">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Date</p>
                <p className="text-gray-900 mt-0.5">{formattedPreviewDate}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Sites</p>
                <p className="text-gray-900 mt-0.5">{rowData.site?.siteName || rowData.site || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Vehicle No</p>
                <p className="text-gray-900 mt-0.5">{rowData.vehicle?.vehicleNo || rowData.vehicleNo || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Material</p>
                <p className="text-gray-900 mt-0.5">{rowData.materialType || rowData.material || "—"}</p>
              </div>
            </div>

            <div className="pt-0.5 text-gray-600">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Client / Vehicle Detail</p>
              <p className="font-medium text-gray-800 mt-0.5">
                {rowData.client?.name || rowData.vehicle?.vehicleNo || "—"}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-2.5 mt-1 space-y-1.5 shadow-xs">
              <div className="flex justify-between text-gray-500">
                <span>Rate Type:</span>
                <span className="font-medium text-gray-700 capitalize">{rowData.rateType}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Rate:</span>
                <span className="font-medium text-gray-700">Rs. {rowData.rate}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Total Sft/Vehicles:</span>
                <span className="font-medium text-gray-700">
                  {rowData.rateType === "per sft"
                    ? `${rowData.totalSft || rowData.totalSftVehicles || 0} sft`
                    : `${rowData.totalVehicles || rowData.totalSftVehicles || 0} vehicles`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-100 mt-1">
                <span className="font-bold text-gray-900">Total Rate:</span>
                <span className="text-sm font-extrabold text-blue-600">Rs. {rowData.totalRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center gap-3 w-full mt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={generateBillMutation.isPending}
            className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-500 font-medium text-xs rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePrint}
            disabled={generateBillMutation.isPending}
            className="flex-1 py-2.5 px-4 bg-black text-white font-medium text-xs rounded-xl hover:bg-gray-900 disabled:opacity-50"
          >
            {generateBillMutation.isPending ? "Saving Status..." : "Print & Generate"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}