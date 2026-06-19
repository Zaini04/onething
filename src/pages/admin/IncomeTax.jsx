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
  const [dateFilter,setDateFilter]=useState({
    from:'',
    to:''
  })
   const [filters, setFilters] = useState({
    vehicle: "",
    date: "",
  });


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
      name: "date",
      type: "date",
      placeholder: "Date",
      searchable: false,
      options: [
        
      ],
    },
  ];

  
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (finalFilters) => {
    console.log("Fetching Entry Vehicles data with fields:", finalFilters);
    setApiFilters(finalFilters)


  };

  return (
    <div className="w-full md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7]">
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
            <IncomeSummaryCards/>
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
          
          
          />
        </div>
      </div>
    </div>
  );
}

export default IncomeTax;
