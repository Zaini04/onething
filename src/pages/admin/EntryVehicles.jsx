import { Plus } from "lucide-react";
import AllVehiclesAndCustomers from "../../components/admin/vehicles/AllVehiclesAndCustomers";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import SearchFilters from "../../components/global/SearchFilter";
import ExportButton from "../../components/global/ExportButton";
import { useQuery } from "@tanstack/react-query";
import { fetchEntryVehiclesData } from "../../redux/actions/entryVehicleAction";
import PaymentReceivedModel from "../../components/global/PaymentReceivedModel";
import GenerateBillModal from "../../components/global/GenerateBillModel";
import ViewDetailsModal from "../../components/global/ViewDetailsModel";
import { useClientDropdown } from "../../redux/actions/clientAction";
import { useVehicleDropdown } from "../../redux/actions/vehicleAction";

function EntryVehicles() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentModal = searchParams.get("modal");

  const handleCloseModal = () => {
    // URL ko clean karne ke liye standard tareeqa
    setSearchParams({}, { replace: true });
  };

  const handleConfirmAction = (data) => {
    console.log(`Action confirmed for ${currentModal}:`, data);
    handleCloseModal();
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({});

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["entry-vehicles", page, perPage, apiFilters],
    queryFn: fetchEntryVehiclesData,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  });

  const entry_vehicles = data?.docs || [];
  const totalPages = data?.pages || 1;

  const {data:clientDropDownData} = useClientDropdown()
   const { data: vehicleDropDownData } = useVehicleDropdown();

   const clientOptions = clientDropDownData?.map((v) => ({ id: v._id, name: v.name })) || [];

      const vehicleOptions = vehicleDropDownData?.map((v) => ({ id: v._id, name: v.vehicleNo })) || [];


  const clientVendorConfig = [
    {
      name: "client",
      type: "select",
      placeholder: "Search Client",
      searchable: true,
      options:clientOptions
    },
    {
      name: "vehicle",
      type: "select",
      placeholder: "Search Vehicle No",
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

  const [filters, setFilters] = useState({ client: "", vehicle: "", date: "" });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (finalFilters) => {
    console.log("Fetching Entry Vehicles data with fields:", finalFilters);
    setApiFilters(finalFilters);
    setPage(1);
  };
  const handleEdit = (row)=>{
    navigate(`/app/entry-vehicle/edit`, { state: { entryVehicleData: row } });
  }

  return (
    <div className="w-full md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-hidden">
      <div className="w-full flex flex-col  animate-in fade-in duration-200">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <h1 className="text-xl font-medium text-black tracking-tight">
              Entry Vehicles
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <ExportButton />

            <button
              onClick={() => navigate("/app/entry-vehicles/entry")}
              type="button"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-gray-200"
            >
              <Plus size={18} className="stroke-[2.5]" />
              <span>Entry Vehicle</span>
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

        <div className="w-full max-w-full  overflow-hidden">
          <AllVehiclesAndCustomers 
          setEditedEntryVehicle={handleEdit}
            entryVehicleData={entry_vehicles} 
            isLoading={isLoading || isFetching} 
            page={page} 
            perPage={perPage}
            setPage={setPage} 
            setPerPage={setPerPage}
            totalPages={totalPages}
          />
        </div>
      </div>
      <PaymentReceivedModel
        isOpen={currentModal === "payment"}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
      />

      <GenerateBillModal
        isOpen={currentModal === "bill"}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
      />

      <ViewDetailsModal
        isOpen={currentModal === "view"}
        onClose={handleCloseModal}
        title="Details View"
        />
    </div>
  );
}

export default EntryVehicles;
