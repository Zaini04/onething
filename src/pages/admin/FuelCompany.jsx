import { Plus, X } from "lucide-react";
import { useState } from "react";
import AddFuelCompany from "../../components/admin/Fuel/AddFuelComapany";
import SearchFilters from "../../components/global/SearchFilter";
import AllFuelCompanies from "../../components/admin/Fuel/AllFuelCompanies";
import { useNavigate, useLocation } from "react-router-dom";
import ExportButton from "../../components/global/ExportButton";

function FuelCompany() {
  const location = useLocation();
  const navigate = useNavigate();

  const addFuelOpen = location.hash === "#add";

  const handleToggleSidebar = () => {
    if (addFuelOpen) {
      navigate("/app/fuel-company");
    } else {
      navigate("/app/fuel-company#add");
    }
  };
  const clientVendorConfig = [
    {
      name: "Fuel Liter",
      type: "select",
      placeholder: "Fuel Liter",
      searchable: true,
      options: [
        { label: "10 L", value: "10" },
        { label: "20 L", value: "20" },
        { label: "30 L", value: "30" },
      ],
    },

    {
      name: "Fuel Company",
      type: "select",
      placeholder: "Fuel Company",
      searchable: true,
      options: [
        { label: "Shell", value: "shell" },
        { label: "BP", value: "bp" },
        { label: "Total", value: "total" },
      ],
    },
  ];

  const [filters, setFilters] = useState({ "Fuel Liter": "", FuelCompany: "" });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (finalFilters) => {
    console.log("Fetching Entry Vehicles data with fields:", finalFilters);
  };

  return (
    <div className="w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-xl font-medium text-black tracking-tight">
            Fuel Companies
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButton />

          <button
            onClick={handleToggleSidebar}
            type="button"
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm ${
              addFuelOpen
                ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                : "bg-[#1A1C1E] hover:bg-black text-white shadow-gray-200"
            }`}
          >
            {addFuelOpen ? (
              <>
                <X size={16} className="stroke-[2.5]" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Plus size={18} className="stroke-[2.5]" />
                <span>Add Fuel Company</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="w-full mb-6">
        <SearchFilters
          config={clientVendorConfig}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleSearchSubmit}
        />
      </div>

      <div
        className={`w-full flex flex-col-reverse lg:flex-row ${addFuelOpen ? "gap-6" : ""}  items-start`}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            addFuelOpen ? "w-full lg:w-[65%] shrink-0" : "w-full"
          }`}
        >
          <AllFuelCompanies />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            addFuelOpen
              ? "w-full lg:w-[35%] opacity-100 scale-100 visible"
              : "w-0 h-0 opacity-0 scale-95 overflow-hidden invisible"
          }`}
        >
          {addFuelOpen && (
            <div className="w-full ">
              <AddFuelCompany
                onSubmitSuccess={() => navigate("/app/fuel-company")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FuelCompany;
