import IncomeTaxTable from "../../components/admin/incomeTax/IncomeTaxTable";
import { useState } from "react";
import SearchFilters from "../../components/global/SearchFilter";
import ExportButton from "../../components/global/ExportButton";

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
    <div className="md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7]">
      <div className="w-full flex flex-col  animate-in fade-in duration-200">
        <div className="w-full flex flex-row items-center justify-between gap-4 pb-4">
          <div>
            <h1 className="text-xl font-medium text-black tracking-tight">
              Income/Expense
            </h1>
          </div>

          <div className="flex items-center gap-3 w-fit sm:w-auto">
            <ExportButton />
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

        <div className="w-full">
          <IncomeTaxTable />
        </div>
      </div>
    </div>
  );
}

export default IncomeTax;
