import { ArrowUpRight, Wallet, Clock } from "lucide-react";
import StatsCards from "../../components/admin/dashboard/StatsCard";
import SalesProfitTrend from "../../components/admin/dashboard/SalesProfitTrend";
import ClientsTable from "../../components/admin/clients/ClientsTable";
import { useClients } from "../../redux/actions/clientAction";
import { useState } from "react";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

    const user = useSelector(state => state.auth.user)
  const {data,isLoading,isFetching} = useClients(page,perPage)
  console.log("clients",data)

  const clients = data?.docs || [];
  const totalPages = data?.pages || 1;
    const totalEntries = data?.docsCount || 10
  return (
    <div className="w-full md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden flex flex-col gap-y-6">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-y-3 sm:gap-y-0">
          <div className="flex flex-col">
            <h1 className="font-medium text-2xl text-black tracking-tight uppercase">
                {user?.username}
            </h1>
            <p className="font-medium text-xs text-gray-500 mt-0.5">
              See Reports & Analytics of your business!
            </p>
          </div>
          {/* <div className="w-full sm:w-5/12 md:w-4/12 lg:w-3/12 relative">
            <input
              placeholder="Hinted Search Text"
              className="w-full px-4 py-3 font-normal text-[14px] text-[#49454F] bg-white rounded-full outline-none pr-12 shadow-sm border border-gray-100"
            />
            <Search
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#49454F]"
            />
          </div> */}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-black">
              This Month Collections
            </p>
            <h2 className="text-2xl font-semibold mt-1 text-black flex items-baseline">
              Rs. 10
              <span className="text-xl font-semibold ml-1">cr</span>
            </h2>

            <div className="flex items-center gap-1 mt-2">
              <span className="flex items-center gap-0.5 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">
                <ArrowUpRight size={12} className="stroke-[3]" />
                100%
              </span>
              <span className="text-xs text-gray-400 font-medium ml-1">
                vs last Month
              </span>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#111] hover:bg-black text-white py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer">
                <Wallet size={14} />
                Today Rs. 259.2
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-black py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer">
                <Clock size={14} />
                Due Rs. 59.2
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100/80">
            <p className="text-xs font-bold text-black">
              Quick Snapshot{" "}
              <span className="text-gray-400 font-medium ml-1">
                | Key business balances
              </span>
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 mt-3">
              <div className="bg-gray-50/70 hover:bg-white transition-all duration-300 delay-100 cursor-pointer hover:shadow-sm rounded-xl p-3 flex flex-col items-start">
                <p className="text-xs font-medium text-black">Cash</p>
                <p className="text-base font-bold text-black mt-1">Rs. 0</p>
                <p className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">
                  cash collected
                </p>
              </div>
              <div className="bg-gray-50/70 hover:bg-white transition-all duration-300 delay-100 cursor-pointer hover:shadow-sm rounded-xl p-3 flex flex-col items-start">
                <p className="text-xs font-medium text-black">Online</p>
                <p className="text-base font-bold text-black mt-1">Rs. 0</p>
                <p className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">
                  online collected
                </p>
              </div>
              <div className="bg-gray-50/70 hover:bg-white transition-all duration-300 delay-100 cursor-pointer hover:shadow-sm rounded-xl p-3 flex flex-col items-start">
                <p className="text-xs font-medium text-black">Due</p>
                <p className="text-base font-bold text-black mt-1">Rs. 0</p>
                <p className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">
                  pending receivable
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-stretch">
          <StatsCards />
        </div>

        <div className="w-full md:col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <SalesProfitTrend />
        </div>
      </div>

      <div className="w-full mt-2">
        <h2 className="font-medium mb-3 text-xl text-black tracking-tight">
          Recent Clients
        </h2>
        <ClientsTable clientsData={clients}
        isLoading={isLoading || isFetching}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        totalEntries = {totalEntries}
        
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
