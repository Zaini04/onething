import { useQuery } from "@tanstack/react-query";
import { MdOutlineAccountBalanceWallet, MdCallReceived, MdPriorityHigh, MdHourglassEmpty } from "react-icons/md";
import { fetchIncomeExpenseSummary } from "../../../redux/actions/entryVehicleAction";
import { useState } from "react";
import FormInput from "../../global/FormInput";

export default function IncomeSummaryCards() {

const [dateFilter,setDateFilter]=useState({
    from:'',
    to:''
})

  const { data  ,isLoading,isFetching } = useQuery({
queryKey: ["income-summary", dateFilter.from, dateFilter.to],
  queryFn: fetchIncomeExpenseSummary,
      staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  console.log("idd",data)

  const incomeSummary = data?.docs

  const handleFromChange = (e) => {
  setDateFilter((prev) => ({
    ...prev,
    from: e.target.value,
  }));
};

const handleToChange = (e) => {
  setDateFilter((prev) => ({
    ...prev,
    to: e.target.value,
  }));
};


  const stats = [
    {
      title: "Total Vehicles Cost",
      amount: incomeSummary?.totalRateSum,
      icon: <MdOutlineAccountBalanceWallet size={24} />,
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Total Expense",
      amount: incomeSummary?.totalExpense,
      icon: <MdCallReceived size={24} />,
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Total Profit",
      amount: incomeSummary?.remainingAmountSum,
      icon: <MdPriorityHigh size={24} />,
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
    },
    
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full px-1">
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
         <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-center gap-3">

        <FormInput
          type="date"
          id='from'
          value={dateFilter.from}
          label='from'
          onChange={handleFromChange
          }
          className="border rounded-lg px-3 py-2 text-sm"
        />

        <FormInput
          type="date"
          id="to"
          label="to"
          value={dateFilter.to}
          onChange={handleToChange
          }
          className="border rounded-lg px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}