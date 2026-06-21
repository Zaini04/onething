import { Clock, Wallet } from 'lucide-react'
import { formatAmount } from '../../../hooks/formatAmount'
import { fetchDashboard } from '../../../redux/actions/superAdminActions';
import { useQuery } from '@tanstack/react-query';

export function TotalSalesSkeleton() {
  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100 animate-pulse">
      
      {/* Title */}
      <div className="h-4 w-40 bg-gray-200 rounded"></div>

      {/* Main amount */}
      <div className="h-6 w-56 bg-gray-200 rounded mt-3"></div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <div className="flex-1 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1 h-10 bg-gray-200 rounded-full"></div>
      </div>

      {/* Snapshot */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="h-3 w-32 bg-gray-200 rounded"></div>

        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 mt-3">
          <div className="h-20 bg-gray-100 rounded-xl"></div>
          <div className="h-20 bg-gray-100 rounded-xl"></div>
          <div className="h-20 bg-gray-100 rounded-xl"></div>
        </div>
      </div>

    </div>
  );
}

function TotalSales() {
     const { data:dashboardData  ,isLoading:isLoadings} = useQuery({
queryKey: ["dashboard"],
  queryFn: fetchDashboard,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

const dashboard = dashboardData?.docs

  return (
    <>
                   {isLoadings ? <TotalSalesSkeleton/>:<div className="w-full rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
        
          
          <div>
            <p className="text-sm font-medium text-black">
              This Month Collections
            </p>
            <h2 className="text-xl font-semibold mt-1 text-black flex items-baseline">
              Rs. {formatAmount(dashboard?.totalRates)}
            </h2>

            {/* <div className="flex items-center gap-1 mt-2">
              <span className="flex items-center gap-0.5 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">
                <ArrowUpRight size={12} className="stroke-[3]" />
                100%
              </span>
              <span className="text-xs text-gray-400 font-medium ml-1">
                vs last Month
              </span>
            </div> */}

            <div className="flex gap-3 mt-6">
              <p className="flex-1 flex items-center justify-center gap-2 bg-[#111] hover:bg-black text-white py-2.5 rounded-full text-xs font-medium shadow-sm transition-all cursor-pointer">
                <Wallet size={14} />
                Rec Rs. {formatAmount(dashboard?.totalReceived)}
              </p>
              <p className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-black py-2.5 rounded-full text-xs font-medium transition-all cursor-pointer">
                <Clock size={14} />
                Due Rs. {formatAmount(dashboard?.totalDue)}
              </p>
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
                <p className="text-sm font-semibold text-black mt-1">Rs. {formatAmount(dashboard?.cashReceived)}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">
                  cash collected
                </p>
              </div>
              <div className="bg-gray-50/70 hover:bg-white transition-all duration-300 delay-100 cursor-pointer hover:shadow-sm rounded-xl p-3 flex flex-col items-start">
                <p className="text-xs font-medium text-black">Fuel</p>
                <p className="text-sm font-semibold text-black mt-1">Rs. {formatAmount(dashboard?.fuelReceived)}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">
                  fuel collected
                </p>
              </div>
              <div className="bg-gray-50/70 hover:bg-white transition-all duration-300 delay-100 cursor-pointer hover:shadow-sm rounded-xl p-3 flex flex-col items-start">
                <p className="text-xs font-medium text-black">Check</p>
                <p className="text-sm font-semibold text-black mt-1">Rs. {formatAmount(dashboard?.checkReceived)}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">
                  check receivable
                </p>
              </div>
            </div>
          </div>
        </div>}

    
    </>
    

           )
}

export default TotalSales