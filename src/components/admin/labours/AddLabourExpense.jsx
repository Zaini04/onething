import { useFormik } from "formik";
import {  useNavigate } from "react-router-dom";
import FormInput from "../../global/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "../../../configs/api";
import { toast } from "react-toastify";
import { toastError } from "../../../hooks/toastError";
import { useState } from "react";
import { useLabourDropdown } from "../../../redux/actions/labourAction";
import SearchSelect from "../../global/SearchSelect";
import DropDownLoader from "../../../hooks/DropDownLoader";
import { labourExpenseValidation } from "../../../validations/LabourValidation";

export default function AddLabourExpense({setEditedExpense,editExpense}) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
     const isEdit = !!editExpense;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const ExpenseMutation = useMutation({
    mutationFn: async (payload) => {
      setIsSubmitting(true);
      if (isEdit) {
      return Axios.put(`/labour/labour_expense/${editExpense._id}`, payload);
    }
      return Axios.post('/labour/add_labour_expense', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labours-bills"] });
      setIsSubmitting(false);
      formik.resetForm();
      toast.success("Labour expense saved successfully!");
      navigate(`/app/reports/labour-bills`);
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
      setIsSubmitting(false);
      toastError(err);
    }
  });



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date:  editExpense?.date || new Date().toISOString().split('T')[0] ,
      labour:  editExpense?.labour._id || "",
      amount:  editExpense?.amount || "",
      notes:  editExpense?.notes || "",
     
    },
    validationSchema: labourExpenseValidation,
    onSubmit: (values) => {

      ExpenseMutation.mutate(values);
    },
  });

  const handleClear = () => {
  formik.resetForm();

  if (isEdit) {
    setEditedExpense(null);
    navigate("/app/reports/labour-bills");
  }
};
const { data: labourDropdownData,isLoading:isLabourLoading } = useLabourDropdown();

const labourOptions =
  labourDropdownData?.map((c) => ({
    id: c._id,
    name: `${c.name} (${c.phoneNumber || 'No Phone'})`,
  })) || [];

  return (
  <div className="w-full lg:max-w-[540px] bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className=" flex justify-between  text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">Add Expense</h2>
      </div>     

      <form onSubmit={formik.handleSubmit} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-7 pt-2">
          <FormInput label="Date" id="date" name="date" type="date" formik={formik} />
       <div className="relative flex flex-col w-full">
   <SearchSelect
            label="Select Labour"
            placeholder={isLabourLoading ? "Loading Labours ":"Select Labour"}
            options={labourOptions}
            value={formik.values.labour}
            onChange={(val) => formik.setFieldValue("labour", val, true)}
            onBlur={() => formik.setFieldTouched("labour", true, true)}
            isError={formik.touched.labour && !!formik.errors.labour}
            errorMessage={formik.errors.labour}
          />       
            {isLabourLoading && (
              <DropDownLoader/>
            )}
          </div>   

          <FormInput label="Amount" id="amount" type="text" placeholder="Enter expense amount"  formik={formik} />
           <FormInput
            label="Notes"
            id="notes"
            type="textarea"
            placeholder="Add a note (optional)"
            rows={3}
            formik={formik}
          />

        <div className="flex items-center justify-end gap-4 mt-8 pt-2">
          <div className="flex gap-2 justify-center items-center">
            <button
              type="button"
              onClick={handleClear}
              className="px-5 sm:px-8 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
              disabled={isSubmitting}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
            >
              {isSubmitting ? "Saving..." : "Confirm"}
            </button>
          </div>
        </div>
      </form>

      
    </div>
  );
}