import { useFormik } from "formik";
import { FaArrowLeft } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import FormInput from "../../global/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "../../../configs/api";
import { toast } from "react-toastify";
import { toastError } from "../../../hooks/toastError";
import { useState } from "react";

export default function AddOfficeExpense() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clientMutation = useMutation({
    mutationFn: async (payload) => {
      setIsSubmitting(true);
      
      return Axios.post('/office-expense/add', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["office-expenses"] });
      setIsSubmitting(false);
      formik.resetForm();
      toast.success("Company record created successfully!");
      navigate(`/app/office-expense/`);
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
      setIsSubmitting(false);
      toastError(err);
    }
  });



  const formik = useFormik({
    initialValues: {
      date:  new Date().toISOString().split('T')[0] ,
      employeeName:  "",
      expenseType:"Office",
      amount:  "",
      remarks:  "",
     
    },
    validationSchema: '',
    onSubmit: (values) => {



      

      clientMutation.mutate(values);
    },
  });

  
 

 




  // console.log("fco",fuelCompanyOptions)
  // Recalculates dynamically every render loop securely

  return (
  <div className="w-full lg:max-w-[540px] bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className=" flex justify-between  text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">Add Expense</h2>
      </div>     

      <form onSubmit={formik.handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-7">
          <FormInput label="Date" id="date" name="date" type="date" formik={formik} />
            <FormInput
          label="Expense Type"
          id="expenseType"
          type="select"
          options={[
            { label: "Office", value: "Office" },
            { label: "Site", value: "Site" },
          ]}
          formik={formik}
        />
          <FormInput label="Employee Name" id="employeeName" placeholder="Enter employee name here" name="employeeName" type="text" formik={formik} />
          
          
          

          
      

        
          

          <FormInput label="Amount" id="amount" type="text" placeholder="Enter expense amount"  formik={formik} />
           <FormInput
            label="Remarks"
            id="remarks"
            type="textarea"
            placeholder="Add a remarks (optional)"
            rows={3}
            formik={formik}
          />
         
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-2">
          <div className="flex gap-2 justify-center items-center">
            <button
              type="button"
              onClick={formik.handleReset}
              className="px-5 sm:px-8 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
              disabled={isSubmitting}
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Confirm"}
            </button>
          </div>
        </div>
      </form>

      
    </div>
  );
}