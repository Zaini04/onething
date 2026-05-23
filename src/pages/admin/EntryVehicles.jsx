import { Plus, Upload } from "lucide-react";
import AllVehiclesAndCustomers from "../../components/admin/vehicles/AllVehiclesAndCustomers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchFilters from "../../components/global/SearchFilter";

function EntryVehicles() {
  const navigate = useNavigate();

  const clientVendorConfig = [
    {
      name: "client",
      type: "select",
      placeholder: "Search Client",
      searchable: true,
      options: [
        { label: "Salman", value: "salman" },
        { label: "Imran Khan", value: "imran" },
        { label: "Saad", value: "saad" },
      ],
    },
    {
      name: "vendor",
      type: "select",
      placeholder: "Search Vendor",
      searchable: true,
      options: [
        { label: "Vendor A", value: "vendor_a" },
        { label: "Vendor B", value: "vendor_b" },
      ],
    },
    {
      name: "date",
      type: "date",
      placeholder: "Date",
      searchable: false,
      options: [
        { label: "Today", value: "today" },
        { label: "Yesterday", value: "yesterday" },
        { label: "This Week", value: "this_week" },
      ],
    },
  ];

  const [filters, setFilters] = useState({ client: "", vendor: "", date: "" });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (finalFilters) => {
    console.log("Fetching Entry Vehicles data with fields:", finalFilters);
  };

  return (
    <div className="w-full max-w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7] overflow-hidden">
      <div className="w-full flex flex-col  animate-in fade-in duration-200">
        {/* Top Header Box */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <h1 className="text-xl font-medium text-black tracking-tight">
              Entry Vehicles
            </h1>
          </div>

          {/* Action Buttons Section */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              <Upload size={16} className="text-gray-500 stroke-[2]" />
              <span>Export</span>
            </button>

            <button
              onClick={() => navigate("/app/entry-vehicles/entry")}
              type="button"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-gray-200"
            >
              <Plus size={18} className="stroke-[2.5]" />
              <span>Entry Vehicle</span>
            </button>
          </div>
        </div>

        {/* Search Filters Component */}
        <div className="w-full">
          <SearchFilters
            config={clientVendorConfig}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSubmit={handleSearchSubmit}
          />
        </div>

        <div className="w-full max-w-full  overflow-hidden">
          <AllVehiclesAndCustomers />
        </div>
      </div>
    </div>
  );
}

export default EntryVehicles;
