import profile from "../../../assets/images/profileImage.jpg";
import {  FaIdCard } from "react-icons/fa";

const statusStyles = {
  Active: "bg-[#E6F6EC] text-[#15803D] border-emerald-200",
  InActive: "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200",
  Block: "bg-[#FEE2E2] text-[#DC2626] border-red-200",
};

export default function ClientCard({ client }) {
  if (!client) {
    return (
      <div className="w-full bg-white  rounded-2xl border border-gray-100 text-center text-sm text-gray-400">
        No client details found.
      </div>
    );
  }

  // console.log("clgs",client)
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={profile}
              alt={client[0]?.client?.name}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover ring-4 ring-gray-50 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-base md:text-lg font-medium text-gray-900 tracking-tight">
                {client[0]?.client?.name}
              </h3>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusStyles[client.status] || "bg-gray-100"}`}>
                {client[0]?.client?.status}
              </span>
            </div>
            <p className="text-[10px] font-medium text-gray-400 mt-0.5 tracking-wide uppercase">
              System ID: <span className="text-gray-700 font-semibold ">#{client[0]?.client?._id}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full sm:w-auto bg-gray-50/50 rounded-xl p-4 border border-gray-100/70 text-xs">
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-white border border-gray-100 shadow-xs text-gray-500">
              <FaIdCard size={14} />
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Phone Number</p>
              <p className="font-semibold text-gray-900 tracking-wide mt-0.5">{client[0]?.client?.phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-white border border-gray-100 shadow-xs text-gray-500">
              <FaIdCard size={14} />
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">City</p>
              <p className="font-semibold text-gray-900 tracking-wide mt-0.5">{client[0]?.client?.city}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}