import { useState } from "react";
import SearchFilters from "../../components/global/SearchFilter";
import EntryFuelTable from "../../components/admin/Fuel/EntryfuelTable";
import { useLocation, useNavigate } from "react-router-dom";
import ExportButton from "../../components/global/ExportButton";
import { fetchEntryFuels, useFuelCompaniesDropdown } from "../../redux/actions/fuelAction";
import { useQuery } from "@tanstack/react-query";
import { useVehicleDropdown } from "../../redux/actions/vehicleAction";

function EntryFuels() {
  const location = useLocation();
  const navigate = useNavigate();
const [selectedRows, setSelectedRows] = useState([]);
  const [link]= useState(`/fuel/entry_records`)

   const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({});
   const [filters, setFilters] = useState({
    vehicle: "",
    fuelCompany: "",
    from: "",
    to: "", 
  });


  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["entry-fuels", page, perPage, apiFilters],
    queryFn: fetchEntryFuels,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  });

const entryFuels = data?.docs || [];
  const totalPages = data?.pages || 1;
  const totalEntries = data?.docsCount || 10




  const EntryFuelModel = ()=>{
    navigate('/app/entry-fuel')
  }
  const fuelCompanyModel = ()=>{
    navigate('/app/entry-fuel/fuel-company')
}


   const { data: vehicleDropDownData } = useVehicleDropdown();
   const {data: fuelCompanies} =useFuelCompaniesDropdown()

   
   const fuelCompaniesOptions = fuelCompanies?.docs.map((v) => ({ id: v.fuelCompany, name: v.fuelCompany })) || [];
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
      name: "fuelCompany",
      type: "select",
      placeholder: "Company Name",
      searchable: true,
      options:fuelCompaniesOptions
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
      to: filters.to,
      fuelCompany:filters.fuelCompany
    };
    console.log("Submitting Range Filters to API:", payload);
    setApiFilters(payload);
  };



  return (
    <div className=" md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className=" mt-4  ">
              <div className="flex text-xs items-center gap-x-6 gap-y-4 mb-4 bg-gray-200 py-0.5  px-4 rounded-xl">
                <button onClick={EntryFuelModel}
                  className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer  ${location.pathname === '/app/entry-fuel' ? "font-semibold border-b-2 border-black text-black" : ""} `}
                >
                  Entry Fuel
                </button>
                <button onClick={fuelCompanyModel}
                  className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer ${location.pathname === '/app/entry-fuel/fuel-company'? "font-semibold border-b-2 border-black text-black" : ""} `}
                >
                  Fuel Companies
                </button>
              
              </div>
              
            </div>

             <>
    
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
       
       
       
        <div>
          <h1 className="text-xl font-medium text-black tracking-tight">
            Entry Fuel
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButton selectedRows={selectedRows} apiFilters={apiFilters} linkRecord={link}/>

          {/* <button
            onClick={handleToggleSidebar}
            type="button"
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm ${
              addFuelOpen
                ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                : "bg-[#1A1C1E] hover:bg-black text-white shadow-gray-200"
            }`}
          >
            {addFuelOpen ? (
              <>
                <X size={16} className="stroke-[2.5]" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Plus size={18} className="stroke-[2.5]" />
                <span>Entry Fuel</span>
              </>
            )}
          </button> */}
        </div>
      </div>

      <div className="w-full mb-6">
        <SearchFilters
          config={clientVendorConfig}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleSearchSubmit}
        />
      </div>

      <div
        className={`w-full flex flex-col-reverse lg:flex-row   items-start`}
      >
        <div
          className={`transition-all duration-300 ease-in-out 
           w-full
          `}
        >
          <EntryFuelTable 
          
          entryFuels={entryFuels} 
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

        {/* <div
          className={`transition-all duration-300 ease-in-out ${
            addFuelOpen
              ? "w-full lg:w-[35%] opacity-100 scale-100 visible"
              : "w-0 h-0 opacity-0 scale-95 overflow-hidden invisible"
          }`}
        >
          {addFuelOpen && (
            <div className="w-full ">
              <EntryFuel onSubmitSuccess={() => navigate("/app/entry-fuel")} />
            </div>
          )}
        </div> */}
      </div>
              </>
      
 
    </div>
  );
}

export default EntryFuels;
