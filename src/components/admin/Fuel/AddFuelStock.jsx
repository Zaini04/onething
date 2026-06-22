import { useFormik } from "formik";
import FormInput from "../../global/FormInput";
import { toastError } from "../../../hooks/toastError";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Axios from "../../../configs/api";
import { addFuelStock } from "../../../validations/AddFuelStockValidation";
import {  useFuelStockCompaniesDropdown } from "../../../redux/actions/fuelAction";
import SearchSelect from "../../global/SearchSelect";
import DropDownLoader from "../../../hooks/DropDownLoader";

export default function AddFuelStock({editFuelCompany,setEditedFuelCompany}) {



    const queryClient = useQueryClient()
  const navigate = useNavigate()
   const isEdit = !!editFuelCompany

   console.log("edc",editFuelCompany)
    
  const [isSubmitting, setIsSubmitting] = useState(false);


const fuelCompanyMutation = useMutation({
  mutationFn: async (values) => {
    setIsSubmitting(true)
    if (isEdit) {
      return  Axios.put(`/fuel/${editFuelCompany._id}`, values);
    }

    return Axios.post("/fuel/add_fuel_stock", values);
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["fuel-stocks"] });
    formik.resetForm();
    setIsSubmitting(false)
    navigate("/app/fuel-stock");
    toast.success(isEdit? "fuel stock edited successfully": "fuel stock added successfully")
  },

  onError: (error) => {
    setIsSubmitting(false)
    toastError(error)
    console.log(error);
  },
});

  const formik = useFormik({
          enableReinitialize: true,

    initialValues: {
      fuelCompany: editFuelCompany?.fuelCompany._id || '',
      fuelLiters: editFuelCompany?.fuelLiters.toString() || "",
    },
    validationSchema: addFuelStock,
    onSubmit: async (values) => {
      console.log("fu",values)
        fuelCompanyMutation.mutate(values)
    },
  });
  const handleClear = () => {
  formik.resetForm();

  if (isEdit) {
    setEditedFuelCompany(null);
    navigate("/app/fuel-stock");
  }
};

const { data:fuelCompaniesData , isLoading:isFuelCompaniesLoading } = useFuelStockCompaniesDropdown();

const fuelCompanies =
  fuelCompaniesData?.map((c) => ({
    id: c._id,
    name: c.fuelCompany,
  })) || [];

  console.log("flc",fuelCompanies)

  return (
    <div className=" bg-white rounded-2xl flex items-start justify-center p-4">
      <div className="w-full lg:max-w-[440px]">
        <h2 className="text-lg font-medium text-black mb-6 tracking-tight">
          Add Fuel Company
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className=" rounded-2xl  flex flex-col  justify-between"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-7 pt-2">
                   <div className="relative flex flex-col w-full">

            <SearchSelect
              label="Fuel Company"
              options = {fuelCompanies}
            placeholder={isFuelCompaniesLoading ? "Loading Fuel Companies ":"Select fuel company"}
                value={formik.values.fuelCompany}
            onChange={(val) => formik.setFieldValue("fuelCompany", val, true)}
            onBlur={() => formik.setFieldTouched("fuelCompany", true, true)}
            isError={formik.touched.fuelCompany && !!formik.errors.fuelCompany}
            errorMessage={formik.errors.fuelCompany}            />
            
            {isFuelCompaniesLoading && (
              <DropDownLoader/>
            )}



            </div>

            <FormInput
              label="Fuel Litter"
              id="fuelLiters"
              type="text"
              placeholder="Enter fuel litter"
              formik={formik}
            />
          </div>

          <div className="flex items-center gap-4 mt-8 justify-start lg:justify-end">
            <button
              type="button"
              onClick={handleClear} // Formik default reset logic handles this smoothly
              className="flex-1 w-fit sm:flex-none px-2 sm:px-10 py-3.5 text-[14px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
            >
              Clear
            </button>

           <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] disabled:bg-gray-400 text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            {isSubmitting ? "Submitting..." : "Confirm"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
