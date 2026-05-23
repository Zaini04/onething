import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Oct", Revenue: 2, Profit: 1.5 },
  { month: "Nov", Revenue: 3, Profit: 2 },
  { month: "Dec", Revenue: 2.5, Profit: 1.8 },
  { month: "Jan", Revenue: 4, Profit: 2.5 },
  { month: "Feb", Revenue: 3, Profit: 2 },
  { month: "Mar", Revenue: 3.5, Profit: 2.2 },
  { month: "Apr", Revenue: 2, Profit: 1.5 },
  { month: "May", Revenue: 259.2, Profit: 1.8 },
];

const CustomLegend = () => (
  <div className="flex items-center gap-4 justify-end">
    <div className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
      <span className="text-sm text-gray-700 font-medium">Revenue</span>
    </div>
    <div className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full bg-gray-900 inline-block" />
      <span className="text-sm text-gray-700 font-medium">Profit</span>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-md px-4 py-2 text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.fill }} className="font-medium">
            {entry.name}: Rs. {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SalesProfitTrend() {
  const peakSales = Math.max(...data.map((d) => d.Revenue));

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <h2 className="text-sm font-medium text-black">Sales & Profit Trend</h2>
        <p className="text-xs text-black mt-1 mb-2">
          Track how sales and profit are moving across recent months
        </p>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-800">Revenue and Profit</span>
        <CustomLegend />
      </div>

      <div className="w-full h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="25%"
            barGap={3}
            margin={{ top: 10, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
            <Bar dataKey="Profit" fill="#111827" radius={[3, 3, 0, 0]} maxBarSize={12} />
            <Bar dataKey="Revenue" fill="#f97316" radius={[3, 3, 0, 0]} maxBarSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs font-medium text-black mt-3">
        Peak sales: Rs. {peakSales.toLocaleString()}
      </p>
    </div>
  );
}