import { Upload } from "lucide-react";
import { useState } from "react";
import ExportModel from "./ExportModel";

function ExportButton() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleExportConfirm = () => {
    setIsExportModalOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsExportModalOpen(true)}
        type="button"
        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm"
      >
        <Upload size={16} className="text-gray-500 stroke-[2]" />
        <span>Export</span>
      </button>

      <ExportModel
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onConfirm={handleExportConfirm}
      />
    </>
  );
}

export default ExportButton;
