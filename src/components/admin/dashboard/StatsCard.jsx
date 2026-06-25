import { useQuery } from "@tanstack/react-query";
import { fetchTodayDashboard } from "../../../redux/actions/superAdminActions";
import { TotalSalesSkeleton } from "./TotalSales";
import { formatAmount } from "../../../hooks/formatAmount";

export default function StatsCards() {

     const { data  ,isLoading} = useQuery({
queryKey: ["today-dashboard"],
  queryFn: fetchTodayDashboard,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });
  const todayDashboard = data?.docs
  console.log("td",todayDashboard)


  const cards = [
    {
      title: "Today Sales",
      value: formatAmount(todayDashboard?.totalRates),
      valueSuffix: "",
      change: "",
      dark: true,
      iconColor: "bg-orange-500 text-white",
    },
    {
      title: "Today Orders",
      value: formatAmount(todayDashboard?.totalOrders),
      valueSuffix: "",
      change: "",
      dark: false,
      iconColor: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Today Profit",
      value: formatAmount(todayDashboard?.totalProfit),
      valueSuffix: "",
      change: "",
      dark: false,
      iconColor: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Today Payment Collected",
      value: formatAmount(todayDashboard?.totalReceived),
      valueSuffix: "",
      change: "",
      dark: false,
      iconColor: "bg-orange-500/10 text-orange-500",
    },
  ];

  const GridIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" />
      <rect x="3" y="15" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
    </svg>
  );

  

  return (
    isLoading ? 
    <TotalSalesSkeleton/> : 

    <div className="grid grid-cols-1  xs:grid-cols-2 gap-3 w-full h-full">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`rounded-2xl p-4 flex flex-col justify-between border cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              card.dark
                ? "bg-black text-white border-transparent shadow-sm hover:bg-[#121212] hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                : "bg-gray-50/60 text-gray-900 border-gray-100/50 shadow-sm hover:bg-white hover:border-gray-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            }`}
        >
          <div className="flex items-center justify-between w-full">
            <span
              className={`text-xs font-semibold ${card.dark ? "text-white" : "text-black"}`}
            >
              {card.title}
            </span>
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-lg ${card.iconColor}`}
            >
              <GridIcon />
            </span>
          </div>

          <div className="mt-5">
            <h3 className="text-xl font-bold tracking-tight flex items-baseline">
              <span className={card.dark ? "text-white" : "text-black"}>
                {card.value}
              </span>
              {card.valueSuffix && (
                <span
                  className={`text-sm font-bold ml-0.5 ${card.dark ? "text-white/80" : "text-black/80"}`}
                >
                  {card.valueSuffix}
                </span>
              )}
            </h3>

            <p
              className={`text-[11px] font-medium mt-1.5 flex items-center gap-0.5 ${
                card.dark ? "text-white/90" : "text-black/90"
              }`}
            >
              <span className="text-green-500 font-bold text-xs">↑</span>
              {card.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
