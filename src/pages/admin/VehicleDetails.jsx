// src/pages/vehicles/VehicleDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { initialData } from "../../assets/mockData";
import VehicleCard from "../../components/admin/vehicles/VehicleCard";
import VehicleTable from "../../components/admin/vehicles/VehicleTable";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicle = initialData.find((item) => item.id === Number(id));

  return (
    <div className="w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
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

      <VehicleCard vehicle={vehicle} />

      <div className=" mt-4  ">
        {/* <div className="flex text-xs items-center gap-4 mb-4 bg-gray-200 py-3 px-4 rounded-xl">
            <button className="text-gray-700 hover:underline hover:text-gray-900 cursor-pointer ">Vehicle Ledger</button>
        </div> */}
        <VehicleTable />
      </div>
    </div>
  );
}
