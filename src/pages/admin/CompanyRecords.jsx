import SearchFilters from "../../components/global/SearchFilter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchClients, useClientDropdown } from "../../redux/actions/clientAction";
import CompanyRecordsTable from "../../components/admin/companyRecords/CompanyRecordsTable";

function CompanyRecords() {
  const [filters, setFilters] = useState({ name: "", from: "",   to: "",   status: "" });
  
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10); 
  const [apiFilters, setApiFilters] = useState({});
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["clients", page, perPage, apiFilters],
    queryFn: fetchClients,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  });

  const clients = data?.docs || [];
  const totalPages = data?.pages || 1;
  const totalEntries = data?.docsCount || 10

  const {data:clientDropDownData} = useClientDropdown()
         const clientOptions = clientDropDownData?.map((v) => ({ id: v.name, name: v.name })) || [];
  

  const clientVendorConfig = [
    {
      name: "name",
      type: "select",
      searchable: true,
      placeholder: "Name",
      options: clientOptions,
    },
   {
      name: "dateRange", 
      type: "date-range", 
      label: "Select Date Range",
      placeholder: "Choose Range (From - To)",
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
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

  const handleSearchSubmit = () => {
    const payload = {
      name: filters.name,
      from: filters.from,
      to: filters.to,
      status:filters.status
    };
    console.log("Submitting Range Filters to API:", payload);
    setApiFilters(payload);
  };


 

  return (
    <div className="md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-hidden">
      <div className="w-full flex flex-col  animate-in fade-in duration-200">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <h1 className="text-xl font-medium text-black tracking-tight">
              All Clients
            </h1>
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
          {/* Passing down the data and edit props with original css maintained */}
          <CompanyRecordsTable
            clientsData={clients} 
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

export default CompanyRecords;