import { useFormik } from "formik";
import { entryVehicleValidation } from "../../../validations/EntryVehicleValidation";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import SearchSelect from "../../global/SearchSelect";
import FormInput from "../../global/FormInput";
import { useEffect, useState } from "react";
import { useClientDropdown } from "../../../redux/actions/clientAction";
import { useVehicleDropdown } from "../../../redux/actions/vehicleAction";
import { useSiteMaterials } from "../../../redux/actions/siteAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "../../../configs/api";
import { toast } from "react-toastify";
import { toastError } from "../../../hooks/toastError";
import { useFuelStockCompaniesListsDropdown } from "../../../redux/actions/fuelAction";
import DropDownLoader from "../../../hooks/DropDownLoader";

export default function EntryVehicle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  
  const editData = location.state?.entryVehicleData; 
  const isEditMode = !!editData; 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clientMutation = useMutation({
    mutationFn: async (payload) => {
      setIsSubmitting(true);
      if (isEditMode) {
        return Axios.put(`/entry-vehicle/entry/${editData._id}`, payload);
      }
      return Axios.post('/entry-vehicle/entry', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entry-vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["client-ledger"] });
      queryClient.invalidateQueries({ queryKey: ["vehicle-ledger"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["today-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["sales-chart"] });

      queryClient.invalidateQueries({ queryKey: ["fuelCompaniesStockLists"] });
      queryClient.invalidateQueries({ queryKey: ["fuelCompaniesLists"] });
      queryClient.invalidateQueries({ queryKey: ["fuel-stocks"] });

      setIsSubmitting(false);
      formik.resetForm();
      toast.success(isEditMode ? "EntryVehicle updated successfully!" : "EntryVehicle created successfully!");
      navigate("/app/entry-vehicles");
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
      setIsSubmitting(false);
      toastError(err);
    }
  });

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      date: editData?.date || new Date().toISOString().split('T')[0] ,
     client: editData?.client?._id || editData?.client || "", 
      site: editData?.site?._id || editData?.site || "", 
      vehicle: editData?.vehicle?._id || editData?.vehicle || "",
      materialType:  editData?.materialType || "",
      rateType: editData?.rateType || "",
      rate:  editData?.rate || "",
      totalSftVehicles: editData?.totalSftVehicles || "",
      totalRate: editData?.totalRate || "",
      materialCost: editData?.materialCost || "",
      dieselCost: editData?.dieselCost || "", 
      fuelCompany:editData?.fuelCompany?._id ||editData?.fuelCompany || "",
      isStockManaged: editData?.isStockManaged || false,   
      dieselInLitters:editData?.dieselInLitters || "",
      vendor: editData?.vendor || "",
      fuel: editData?.fuel || "",
      driverExpense: editData?.driverExpense || "",
      loading: editData?.loading || "",
      otherExpenses: editData?.otherExpenses || "",
      remainingAmount: editData?.remainingAmount || "",
    },
    validationSchema: entryVehicleValidation,
    onSubmit: (values) => {
      const cleanTotalRate = Number(values.totalRate?.toString().replace(/,/g, "")) || 0;
      const cleanRemainingAmount = Number(values.remainingAmount?.toString().replace(/,/g, "")) || 0;

      // Realtime flag map directly dynamically from safe computation
      const selectedCompany = fuelCompaniesData?.find(c => c._id === values.fuelCompany);
      const dynamicStockManaged = selectedCompany?.hasStock === true;

      const payload = {
        ...values,
        totalRate: cleanTotalRate,
        remainingAmount: cleanRemainingAmount,
        isStockManaged: dynamicStockManaged,
      };
      console.log(values)

      clientMutation.mutate(payload);
    },
  });


  const handleClear = () => {
    formik.resetForm();
    if (isEditMode) {
      navigate("/app/entry-vehicles");
    }
  };

  const { values, setFieldValue } = formik;
  const {
    client,
    site,
    vehicle,
    materialType,
    rateType,
    rate,
    totalSftVehicles,
    driverExpense,
    dieselCost,
    loading,
    materialCost,
    otherExpenses,
  } = values;


  // ----------------------------------------------------
  // Data Fetching via Hooks
  // ----------------------------------------------------
  const { data: clientDropdownData, isLoading:isClientLoading} = useClientDropdown();
  const { data: vehicleDropDownData, isLoading:isvehicleLoading } = useVehicleDropdown();
  const { data: siteMaterials, isLoading:isSiteLoading } = useSiteMaterials(client);
  // Destructured isLoading to manage spinner state safely ──🔥
  const { data: fuelCompaniesData, isLoading: isFuelLoading } = useFuelStockCompaniesListsDropdown();

  const clientOptions = clientDropdownData?.map((c) => ({ id: c._id, name: c.name })) || [];
  const vehicleOptions = vehicleDropDownData?.map((v) => ({ id: v._id, name: v.vehicleNo })) || [];
  const siteOptions = siteMaterials?.map((s) => ({ id: s._id, name: s.siteName })) || [];

  const currentSiteObj = siteMaterials?.find((s) => s._id === site);
  const materialOptions = currentSiteObj?.materialsRates?.map((m) => ({
    id: m.materialType,
    name: m.materialType,
  })) || [];

  // ----------------------------------------------------
  // Cascading Selection State Management
  // ----------------------------------------------------
  const handleClientChange = (clientId) => {
    setFieldValue("client", clientId, true);
    setFieldValue("site", "");
    setFieldValue("materialType", "");
    setFieldValue("rateType", "");
    setFieldValue("rate", "");
  };

  const handleVehicle = (vehicleID) => {
    setFieldValue("vehicle", vehicleID, true);
  };

  const handleSiteChange = (siteId) => {
    setFieldValue("site", siteId, true);
    setFieldValue("materialType", "");
    setFieldValue("rateType", "");
    setFieldValue("rate", "");
  };

  const handleMaterialChange = (materialName) => {
    setFieldValue("materialType", materialName, true);
    
    const selectedMatConfig = currentSiteObj?.materialsRates?.find(
      (m) => m.materialType === materialName
    );

    if (selectedMatConfig) {
      setFieldValue("rateType", selectedMatConfig.rateType, true);
      setFieldValue("rate", selectedMatConfig.rate, true);
    } else {
      setFieldValue("rateType", "");
      setFieldValue("rate", "");
    }
  };

 
  useEffect(() => {
    const parsedRate = Number(rate?.toString().replace(/,/g, "")) || 0;
    const parsedSft = Number(totalSftVehicles?.toString().replace(/,/g, "")) || 0;
    const totalRate = parsedSft * parsedRate || 0;

    const parsedDriver = Number(driverExpense?.toString().replace(/,/g, "")) || 0;
    const parsedDiesal = Number(dieselCost?.toString().replace(/,/g, "")) || 0;
    const parsedLoading = Number(loading?.toString().replace(/,/g, "")) || 0;
    const parsedMaterial = Number(materialCost?.toString().replace(/,/g, "")) || 0;
    const parsedOther = Number(otherExpenses?.toString().replace(/,/g, "")) || 0;

    const remainingAmount = totalRate - (parsedDriver + parsedDiesal + parsedLoading + parsedMaterial + parsedOther);

    setFieldValue("totalRate", totalRate ? totalRate.toLocaleString() : "", false);
    setFieldValue("remainingAmount", remainingAmount ? remainingAmount.toLocaleString() : "0", false);
  }, [rate, totalSftVehicles, driverExpense, dieselCost, loading, materialCost, otherExpenses, setFieldValue]);

  const activeClientLabel = clientDropdownData?.find((c) => c._id === client)?.name || "---";
  const activeVehicleLabel = vehicleDropDownData?.find((v) => v._id === vehicle)?.vehicleNo || "---";
  const activeSiteLabel = siteMaterials?.find((s) => s._id === site)?.siteName || "---";

  const fuelCompanyOptions = fuelCompaniesData?.map((c) => ({
    id: c._id,
    name: c.hasStock ? `${c.fuelCompany} (${c.availableStock}L)` : c.fuelCompany,
    disabled: c.hasStock && c.availableStock <= 0,
  })) || [];

  // console.log("fco",fuelCompanyOptions)
  // Recalculates dynamically every render loop securely
  const selectedFuelCompany = fuelCompaniesData?.find(c => c._id === values.fuelCompany);
  const isStockManaged = selectedFuelCompany?.hasStock === true;

  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  p-4 md:pl-8 bg-[#F9FAFB]  rounded-2xl">
      {/* Header section */}
      <div className="flex justify-between items-center text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">{isEditMode ? "Edit Vehicle Entry" : "Entry Vehicle"}</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaArrowLeft className="cursor-pointer bg-white p-2 rounded-xl w-12 h-9 border border-gray-100 shadow-sm" size={20} />
        </button>
      </div>

      {/* Main Entry Input Form */}
      <form onSubmit={formik.handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
          <FormInput label="Date" id="date" name="date" type="date" formik={formik} />
          <div className="relative flex flex-col w-full">

          <SearchSelect
            label="Vehicle"
            placeholder={isvehicleLoading ? "Loading Vehicles ":"Select Vehicle No"}
            options={vehicleOptions}
            value={vehicle}
            onChange={handleVehicle}
            onBlur={() => formik.setFieldTouched("vehicle", true)}
            isError={formik.touched.vehicle && !!formik.errors.vehicle}
            errorMessage={formik.errors.vehicle}
          />

          {isvehicleLoading && (
              <DropDownLoader/>
            )}

          </div>
       <div className="relative flex flex-col w-full">

          <SearchSelect
            label="Client"
            placeholder={isClientLoading ? "Loading Clients ":"Select Client"}
            options={clientOptions}
            value={client}
            onChange={handleClientChange}
            onBlur={() => formik.setFieldTouched("client", true)}
            isError={formik.touched.client && !!formik.errors.client}
            errorMessage={formik.errors.client}
          />

           {isClientLoading && (
              <DropDownLoader/>
            )}

          </div>

          
       <div className="relative flex flex-col w-full">

          <SearchSelect
            label="Site"
            placeholder={isSiteLoading ? "Loading Sites ":"Select Site"}
            options={siteOptions}
            value={site}
            onChange={handleSiteChange}
            onBlur={() => formik.setFieldTouched("site", true)}
            isError={formik.touched.site && !!formik.errors.site}
            errorMessage={formik.errors.site}
          />
{isSiteLoading && (
              <DropDownLoader/>
            )}
          </div>

          <SearchSelect
            label="Material Type"
            placeholder="Select Material"
            options={materialOptions}
            value={materialType}
            onChange={handleMaterialChange}
            onBlur={() => formik.setFieldTouched("materialType", true)}
            isError={formik.touched.materialType && !!formik.errors.materialType}
            errorMessage={formik.errors.materialType}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
            <FormInput label="Rate Type" id="rateType" type="text" readOnly={true} placeholder="rate type" formik={formik} />
            <FormInput label="Rate" id="rate" type="text" readOnly={true} placeholder="rate" formik={formik} />
          </div>

          <FormInput label="Total Sft/Vehicles" id="totalSftVehicles" type="text" placeholder="please enter amount" formik={formik} />
          <FormInput label="Total Rate" id="totalRate" type="text" placeholder="0" readOnly={true} formik={formik} />
          <FormInput label="Material Cost" id="materialCost" type="text" placeholder="please enter amount" formik={formik} />
          
          {/* Fuel Company Dropdown Container with Rounded Spinner Loader ──🔥 */}
          <div className="relative flex flex-col w-full">
            <SearchSelect
              label="Fuel Company"
              placeholder={isFuelLoading ? "Loading Companies..." : "Select Fuel Company"}
              options={fuelCompanyOptions}
              searchable={false}
              value={values.fuelCompany}
              onChange={(val) => {
                formik.setFieldValue("fuelCompany", val, true);
                formik.setFieldValue("dieselInLitters", "");
              }}
              onBlur={() => formik.setFieldTouched("fuelCompany", true)}
              isError={formik.touched.fuelCompany && !!formik.errors.fuelCompany}
              errorMessage={formik.errors.fuelCompany}
            />
            
            {/* Smooth CSS Rounded Spinner Loader */}
            {isFuelLoading && (
              <div className="absolute right-10 top-[15px] flex items-center justify-center pointer-events-none">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-black"></div>
              </div>
            )}
            
            {/* Live Hint Calculation for Managed Stocks */}
            {isStockManaged && values.fuelCompany && (
              <p className="text-[11px] mt-1 ml-1 text-emerald-600 font-medium animate-fadeIn">
                Available: {selectedFuelCompany?.availableStock}L
              </p>
            )}
          </div>

          <FormInput label="Diesel Liters" id="dieselInLitters" type="text" placeholder="please enter diesel liters" formik={formik} />
          <FormInput label="Diesel Cost" id="dieselCost" type="text" placeholder="please enter amount" formik={formik} />
          <FormInput label="Driver Expense" id="driverExpense" placeholder="please enter amount" formik={formik} />
          <FormInput label="Loading + Labor Cost" id="loading" placeholder="please enter amount" formik={formik} />
          <FormInput label="Other Expenses" id="otherExpenses" placeholder="please enter amount" formik={formik} />
          <FormInput label="Vendor (optional)" id="vendor" type="text" placeholder="----" formik={formik} />
          <FormInput label="Fuel (optional)" id="fuel" type="text" placeholder="----" formik={formik} />
          <FormInput label="Remaining Amount" id="remainingAmount" placeholder="0" readOnly={true} formik={formik} />
        </div>

        {/* Action Controls Row */}
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
              className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
              disabled={isSubmitting}
            >
              {isSubmitting ? isEditMode ? "Updating": "Saving..." : isEditMode ? "Update" : "Confirm"}
            </button>
          </div>
        </div>
      </form>

      {/* Live Preview Summary Element */}
      <div className="w-full mt-8 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
        <div className="flex flex-row items-center justify-between w-full px-6 py-4 border-b border-gray-100 bg-gray-50/30">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Entry Details</h3>
          </div>
          <div className="text-right flex flex-col items-end">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Date Created</span>
            <span className="text-xs font-semibold text-gray-800 bg-white border border-gray-100 px-3 py-1 rounded-full mt-0.5 shadow-sm">
              {formik.values.date ? new Date(formik.values.date).toLocaleDateString("en-GB") : "---"}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-5 text-xs">
            <div>
              <p className="text-gray-400 font-medium">Client Name</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">{activeClientLabel}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Vehicle Info</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">{activeVehicleLabel}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Site Location</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">{activeSiteLabel}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Material</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">{materialType || "---"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Rate Type</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">{rateType || "---"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Rate</p>
              <p className="font-semibold text-gray-800 mt-1">{rate ? `Rs. ${rate}` : "---"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Total Sft/Vehicles</p>
              <p className="font-semibold text-gray-800 mt-1">{totalSftVehicles || "---"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Material Cost</p>
              <p className="font-semibold text-gray-800 mt-1">{materialCost ? `Rs. ${materialCost}` : "Rs. 0"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Fuel Company</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">
                {selectedFuelCompany?.fuelCompany || "---"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 font-medium">Diesel Liters</p>
              <p className="font-semibold text-gray-800 mt-1">
                {values.dieselInLitters ? `${values.dieselInLitters}L` : "---"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Diesel</p>
              <p className="font-semibold text-gray-800 mt-1">{dieselCost ? `Rs. ${dieselCost}` : "Rs. 0"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Driver Expense</p>
              <p className="font-semibold text-gray-800 mt-1">{driverExpense ? `Rs. ${driverExpense}` : "Rs. 0"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Loading</p>
              <p className="font-semibold text-gray-800 mt-1">{loading ? `Rs. ${loading}` : "Rs. 0"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Other Expenses</p>
              <p className="font-semibold text-gray-800 mt-1">{otherExpenses ? `Rs. ${otherExpenses}` : "Rs. 0"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Vendor</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">{values.vendor || "---"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Fuel</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">{values.fuel || "---"}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Payment Status</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                Pending
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-3 sm:gap-y-0 bg-gray-50/30 -mx-6 -mb-6 p-6">
            <div>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Total Rate</p>
              <p className="text-lg font-semibold text-gray-900 mt-0.5">{values.totalRate ? `Rs. ${values.totalRate}` : "Rs. 0"}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Remaining Amount</p>
              <p className="text-xl font-semibold text-emerald-600 tracking-tight mt-0.5">
                {values.remainingAmount ? `Rs. ${values.remainingAmount}` : "Rs. 0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}