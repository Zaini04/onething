import {  Upload } from "lucide-react";
import IncomeTaxTable from "../../components/admin/incomeTax/IncomeTaxTable";
import { useState } from "react";
import SearchFilters from "../../components/global/SearchFilter";

function IncomeTax() {

    
          const clientVendorConfig = [
            { 
              name: "Fuel Name", 
              type: "select", 
              placeholder: "Fuel Name", 
              searchable: true,
              options: [
                { label: "Regular", value: "regular" },
                { label: "Premium", value: "premium" },
                { label: "Diesel", value: "diesel" }
              ] 
            },
           
          
             { 
              name: "Fuel Company", 
              type: "select", 
              placeholder: "Company Name", 
              searchable: true,
              options: [
                { label: "Shell", value: "shell" },
                { label: "BP", value: "bp" },
                { label: "Total", value: "total" }
              ] 
            },
            { 
              name: "Fuel Price", 
              type: "select", 
              placeholder: "Per liter Price", 
              searchable: true,
              options: [
                { label: "100", value: "100" },
                { label: "120", value: "120" },
                { label: "150", value: "150" }
              ] 
            },
    
          ];
        
          // 2. Main Local State for filters tracking
          const [filters, setFilters] = useState({ "Fuel Name": "",  "Fuel Company": "", "Fuel Price": ""});
        
          const handleFilterChange = (name, value) => {
            setFilters((prev) => ({ ...prev, [name]: value }));
          };
        
          const handleSearchSubmit = (finalFilters) => {
            console.log("Fetching Entry Vehicles data with fields:", finalFilters);
            // Yahan aap apni API call ya filtering logic execute kar sakte hain
          };

  return (
    // Main container padding and spacing exactly matched with the layout screen
    <div className="w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7]">
      
      {/* --- CONDITION 1: NORMAL VIEW (Jab Form Closed Ho) --- */}
        <div className="w-full flex flex-col  animate-in fade-in duration-200">
          
          {/* Top Header Box (Title + Buttons) */}
          <div className="w-full flex flex-row items-center justify-between gap-4 pb-4">
            <div>
              <h1 className="text-xl font-medium text-black tracking-tight">
                Income/Expense
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-fit sm:w-auto">
              {/* Export Button */}
              <button
                type="button"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm"
              >
                <Upload size={16} className="text-gray-500 stroke-[2]" />
                <span>Export</span>
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
          <div className="w-full">
            <IncomeTaxTable />
          </div>

        </div>

     

    </div>
  );
}

export default IncomeTax;