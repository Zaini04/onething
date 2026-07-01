import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchFilters from "../../components/global/SearchFilter";
import { useState } from "react";
import ClientsTable from "../../components/admin/clients/ClientsTable";
import ExportButton from "../../components/global/ExportButton";
import { useQuery } from "@tanstack/react-query";
import { fetchClients, useClientDropdown } from "../../redux/actions/clientAction";
import { fetchPumpBills } from "../../redux/actions/superAdminActions";
import { useVehicleDropdown } from "../../redux/actions/vehicleAction";
import { useFuelCompaniesDropdown } from "../../redux/actions/fuelAction";
import PumpBillsTable from "../../components/admin/Fuel/PumpBillsTable";

function PumpBills() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ vehicle: "",fuelCompany:"", from: "",   to: "", });
  const [selectedRows, setSelectedRows] = useState([]);
  const [link]= useState(`/pump-bills/pump_records`)

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({ vehicle: "",fuelCompany:"", from: "",   to: "", });
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["pump-bills", page, perPage, apiFilters],
    queryFn: fetchPumpBills,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  });

  const pumpBills = data?.docs || [];
  const totalPages = data?.pages || 1;
  const totalEntries = data?.docsCount || 10

   const { data: vehicleDropDownData } = useVehicleDropdown();
         const vehicleOptions = vehicleDropDownData?.map((v) => ({ id: v._id, name: v.vehicleNo })) || [];
  
  
     const {data:fuelCompaniesData} =useFuelCompaniesDropdown()

   
   const fuelCompaniesOptions = fuelCompaniesData?.docs.map((v) => ({ id: v.fuelCompany, name: v.fuelCompany })) || [];


  const clientVendorConfig = [
    {
      name: "vehicle",
      type: "select",
      placeholder: "Search Vehicle No",
      searchable: true,
      options: vehicleOptions
    },
  {
      name: "fuelCompany",
      type: "select",
      placeholder: "Fuel Company",
      searchable: true,
      options:fuelCompaniesOptions,
    },
   {
      name: "dateRange", 
      type: "date-range", 
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
    const payload = {
      vehicle: finalFilters.vehicle,
      fuelCompany: finalFilters.fuelCompany,
      from: finalFilters.from,
      to: finalFilters.to,
    };
    console.log("Submitting Range Filters to API:", payload);
    setApiFilters(payload);
  };


  const handleEdit = (row)=>{
    navigate(`/app/pump-bills/edit`, { state: { pumpBillData: row } });
  }

  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-hidden">
      <div className="w-full flex flex-col  animate-in fade-in duration-200">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <h1 className="text-xl font-medium text-black tracking-tight">
              All Pump Bills Entries
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButton selectedRows={selectedRows} apiFilters={apiFilters} linkRecord={link}/>

            <button
              onClick={() => navigate("/app/pump-bills/entry")} // Clean page navigation route
              type="button"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-gray-200"
            >
              <Plus size={18} className="stroke-[2.5]" />
              <span>Add Pump Bill Entry </span>
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
          <PumpBillsTable
          setEditedPumpEntry={handleEdit} 
            pumpBillsData={pumpBills} 
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

export default PumpBills;