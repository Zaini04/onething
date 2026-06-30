import IncomeTaxTable from "../../components/admin/incomeTax/IncomeTaxTable";
import { useState } from "react";
import SearchFilters from "../../components/global/SearchFilter";
import ExportButton from "../../components/global/ExportButton";
import { fetchIncomeExpense } from "../../redux/actions/entryVehicleAction";
import { useVehicleDropdown } from "../../redux/actions/vehicleAction";
import { useQuery } from "@tanstack/react-query";
import IncomeSummaryCards from "../../components/admin/incomeTax/IncomeSummaryCards";

function IncomeTax() {




    const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({});
 const [link]= useState(`/entry-vehicle/income_records`)
    const [selectedRows, setSelectedRows] = useState([]);

   const [filters, setFilters] = useState({
    vehicle: "",
    from: "",
    to: "",  });


  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["income-expense", page, perPage, apiFilters],
    queryFn: fetchIncomeExpense,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  });

const incomeExpenses = data?.docs || [];
  const totalPages = data?.pages || 1;
  const totalEntries = data?.docsCount || 10


     const { data: vehicleDropDownData } = useVehicleDropdown();
   const vehicleOptions = vehicleDropDownData?.map((v) => ({ id: v._id, name: v.vehicleNo })) || [];


 const clientVendorConfig = [
    {
      name: "vehicle",
      type: "select",
      placeholder: "vehicleNo",
      searchable: true,
      options: vehicleOptions
    },

    {
      name: "dateRange", 
      type: "date-range", // 👈 Custom Type
      label: "Select Date Range",
      placeholder: "Choose Range (From - To)",
    },
  ];

  
  const handleFilterChange = (name, value) => {
    if (name === "dateRange") {
      setFilters((prev) => ({ 
        ...prev, 
        from: value.from, 
        to: value.to 
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearchSubmit = (finalFilters) => {
    // API ko submit karte waqt sirf 'vehicle', 'from' aur 'to' bhejen gy
    const payload = {
      vehicle: filters.vehicle,
      from: filters.from,
      to: filters.to
    };
    console.log("Submitting Range Filters to API:", payload);
    setApiFilters(payload);
  };

  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7]">
      <div className="w-full flex flex-col  animate-in fade-in duration-200">
        <div className="w-full flex flex-row items-center justify-between gap-4 pb-4">
          <div>
            <h1 className="text-xl font-medium text-black tracking-tight">
              Income/Expense
            </h1>
          </div>

          <div className="flex items-center gap-3 w-fit sm:w-auto">
          <ExportButton selectedRows={selectedRows} apiFilters={apiFilters} linkRecord={link}/>
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
            <IncomeSummaryCards vehicle={apiFilters.vehicle} from={apiFilters.from} to={apiFilters.to}/>
        </div>

        <div className="w-full">
          <IncomeTaxTable 
          incomeExpenses={incomeExpenses} 
            isLoading={isLoading || isFetching} 
            page={page} 
            perPage={perPage}
            setPage={setPage} 
            setPerPage={setPerPage}
            totalPages={totalPages}
            totalEntries = {totalEntries}
          setSelectedRows={setSelectedRows}
          
          />
        </div>
      </div>
    </div>
  );
}

export default IncomeTax;
