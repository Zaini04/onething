import { ArrowUpRight, Wallet, Clock } from "lucide-react";
import StatsCards from "../../components/admin/dashboard/StatsCard";
import SalesProfitTrend from "../../components/admin/dashboard/SalesProfitTrend";
import ClientsTable from "../../components/admin/clients/ClientsTable";
import { useClients } from "../../redux/actions/clientAction";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchDashboard } from "../../redux/actions/superAdminActions";
import { useQuery } from "@tanstack/react-query";
import { formatAmount } from "../../hooks/formatAmount";
import TotalSales from "../../components/admin/dashboard/TotalSales";

function AdminDashboard() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
    const [apiFilters, setApiFilters] = useState({name: "", from: "",   to: "",   status: "Active"});


    const user = useSelector(state => state.auth.user)
  const {data,isLoading,isFetching} = useClients(page,perPage,apiFilters)
  console.log("clients",data)

  const clients = data?.docs || [];
  const totalPages = data?.pages || 1;
    const totalEntries = data?.docsCount || 10





  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden flex flex-col gap-y-6">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-y-3 sm:gap-y-0">
          <div className="flex flex-col">
            <h1 className="font-medium text-2xl text-black tracking-tight capitalize">
                Hi {user?.username}
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

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        <TotalSales/>

        <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-stretch">
          <StatsCards />
        </div>

        <div className="w-full md:col-span-2 xl:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
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
