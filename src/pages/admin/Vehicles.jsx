import { Plus, X } from "lucide-react";
import AllVehicles from "../../components/admin/vehicles/AllVehicles";
import { useState } from "react";
import AddVehicle from "../../components/admin/vehicles/AddVehicle";
import SearchFilters from "../../components/global/SearchFilter";
import { useLocation, useNavigate } from "react-router-dom";
import ExportButton from "../../components/global/ExportButton";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicles, useVehicleDropdown } from "../../redux/actions/vehicleAction";

function Vehicles() {
  const location = useLocation();
  const navigate = useNavigate();
const [filters, setFilters] = useState({
    vehicleNo: "",
    ownerName: "",
    status: "Active",
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({ownerName: "",
       vehicleNo: "",
       status:"Active"});
  
  const [editVehicle, setEditedVehicle] = useState(null);
const [selectedRows, setSelectedRows] = useState([]);
  const [link]= useState(`/vehicle/vehicle_records`)

const mode = location.hash.replace("#", "");
const addVehicleModelOpen = mode === "add" || mode === "edit";

const handleAdd = () => {
  setEditedVehicle(null);          
  navigate("/app/vehicles#add");   
};
const handleEdit = (row) => {
  setEditedVehicle(row);          
  navigate("/app/vehicles#edit"); 
};

  const handleToggleSidebar = () => {
    if (addVehicleModelOpen) {
      navigate("/app/vehicles");
    } else {
      navigate("/app/vehicles#add");
    }
  };
   const { data, isLoading, isFetching } = useQuery({
    queryKey: ["vehicles", page, perPage,apiFilters],
    queryFn:  fetchVehicles,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const vehicles = data?.docs || [];
  const totalPages = data?.pages || 1;
    const totalEntries = data?.docsCount || 10
       const { data: vehicleDropDownData } = useVehicleDropdown();
       const vehicleOptions = vehicleDropDownData?.map((v) => ({ id: v.vehicleNo, name: v.vehicleNo })) || [];



  const vehicleConfig = [
    { name: "vehicleNo", type: "select", searchable: true, placeholder: "Number",      options: vehicleOptions,
 },
    {
      name: "ownerName",
      type: "select",
      searchable: true,
      placeholder: "Owner Name",
      options: ["Yoichi", "isagi","zain"],
    },
    {
      name: "status",
      type: "select",
      searchable: false,
      placeholder: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Deleted", value: "Deleted" },
      ],
    },
  ];

  

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  console.log("apifil",apiFilters)
  const handleSearchSubmit = (finalFilters) => {
    console.log("Fetching Vehicles data with:", finalFilters);

    setApiFilters({
       ownerName: finalFilters.ownerName,
       vehicleNo: finalFilters.vehicleNo,
       status:finalFilters.status
 
    })
  };


  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]   px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-xl font-medium text-black tracking-tight">
            All Vehicles
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButton selectedRows={selectedRows} apiFilters={apiFilters} linkRecord={link}/>

          <button
            onClick={handleToggleSidebar}
            type="button"
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm ${
              addVehicleModelOpen
                ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                : "bg-[#1A1C1E] hover:bg-black text-white shadow-gray-200"
            }`}
          >
            {addVehicleModelOpen ? (
              <>
                <X size={16} className="stroke-[2.5]" />
                <span>Cancel</span>
              </>
            ) : (
              <button onClick={handleAdd} className="flex justify-center items-center gap-x-2">
                <Plus size={18} className="stroke-[2.5]" />
                <span>Add Vehicle</span>
              </button>
            )}
          </button>
        </div>
      </div>

      <div className="w-full mb-6">
        <SearchFilters
          config={vehicleConfig}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleSearchSubmit}
        />
      </div>

      <div
        className={`w-full flex flex-col-reverse lg:flex-row  ${addVehicleModelOpen ? "gap-6" : ""} items-start`}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            addVehicleModelOpen ? "w-full lg:w-[65%] shrink-0" : "w-full"
          }`}
        >
          <AllVehicles     setEditedVehicle={handleEdit}
            addModelOpen={handleToggleSidebar}
            vehiclesData={vehicles}
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
            addVehicleModelOpen
              ? "w-full lg:w-[35%] opacity-100 scale-100 visible"
              : "w-0 h-0 opacity-0 scale-95 overflow-hidden invisible"
          }`}
        >
          {addVehicleModelOpen && (
            <div className="w-full ">
              <AddVehicle setEditedVehicle={setEditedVehicle} editVehicle={editVehicle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vehicles;
