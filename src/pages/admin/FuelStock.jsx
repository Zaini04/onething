import { Plus, X } from "lucide-react";
import { useState } from "react";
import SearchFilters from "../../components/global/SearchFilter";
import { useNavigate, useLocation } from "react-router-dom";
import ExportButton from "../../components/global/ExportButton";
import { useQuery } from "@tanstack/react-query";
import AddFuelStock from "../../components/admin/Fuel/AddFuelStock";
import { fetchFuelStocks, useFuelCompaniesDropdown } from "../../redux/actions/fuelAction";
import AllFuelStockCompanies from "../../components/admin/Fuel/AllFuelStockCompanies";

function FuelStock() {
  const location = useLocation();
  const navigate = useNavigate();
 const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({});
    const [link]= useState(`/fuel/stock_records`)
    const [filters, setFilters] = useState({from: "",   to: "", fuelCompany: "" });
    const [selectedRows, setSelectedRows] = useState([]);



    const [editFuelCompany, setEditedFuelCompany] = useState(null);


  const mode = location.hash.replace("#", "");
const addFuelOpen = mode === "add" || mode === "edit";

const handleAdd = () => {
  setEditedFuelCompany(null);          
  navigate("/app/fuel-stock#add");   
};
const handleEdit = (row) => {
  setEditedFuelCompany(row);          
  navigate("/app/fuel-stock#edit"); 
};

   const { data, isLoading, isFetching } = useQuery({
    queryKey: ["fuel-stocks", page, perPage,apiFilters],
    queryFn:  fetchFuelStocks,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const fuelCompanies = data?.docs || [];
  const totalPages = data?.pages || 1;
    const totalEntries = data?.docsCount || 10


  const handleToggleSidebar = () => {
    if (addFuelOpen) {
      navigate("/app/fuel-stock");
    } else {
      navigate("/app/fuel-stock#add");
    }
  };
   const {data:fuelCompaniesData} =useFuelCompaniesDropdown()

   
   const fuelCompaniesOptions = fuelCompaniesData?.docs.map((v) => ({ id: v.fuelCompany, name: v.fuelCompany })) || [];


  const clientVendorConfig = [
   {
      name: "dateRange", 
      type: "date-range", 
      label: "Select Date Range",
      placeholder: "Choose Range (From - To)",
    },

    {
      name: "fuelCompany",
      type: "select",
      placeholder: "Fuel Company",
      searchable: true,
      options:fuelCompaniesOptions,
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
      from: filters.from,
      to: filters.to,
      fuelCompany:filters.fuelCompany
    };
    console.log("Submitting Range Filters to API:", payload);
    setApiFilters(payload);
  };


  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-xl font-medium text-black tracking-tight">
            Fuel Stocks
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButton selectedRows={selectedRows} apiFilters={apiFilters} linkRecord={link}/>
          <button
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
                <button onClick={handleAdd} className="flex justify-center items-center gap-x-2">
                <Plus size={18} className="stroke-[2.5]" />
                <span>Add Fuel Stock</span>
              </button>
            )}
          </button>
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
        className={`w-full flex flex-col-reverse lg:flex-row ${addFuelOpen ? "gap-6" : ""}  items-start`}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            addFuelOpen ? "w-full lg:w-[65%] shrink-0" : "w-full"
          }`}
        >
          <AllFuelStockCompanies  
           setEditedFuelCompany={handleEdit}
            addFuelOpen={handleToggleSidebar}
            fuelCompaniesData={fuelCompanies}
            isLoading={isLoading || isFetching}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            totalPages={totalPages}
            totalEntries = {totalEntries}
            setSelectedRows={setSelectedRows}
            />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            addFuelOpen
              ? "w-full lg:w-[35%] opacity-100 scale-100 visible"
              : "w-0 h-0 opacity-0 scale-95 overflow-hidden invisible"
          }`}
        >
          {addFuelOpen && (
            <div className="w-full ">
              <AddFuelStock
editFuelCompany={editFuelCompany} setEditedFuelCompany={setEditedFuelCompany}            />
            </div> 
          )}
        </div>
      </div>
    </div>
  );
}

export default FuelStock;
