import { Plus, Upload, X } from "lucide-react";
import AllVehicles from "../../components/admin/vehicles/AllVehicles";
import { useState } from "react";
import AddVehicle from "../../components/admin/vehicles/AddVehicle";
import SearchFilters from "../../components/global/SearchFilter";
import { useLocation, useNavigate } from "react-router-dom";

function Vehicles() {
  const location = useLocation();
  const navigate = useNavigate();

  const addVehicleOpen = location.hash === "#add";

  const handleToggleSidebar = () => {
    if (addVehicleOpen) {
      navigate("/app/vehicles");
    } else {
      navigate("/app/vehicles#add");
    }
  };

  const vehicleConfig = [
    { name: "number", type: "select", searchable: true, placeholder: "Number" }, // Normal text box
    {
      name: "ownerName",
      type: "select",
      searchable: true,
      placeholder: "Owner Name",
      options: ["Yoichi", "isagi"],
    },
    {
      name: "status",
      type: "select",
      searchable: false,
      placeholder: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "InActive", value: "inactive" },
      ],
    },
  ];

  const [filters, setFilters] = useState({
    number: "",
    ownerName: "",
    status: "",
  });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (finalFilters) => {
    console.log("Fetching Vehicles data with:", finalFilters);
  };

  return (
    <div className="w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-xl font-medium text-black tracking-tight">
            All Vehicles
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Export Button */}
          <button
            type="button"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm"
          >
            <Upload size={16} className="text-gray-500 stroke-[2]" />
            <span>Export</span>
          </button>

          {/* DYNAMIC BUTTON: Switches between Add Vehicle and Cancel */}
          <button
            onClick={handleToggleSidebar}
            type="button"
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm ${
              addVehicleOpen
                ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                : "bg-[#1A1C1E] hover:bg-black text-white shadow-gray-200"
            }`}
          >
            {addVehicleOpen ? (
              <>
                <X size={16} className="stroke-[2.5]" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Plus size={18} className="stroke-[2.5]" />
                <span>Add Vehicle</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="w-full mb-6">
        <SearchFilters
          config={vehicleConfig}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* --- DYNAMIC SPLIT LAYOUT --- */}
      <div
        className={`w-full flex flex-col-reverse lg:flex-row  ${addVehicleOpen ? "gap-6" : ""} items-start`}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            addVehicleOpen ? "w-full lg:w-[65%] shrink-0" : "w-full"
          }`}
        >
          <AllVehicles />
        </div>

        {/* RIGHT SIDE: Add Vehicle Form Container */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            addVehicleOpen
              ? "w-full lg:w-[35%] opacity-100 scale-100 visible"
              : "w-0 h-0 opacity-0 scale-95 overflow-hidden invisible"
          }`}
        >
          {addVehicleOpen && (
            <div className="w-full ">
              <AddVehicle onSubmitSuccess={() => navigate("/app/vehicles")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vehicles;
