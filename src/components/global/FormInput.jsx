import { FiChevronDown, FiX } from "react-icons/fi";

const FormInput = ({
  label,
  id,
  type = "text",
  placeholder,
  options = [],
  defaultOption,
  formik,
  value,
  onChange,
  onBlur,
  readOnly = false,
  isCustomError,
  materialsList = [],
  onRemoveMaterial,
  rows = 3,
}) => {
  const isError =
    isCustomError || (formik ? formik.touched[id] && formik.errors[id] : false);
  const errorMessage = formik?.errors[id];

  const currentVal =
    value !== undefined ? value : formik ? formik.values[id] : "";
  const hasValue = !!currentVal && currentVal !== "";

  const formikProps = formik ? formik.getFieldProps(id) : {};

  return (
    <div className="relative w-full group flex flex-col gap-1.5">
      <div className="relative w-full">
        <label
          htmlFor={id}
          className={`absolute -top-2.5 left-3   px-1 text-[11px] font-medium text-gray-400 ${readOnly ? " bg-transparent":'bg-white '} z-10 transition-colors group-focus-within:text-black`}
        >
          {label}
        </label>

        {type === "select" ? (
          <div className="relative">
            <select
  id={id}
  {...formikProps}
  value={value !== undefined ? value : formikProps.value}
  onChange={onChange || formikProps.onChange}
  onBlur={onBlur || formikProps.onBlur}

              className={`w-full px-4 py-2.5 border rounded-xl text-xs font-normal appearance-none bg-white focus:outline-none transition-all ${
                isError
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-black"
              } ${hasValue ? "text-black" : "text-gray-400"}`}
            >
              {defaultOption && (
                <option value="" className="text-gray-400">
                  {defaultOption}
                </option>
              )}
              {options.map((opt) => {
                const isObject = typeof opt === "object" && opt !== null;
                const optionValue = isObject ? opt.value : opt;
                const optionLabel = isObject ? opt.label : opt;

                const isAlreadyAdded = materialsList.some(
                  (item) => (item.name || item.materialType) === optionValue,
                );

                return (
                  <option
                    key={optionValue}
                    value={optionValue}
                    className={`text-black ${isAlreadyAdded ? "bg-gray-100 text-gray-400 font-light" : ""}`}
                    disabled={isAlreadyAdded}
                  >
                    {isAlreadyAdded ? `${optionLabel} (Selected)` : optionLabel}
                  </option>
                );
              })}
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-base" />
          </div>
        ) : type === "textarea" ? (
          <textarea
            id={id}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={readOnly}
            readOnly={readOnly}
            {...(formik && !onChange ? formik.getFieldProps(id) : {})}
            className={`w-full px-4 py-2.5 border rounded-xl text-xs font-normal text-black placeholder:text-gray-400 focus:outline-none transition-all resize-none ${
              readOnly ? "bg-gray-100/50 cursor-not-allowed select-none" : ""
            } ${isError ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-black"}`}
          />
        ) : (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={readOnly}
            {...(formik && !onChange ? formik.getFieldProps(id) : {})}
            className={`w-full px-4 py-2.5 border rounded-xl text-xs font-normal text-black placeholder:text-gray-400 focus:outline-none transition-all ${
              readOnly ? "bg-gray-100/50 cursor-not-allowed select-none" : ""
            } ${isError ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-black"}`}
          />
        )}
      </div>

      {type === "select" && materialsList.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-1 mt-0.5">
          {materialsList.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 bg-gray-100 border border-gray-200/60 text-gray-800 text-[11px] font-medium pl-1.5 pr-1 py-1 rounded-lg transition-all"
            >
              <span>{item.name || item.menu || item.materialType}</span>
              {onRemoveMaterial && (
                <button
                  type="button"
                  onClick={() => onRemoveMaterial(index)}
                  className="p-0.5 hover:bg-gray-200 rounded-md text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {isError && errorMessage && (
        <p className="text-[11px] text-red-500 mt-0.5 ml-1 block">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;
