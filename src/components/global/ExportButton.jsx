import { Upload } from "lucide-react";
import { useState } from "react";
import ExportModel from "./ExportModel";
import { exportCompanyRecordsPdf } from "../../redux/actions/companyRecordsAction";
import Axios from "../../configs/api";

function ExportButton({ id, selectedRows, apiFilters }) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false)

  const handleExportConfirm = async (exportType) => {
    isSubmitting ? setIsExportModalOpen(true) :     setIsExportModalOpen(false);
    console.log("export", exportType);
    if (exportType === "PDF") {
      setIsSubmitting(true)
      try {
        const blob = await exportCompanyRecordsPdf({
          id,
          selectedRows,
          filters: apiFilters,
        });

        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement("a");

        link.href = url;
        link.download = `company-records-${Date.now()}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(error);
      }finally{
        setIsSubmitting(false)
      }
      
    }
    if (exportType === "Excel") {
      setIsSubmitting(true)
      try {
         const response = await Axios.post(
        `/company-records/client_records/${id}/export-excel`,
        {
          ids: selectedRows,
        },
        {
          params: apiFilters,
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.download = "company-records.xlsx";
      link.click();
      } catch (error) {
        console.log(error)
      } finally{
        setIsSubmitting(false)
      }
     
    }
  };
  return (
    <>
      <button
        onClick={() => setIsExportModalOpen(true)}
        type="button"
        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm"
      >
        <Upload size={16} className="text-gray-500 stroke-[2]" />
        <span>{isSubmitting ? "Exporting" : "Export"}</span>
      </button>

      <ExportModel
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onConfirm={handleExportConfirm}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

export default ExportButton;
