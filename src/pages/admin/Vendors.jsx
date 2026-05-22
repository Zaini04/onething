import { Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchFilters from "../../components/global/SearchFilter";
import { useState } from "react";
import VendorsTable from "../../components/admin/vendors/VendorsTable";

function Vendors() {
  const navigate = useNavigate();
      const clientVendorConfig = [
          { 
            name: "Phone/Name", 
            type: "select", 
            placeholder: "Phone/Name",
            searchable: true, 
            options: [
              { label: "Salman", value: "salman" },
              { label: "Imran Khan", value: "1023" },
              { label: "Saad", value: "saad" }
            ] 
          },
         
          { 
            name: "date", 
            type: "date", 
            placeholder: "Date", 
            options: [
              { label: "Today", value: "today" },
              { label: "Yesterday", value: "yesterday" },
              { label: "This Week", value: "this_week" }
            ] 
          },
           { 
            name: "status", 
            type: "select", 
            placeholder: "Status", 
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" }
            ] 
          },
  
        ];
      
        // 2. Main Local State for filters tracking
        const [filters, setFilters] = useState({ phone: "",  date: "", status: "" });
      
        const handleFilterChange = (name, value) => {
          setFilters((prev) => ({ ...prev, [name]: value }));
        };
      
        const handleSearchSubmit = (finalFilters) => {
          console.log("Fetching Entry Vehicles data with fields:", finalFilters);
          // Yahan aap apni API call ya filtering logic execute kar sakte hain
        };

  return (
    // Main container padding and spacing exactly matched with the layout screen
    <div className="w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7] overflow-hidden">
      
        <div className="w-full flex flex-col  animate-in fade-in duration-200">
          
          {/* Top Header Box (Title + Buttons) */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            <div>
              <h1 className="text-xl font-medium text-black tracking-tight">
                All Vendors
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

              {/* Add Vendor Button */}
              <button
                onClick={() => navigate("/app/vendors/add")}
                type="button"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-gray-200"
              >
                <Plus size={18} className="stroke-[2.5]" />
                <span>Add Vendor</span>
              </button>
            </div>
          </div>

          {/* Filter Box Component */}
          <div className="w-full">
            <SearchFilters 
              config={clientVendorConfig} 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              onSubmit={handleSearchSubmit}
            />
          </div>

          {/* Full Width Table */}
          <div className="w-full ">
            <VendorsTable />
          </div>


        </div>

   

    </div>
  );
}

export default Vendors;