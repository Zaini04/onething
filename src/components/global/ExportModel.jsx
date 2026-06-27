import { Upload } from "lucide-react";
import { createPortal } from "react-dom"; // 1. Ye import karein
import FormInput from "./FormInput";
import { useFormik } from "formik";

function ExportModel({ isOpen, onClose, onConfirm,isSubmitting }) {
  
  const formik = useFormik({
    initialValues:{
      exportName:"PDF"
    },
    onSubmit:(values)=>{
      console.log("form",values)
      onConfirm(values.exportName)
    }
  })
  
  if (!isOpen) return null;

 

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
<form className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 gap-y-4 w-full max-w-[320px] flex flex-col  items-center text-center z-10 animate-in fade-in zoom-in-95 duration-200" onSubmit={formik.handleSubmit}>

        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
          <Upload size={28} className="stroke-[1.8]" />
        </div>

        <h2 className="text-xl font-medium text-gray-900 tracking-tight mb-2">
          Export
        </h2>
        <FormInput
          label="Export"
          id="exportName"
          type="select"
          placeholder="choose pdf or excel"
          // defaultOption="PDF"
          options={[
            { label: "PDF", value: "PDF" },
            { label: "Excel", value: "Excel" },
          ]}
          formik={formik}
        />

        <div className="flex items-center gap-3 w-full mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
          type="submit"
            className="flex-1 py-3 px-4 bg-black  text-white font-medium text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-red-100"
          >
        {isSubmitting ? "Exporting" : "Export"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}

export default ExportModel;
