import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchFilters from "../../components/global/SearchFilter";
import { useState } from "react";
import ClientsTable from "../../components/admin/clients/ClientsTable";
import ExportButton from "../../components/global/ExportButton";
function Clients() {
  const navigate = useNavigate();
  const clientVendorConfig = [
    {
      name: "Phone/Name",
      type: "select",
      searchable: true,
      placeholder: "Phone/Name",
      options: [
        { label: "Salman", value: "salman" },
        { label: "Imran Khan", value: "1023" },
        { label: "Saad", value: "saad" },
      ],
    },

    {
      name: "date",
      type: "date",
      placeholder: "Date",
      options: [
        { label: "Today", value: "today" },
        { label: "Yesterday", value: "yesterday" },
        { label: "This Week", value: "this_week" },
      ],
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];

  const [filters, setFilters] = useState({ phone: "", date: "", status: "" });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (finalFilters) => {
    console.log("Fetching Entry Vehicles data with fields:", finalFilters);
  };

  return (
    <div className="w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7] overflow-hidden">
      <div className="w-full flex flex-col  animate-in fade-in duration-200">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <h1 className="text-xl font-medium text-black tracking-tight">
              All Clients
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <ExportButton />

            <button
              onClick={() => navigate("/app/clients/add")} // Navigate to the add client form route
              type="button"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-gray-200"
            >
              <Plus size={18} className="stroke-[2.5]" />
              <span>Add Client</span>
            </button>
          </div>
        </div>

        <div className="w-full">
          <SearchFilters
            config={clientVendorConfig}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSubmit={handleSearchSubmit}
          />
        </div>

        <div className="w-full ">
          <ClientsTable />
        </div>
      </div>
    </div>
  );
}

export default Clients;
