import { useQuery } from "@tanstack/react-query";
import { MdOutlineAccountBalanceWallet, MdCallReceived, MdPriorityHigh } from "react-icons/md";
import { fetchIncomeExpenseSummary } from "../../../redux/actions/entryVehicleAction";
import { formatAmount } from "../../../hooks/formatAmount";

export default function IncomeSummaryCards({from,to,vehicle}) {


  const { data  ,isLoading,isFetching } = useQuery({
queryKey: ["income-summary",vehicle, from, to],
  queryFn: fetchIncomeExpenseSummary,
      staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  console.log("idd",data)

  const incomeSummary = data?.docs

 




  const stats = [
    {
      title: "Total Vehicles Cost",
      amount: formatAmount(incomeSummary?.totalRateSum),
      icon: <MdOutlineAccountBalanceWallet size={24} />,
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Total Expense",
      amount: formatAmount(incomeSummary?.totalExpense),
      icon: <MdCallReceived size={24} />,
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Total Profit",
      amount: formatAmount(incomeSummary?.remainingAmountSum),
      icon: <MdPriorityHigh size={24} />,
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
    },
    
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 w-full px-1">
      {stats.map((card, index) => (
        <div
          key={index}
          className="bg-white cursor-pointer border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-xs hover:shadow-md hover:border-gray-200/80 transition-all duration-200"
        >
             {isLoading || isFetching ? (
      <div className="animate-pulse space-y-2">
        {/* title skeleton */}
        <div className="h-3 w-24 bg-gray-200 rounded" />

        {/* value skeleton */}
        <div className="h-6 w-20 bg-gray-300 rounded" />
      </div>
    ) :(
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              {card.title}
            </p>
            <h3 className="text-lg font-medium text-gray-900 ">
              {card.amount} Rs
            </h3>
          </div>
    )}

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.bgColor} shrink-0`}>
            {card.icon}
          </div>
        </div>
      ))}
       
    </div>
  );
}