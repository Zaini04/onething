import { useFormik } from "formik";
import { entryVehicleValidation } from "../../../validations/EntryVehicleValidation";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchSelect from "../../global/SearchSelect";
import FormInput from "../../global/FormInput";
import { TbRulerMeasure2 } from "react-icons/tb";
import { useEffect } from "react";

export default function EntryVehicle() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      date: "",
      client: "",
      site: "",
      vehicle: "",
      material: "",
      rateType: "",
      rate: "",
      totalSftVehicles: "",
      totalRate: "",
      materialCost: "",
      diesal: "",
      vendor: "",
      fuel: "",
      driverExpense: "",
      loading: "",
      otherExpenses: "",
      remainingAmount: "",
      paymentReceived: false,
    },
    validationSchema: entryVehicleValidation,
    onSubmit: (values, { resetForm }) => {
      console.log("Form Submitted Data:", values);

      resetForm();
    },
  });

  const { values, setFieldValue } = formik;
  const {
    rate,
    totalSftVehicles,
    driverExpense,
    diesal,
    loading,
    materialCost,
    otherExpenses,
  } = values;

  useEffect(() => {
    const parsedRate = Number(rate?.toString().replace(/,/g, "")) || 0;
    const parsedSft =
      Number(totalSftVehicles?.toString().replace(/,/g, "")) || 0;

    const totalRate = parsedSft * parsedRate || 0;

    const parsedDriver =
      Number(driverExpense?.toString().replace(/,/g, "")) || 0;
    const parsedDiesal = Number(diesal?.toString().replace(/,/g, "")) || 0;
    const parsedLoading = Number(loading?.toString().replace(/,/g, "")) || 0;
    const parsedMaterial =
      Number(materialCost?.toString().replace(/,/g, "")) || 0;
    const parsedOther =
      Number(otherExpenses?.toString().replace(/,/g, "")) || 0;

    const remainingAmount =
      totalRate -
      (parsedDriver +
        parsedDiesal +
        parsedLoading +
        parsedMaterial +
        parsedOther);

    setFieldValue(
      "totalRate",
      totalRate ? totalRate.toLocaleString() : "",
      false,
    );
    setFieldValue(
      "remainingAmount",
      remainingAmount ? remainingAmount.toLocaleString() : "0",
      false,
    );
  }, [
    rate,
    totalSftVehicles,
    driverExpense,
    diesal,
    loading,
    materialCost,
    otherExpenses,
    setFieldValue,
  ]);

  return (
    <div className="w-full mx-auto bg-[#F9FAFB] p-4 md:p-6 rounded-2xl">
      <div className="flex justify-between items-center text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">Entry Vehicle</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaArrowLeft
            className="cursor-pointer bg-white p-2 rounded-xl w-12 h-9 border border-gray-100 shadow-sm"
            size={20}
          />
        </button>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
          <FormInput
            label="Date"
            id="date"
            name="date"
            type="date"
            formik={formik}
          ></FormInput>

          <SearchSelect
            label="Vehicle"
            placeholder="Select Vehicle"
            options={["Standard Dump Truck", "Mini Dump Trucks"]}
            value={formik.values.vehicle}
            onChange={(val) => formik.setFieldValue("vehicle", val, true)}
            onBlur={() => formik.setFieldTouched("vehicle", true)}
            isError={formik.touched.vehicle && !!formik.errors.vehicle}
            errorMessage={formik.errors.vehicle}
          />

          <SearchSelect
            label="Client"
            placeholder="Select Client"
            options={["Salman", "Imran Khan", "Saad"]}
            value={formik.values.client}
            onChange={(val) => formik.setFieldValue("client", val, true)}
            onBlur={() => formik.setFieldTouched("client", true, true)}
            isError={formik.touched.client && !!formik.errors.client}
            errorMessage={formik.errors.client}
          />

          <SearchSelect
            label="site"
            placeholder="Select Site"
            options={["Multan", "Lahore", "Karachi", "Islamabad"]}
            value={formik.values.site}
            onChange={(val) =>
              formik.setFieldValue("site", val, TbRulerMeasure2)
            }
            onBlur={() => formik.setFieldTouched("site", true)}
            isError={formik.touched.site && !!formik.errors.site}
            errorMessage={formik.errors.site}
          />

          <FormInput
            label="Material"
            id="material"
            type="select"
            defaultOption="Select Material"
            options={["Concrete", "Sand"]}
            formik={formik}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
            <FormInput
              label="Rate Type"
              id="rateType"
              type="select"
              formik={formik}
              defaultOption="Select Rate Type"
              options={["per sqft", "per vehicle"]}
            />

            <FormInput
              label="Rate "
              id="rate"
              type="text"
              placeholder="please enter rate"
              formik={formik}
            />
          </div>

          <FormInput
            label="Total Sft/Vehicles"
            id="totalSftVehicles"
            type="text"
            placeholder="please enter amount"
            formik={formik}
          />

          <FormInput
            label="Total Rate"
            id="totalRate"
            type="text"
            placeholder="0"
            readOnly={true}
            formik={formik}
          />

          <FormInput
            label="Material Cost"
            id="materialCost"
            type="text"
            placeholder="please enter amount"
            formik={formik}
          />

          <FormInput
            label="Diesal"
            id="diesal"
            type="text"
            placeholder="please enter amount"
            formik={formik}
          />

          <FormInput
            label="Driver Expense"
            id="driverExpense"
            placeholder="please enter amount"
            formik={formik}
          />

          <FormInput
            label="Loading"
            id="loading"
            placeholder="please enter amount"
            formik={formik}
          />

          <FormInput
            label="Other Expenses"
            id="otherExpenses"
            placeholder="please enter amount"
            formik={formik}
          />

          <FormInput
            label="Vendor (optional)"
            id="vendor"
            type="text"
            placeholder="----"
            formik={formik}
          />

          <FormInput
            label="Fuel (optional)"
            id="fuel"
            type="text"
            placeholder="----"
            formik={formik}
          />

          <FormInput
            label="Remaining Amount"
            id="remainingAmount"
            placeholder="0"
            readOnly={true}
            formik={formik}
          />
        </div>

        <div className="flex items-center justify-between gap-4 mt-8 pt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="paymentReceived"
              name="paymentReceived"
              checked={formik.values.paymentReceived}
              onChange={formik.handleChange}
              className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
            />

            <p className="text-xs text-gray-400">payment already received</p>
          </div>
          <button
            type="button"
            onClick={formik.handleReset}
            className="px-5 sm:px-8 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            Clear
          </button>

          <button
            type="submit"
            className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            Confirm
          </button>
        </div>
      </form>

      <div className="w-full mt-8 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
        <div className="flex flex-row items-center justify-between w-full px-6 py-4 border-b border-gray-100 bg-gray-50/30">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
              Entry Details
            </h3>
          </div>
          <div className="text-right flex flex-col items-end">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Date Created
            </span>
            <span className="text-xs font-semibold text-gray-800 bg-white border border-gray-100 px-3 py-1 rounded-full mt-0.5 shadow-sm">
              {formik.values.date
                ? new Date(formik.values.date).toLocaleDateString("en-GB")
                : "---"}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-5 text-xs">
            <div>
              <p className="text-gray-400 font-medium">Client Name</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">
                {formik.values.client || "---"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Vehicle Info</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">
                {formik.values.vehicle || "---"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Site Location</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">
                {formik.values.site || "---"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Material</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">
                {formik.values.material || "---"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Rate Type</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">
                {formik.values.rateType || "---"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 font-medium">Rate</p>
              <p className="font-semibold text-gray-800 mt-1">
                {formik.values.rate ? `Rs. ${formik.values.rate}` : "---"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Total Sft/Vehicles</p>
              <p className="font-semibold text-gray-800 mt-1">
                {formik.values.totalSftVehicles || "---"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Material Cost</p>
              <p className="font-semibold text-gray-800 mt-1">
                {formik.values.materialCost
                  ? `Rs. ${formik.values.materialCost}`
                  : "Rs. 0"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Diesal</p>
              <p className="font-semibold text-gray-800 mt-1">
                {formik.values.diesal ? `Rs. ${formik.values.diesal}` : "Rs. 0"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Driver Expense</p>
              <p className="font-semibold text-gray-800 mt-1">
                {formik.values.driverExpense
                  ? `Rs. ${formik.values.driverExpense}`
                  : "Rs. 0"}
              </p>
            </div>

            <div>
              <p className="text-gray-400 font-medium">Loading</p>
              <p className="font-semibold text-gray-800 mt-1">
                {formik.values.loading
                  ? `Rs. ${formik.values.loading}`
                  : "Rs. 0"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Other Expenses</p>
              <p className="font-semibold text-gray-800 mt-1">
                {formik.values.otherExpenses
                  ? `Rs. ${formik.values.otherExpenses}`
                  : "Rs. 0"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Vendor</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">
                {formik.values.vendor || "---"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Fuel</p>
              <p className="font-semibold text-gray-800 mt-1 wrap-break-word">
                {formik.values.fuel || "---"}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-3 sm:gap-y-0 bg-gray-50/30 -mx-6 -mb-6 p-6">
            <div>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                Total Rate
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-0.5">
                {formik.values.totalRate
                  ? `Rs. ${formik.values.totalRate}`
                  : "Rs. 0"}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                Remaining Amount
              </p>
              <p className="text-xl font-semibold text-emerald-600 tracking-tight mt-0.5">
                {formik.values.remainingAmount
                  ? `Rs. ${formik.values.remainingAmount}`
                  : "Rs. 0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
