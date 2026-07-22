import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchFilters from "../../components/global/SearchFilter";
import { useState } from "react";
import ExportButton from "../../components/global/ExportButton";
import { useQuery } from "@tanstack/react-query";
import { fetchLabours, useLabourDropdown } from "../../redux/actions/labourAction";
import LabourTable from "../../components/admin/labours/LaboursTable";

function Labours() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ name: "", from: "",   to: "",   status: "Active" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [link]= useState(`/labour/labours_records`)

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({name: "", from: "",   to: "",   status: "Active"});
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["labours", page, perPage, apiFilters],
    queryFn: fetchLabours,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  });

  const laboursData = data?.docs || [];
  const totalPages = data?.pages || 1;
  const totalEntries = data?.docsCount || 10
    const {data:labourDropDownData} = useLabourDropdown()
            const emloyeesOptions = labourDropDownData?.map((v) => ({ id: v._id, name: `${v.name} (${v.phoneNumber || 'No Phone'})` })) || [];
       
      // cont c= clientDropDownData?.map((v) => ({ id: v.name, name: v.name })) || [];

  

  const laboursVendorConfig = [
    {
      name: "name",
      type: "select",
      searchable: true,
      placeholder: "Name",
      options: emloyeesOptions,
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


  const handleEdit = (row)=>{
    console.log("employee /app/employee/edit",row)
    navigate(`/app/labours/edit`, { state: { labourData: row } });
  }

  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-hidden">
      <div className="w-full flex flex-col  animate-in fade-in duration-200">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <h1 className="text-xl font-medium text-black tracking-tight">
              All Labours
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButton selectedRows={selectedRows} apiFilters={apiFilters} linkRecord={link}/>

            <button
              onClick={() => navigate("/app/labours/add")} // Clean page navigation route
              type="button"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-gray-200"
            >
              <Plus size={18} className="stroke-[2.5]" />
              <span>Add Labour</span>
            </button>
          </div>
        </div>

        <div className="w-full">
          <SearchFilters
            config={laboursVendorConfig}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSubmit={handleSearchSubmit}
          />
        </div>

        <div className="w-full ">
          <LabourTable 
            setEditedLabour={handleEdit}
            laboursData={laboursData} 
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

export default Labours;