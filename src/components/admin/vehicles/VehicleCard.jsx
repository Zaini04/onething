import { useParams } from "react-router-dom";
import profile from "../../../assets/images/profileImage.jpg";
import { FaTruck, FaIdCard } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicle } from "../../../redux/actions/vehicleAction";

const statusStyles = {
  Active: "bg-[#E6F6EC] text-[#15803D] border-emerald-200",
  InActive: "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200",
  Block: "bg-[#FEE2E2] text-[#DC2626] border-red-200",
};

export default function VehicleCard() {
 

    const {id} = useParams()

  const { data   } = useQuery({
    queryKey: ["vehicle",id],
    queryFn:  fetchVehicle,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const vehicleData = data



  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">

           
          </div>

          <div>
           <p className="font-medium text-sm text-gray-600">Vehicle Owner</p>

            <div className="flex items-center gap-2.5 flex-wrap">
              
              <h3 className="text-base md:text-lg font-medium text-gray-900 tracking-tight">
                {vehicleData?.ownerName}
              </h3>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusStyles[vehicleData?.status] || "bg-gray-100"}`}
              >
                {vehicleData?.status}
              </span>
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full sm:w-auto bg-gray-50/50 rounded-xl p-4 border border-gray-100/70 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-white border border-gray-100 shadow-xs text-gray-500">
              <FaIdCard size={14} />
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                Plate Number
              </p>
              <p className="font-semibold text-gray-900 tracking-wide mt-0.5">
                {vehicleData?.vehicleNo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-white border border-gray-100 shadow-xs text-gray-500">
              <FaTruck size={14} />
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                Vehicle Type
              </p>
              <p className="font-semibold text-gray-900 tracking-wide mt-0.5">
                {vehicleData?.typeVehicle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
