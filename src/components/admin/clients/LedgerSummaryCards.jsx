import { useQuery } from "@tanstack/react-query";
import { MdOutlineAccountBalanceWallet, MdCallReceived, MdPriorityHigh, MdHourglassEmpty } from "react-icons/md";
import { useParams } from "react-router-dom";
import { fetchClientSummary } from "../../../redux/actions/clientAction";

export default function LedgerSummaryCards() {

  const {id} = useParams()

  console.log("cldid",id)

  const { data   } = useQuery({
    queryKey: ["client-summary",id],
    queryFn:  fetchClientSummary,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  console.log("cldd",data)

  const clientSummary = data


  const stats = [
    {
      title: "Total Vehicles Cost",
      amount: clientSummary?.totalRate,
      icon: <MdOutlineAccountBalanceWallet size={24} />,
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Total Received",
      amount: clientSummary?.totalReceived,
      icon: <MdCallReceived size={24} />,
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Total Due",
      amount: clientSummary?.totalDue,
      icon: <MdPriorityHigh size={24} />,
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      title: "Client Balance",
      amount: clientSummary?.totalAdvance,
      icon: <MdHourglassEmpty size={24} />,
      bgColor: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full px-1">
      {stats.map((card, index) => (
        <div
          key={index}
          className="bg-white cursor-pointer border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-xs hover:shadow-md hover:border-gray-200/80 transition-all duration-200"
        >
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              {card.title}
            </p>
            <h3 className="text-lg font-medium text-gray-900 ">
              {card.amount}
            </h3>
          </div>

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.bgColor} shrink-0`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}