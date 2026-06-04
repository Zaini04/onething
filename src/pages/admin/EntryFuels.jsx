import { Plus, X } from "lucide-react";
import { useState } from "react";
import EntryFuel from "../../components/admin/Fuel/EntryFuel";
import SearchFilters from "../../components/global/SearchFilter";
import EntryFuelTable from "../../components/admin/Fuel/EntryfuelTable";
import { useLocation, useNavigate } from "react-router-dom";
import ExportButton from "../../components/global/ExportButton";

function EntryFuels() {
  const location = useLocation();
  const navigate = useNavigate();

  const addFuelOpen = location.hash === "#entry";

  const handleToggleSidebar = () => {
    if (addFuelOpen) {
      navigate("/app/entry-fuel");
    } else {
      navigate("/app/entry-fuel#entry");
    }
  };
  const clientVendorConfig = [
    {
      name: "Fuel Name",
      type: "select",
      placeholder: "Fuel Name",
      searchable: true,
      options: [
        { label: "Regular", value: "regular" },
        { label: "Premium", value: "premium" },
        { label: "Diesel", value: "diesel" },
      ],
    },

    {
      name: "Fuel Company",
      type: "select",
      placeholder: "Company Name",
      searchable: true,
      options: [
        { label: "Shell", value: "shell" },
        { label: "BP", value: "bp" },
        { label: "Total", value: "total" },
      ],
    },
    {
      name: "Fuel Price",
      type: "select",
      placeholder: "Per liter Price",
      searchable: true,
      options: [
        { label: "100", value: "100" },
        { label: "120", value: "120" },
        { label: "150", value: "150" },
      ],
    },
  ];

  const [filters, setFilters] = useState({
    "Fuel Name": "",
    "Fuel Company": "",
    "Fuel Price": "",
  });

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
            Entry Fuel
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
                <span>Entry Fuel</span>
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
          <EntryFuelTable />
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
              <EntryFuel onSubmitSuccess={() => navigate("/app/entry-fuel")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EntryFuels;
