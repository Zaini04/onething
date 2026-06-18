// src/pages/vehicles/VehicleDetails.jsx
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import VehicleCard from "../../components/admin/vehicles/VehicleCard";
import VehicleTable from "../../components/admin/vehicles/VehicleTable";
import { fetchVehicleLedger } from "../../redux/actions/vehicleAction";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import GenerateBillModal from "../../components/global/GenerateBillModel";
import ViewDetailsModal from "../../components/global/ViewDetailsModel";
import PaymentReceivedModel from "../../components/global/PaymentReceivedModel";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);


  const [apiFilters, setApiFilters] = useState({});

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

     const { data, isLoading, isFetching } = useQuery({
    queryKey: ["vehicle-ledger", page, perPage,apiFilters,id],
    queryFn:  fetchVehicleLedger,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const vehicleLedger = data?.docs || [];
  const totalPages = data?.pages || 1;
    const totalEntries = data?.docsCount || 10




  return (
    <div className="md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="flex justify-between items-center text-gray-900 tracking-tight mb-4">
        <div>
          <h2 className="text-xl font-medium text-black">Vehicle Details</h2>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaArrowLeft
            className="cursor-pointer bg-white p-2 rounded-xl w-12 h-9 border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95"
            size={20}
          />
        </button>
      </div>

      <VehicleCard vehicle={vehicleLedger} />

      <div className=" mt-4  ">
        {/* <div className="flex text-xs items-center gap-4 mb-4 bg-gray-200 py-3 px-4 rounded-xl">
            <button className="text-gray-700 hover:underline hover:text-gray-900 cursor-pointer ">Vehicle Ledger</button>
        </div> */}
        <VehicleTable 
            vehicleLedgerData={vehicleLedger}
            isLoading={isLoading || isFetching}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            totalPages={totalPages} 
            totalEntries = {totalEntries}
            />
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
