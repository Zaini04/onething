import { useFormik } from "formik";
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
import DropDownLoader from "../../../hooks/DropDownLoader";
import { addCompanyRecords } from "../../../validations/AddCompanyRecords";

export default function AddCompanyBill() {
  const navigate = useNavigate();

  const location = useLocation();

  const queryClient = useQueryClient();
  const editData = location.state?.companyRecordData;

  const isEditMode = !!editData;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const clientMutation = useMutation({
    mutationFn: async (payload) => {
      setIsSubmitting(true);
       if (isEditMode) {
        return Axios.put(`/company-records/entry/${editData._id}`, payload);
      }

      return Axios.post('/company-records/entry', payload);
    },
    onSuccess: async () => {
      console.log("success")
      await queryClient.invalidateQueries({ queryKey: ["company-bills"] });
        console.log("Invalidated");
      setIsSubmitting(false);
      formik.resetForm();

      toast.success(isEditMode ? "company Record updted successfully":"Company record created successfully!");

      navigate(`/app/reports/company-bills`);
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
      biltyNo:editData?.biltyNo || "",
      client: editData?.client?._id || "",
      site: editData?.site?._id || "",
      vehicle:  editData?.vehicle?._id || "",
      materialType: editData?.materialType || "",
      rate: editData?.rate || "",
      totalSft: editData?.totalSft || "",
      totalRate: editData?.totalRate || "",

    },
    validationSchema: addCompanyRecords,
    onSubmit: (values) => {
      const cleanTotalRate = Number(values.totalRate?.toString().replace(/,/g, "")) || 0;


      console.log("acr",values)

      const payload = {
        ...values,
        totalRate: cleanTotalRate,
      };

      clientMutation.mutate(payload);
    },
  });

  const { values, setFieldValue } = formik;
  const {
    client,
    site,
    vehicle,
    materialType,
    rate,
    totalSft,
  } = values;


  const { data: clientDropdownData, isLoading:isClientLoading} = useClientDropdown();
  const { data: vehicleDropDownData, isLoading:isvehicleLoading } = useVehicleDropdown();
  const { data: siteMaterials, isLoading:isSiteLoading } = useSiteMaterials(client);

  const clientOptions = clientDropdownData?.map((c) => ({ id: c._id, name: `${c.name} (${c.phoneNumber || 'No Phone'})` })) || [];
  const vehicleOptions = vehicleDropDownData?.map((v) => ({ id: v._id, name: v.vehicleNo })) || [];
  const siteOptions = siteMaterials?.map((s) => ({ id: s._id, name: s.siteName })) || [];

  const currentSiteObj = siteMaterials?.find((s) => s._id === site);
  const materialOptions = currentSiteObj?.materialsRates?.map((m) => ({
    id: m.materialType,
    name: m.materialType,
  })) || [];


  const handleClientChange = (clientId) => {
    setFieldValue("client", clientId, true);
    setFieldValue("site", "");
    setFieldValue("materialType", "");
    setFieldValue("rate", "");
  };

  const handleVehicle = (vehicleID) => {
    setFieldValue("vehicle", vehicleID, true);
  };

  const handleSiteChange = (siteId) => {
    setFieldValue("site", siteId, true);
    setFieldValue("materialType", "");
    setFieldValue("rate", "");
  };

  const handleMaterialChange = (materialName) => {
    setFieldValue("materialType", materialName, true);

    const selectedMatConfig = currentSiteObj?.materialsRates?.find(
      (m) => m.materialType === materialName
    );

    if (selectedMatConfig) {
      setFieldValue("rate", selectedMatConfig.rate, true);
    } else {
      setFieldValue("rate", "");
    }
  };

  useEffect(() => {
    const parsedRate = Number(rate?.toString().replace(/,/g, "")) || 0;
    const parsedSft = Number(totalSft?.toString().replace(/,/g, "")) || 0;
    const totalRate = parsedSft * parsedRate || 0;



    setFieldValue("totalRate", totalRate ? totalRate.toLocaleString() : "", false);
  }, [rate, totalSft,  setFieldValue]);



  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  p-4 md:pl-8 bg-[#F9FAFB]  rounded-2xl">
      {/* Header section */}
      <div className="flex justify-between items-center text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">{isEditMode ? "Edit Company Record" : "Add Company Record"}</h2>
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
          <FormInput label="Bilty No" id="biltyNo" placeholder="Enter bilty number here" name="biltyNo" type="text" formik={formik} />

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
            label="Site"
            placeholder={!client ? "Select Client first" : isSiteLoading ? "Loading Sites ":"Select Site"}
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
            <FormInput label="Rate" id="rate" type="text" readOnly={true} placeholder="rate" formik={formik} />
          </div>

          <FormInput label="Total Sft" id="totalSft" type="text" placeholder="please enter amount" formik={formik} />
          <FormInput label="Total Rate" id="totalRate" type="text" placeholder="0" readOnly={true} formik={formik} />

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