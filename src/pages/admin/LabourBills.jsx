import { Plus, TrendingDown, User, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExportButton from "../../components/global/ExportButton";
import { useQuery } from "@tanstack/react-query";
import SearchFilters from "../../components/global/SearchFilter";
import { fetchLabourExpenseSummary, fetchLaboursBills, useLabourDropdown } from "../../redux/actions/labourAction";
import dayjs from "dayjs";
import LabourExpenseTable from "../../components/admin/labours/LabourExpenseTable";
import AddLabourExpense from "../../components/admin/labours/AddLabourExpense";

function LabourBills() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ labour: "", from: dayjs().startOf("month").format("YYYY-MM-DD"),
  to: dayjs().endOf("month").format("YYYY-MM-DD"),  });

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({ labour: "", from: dayjs().startOf("month").format("YYYY-MM-DD"),
  to: dayjs().endOf("month").format("YYYY-MM-DD"), });
  const [editExpense, setEditedExpense] = useState(null);

  const [selectedRows, setSelectedRows] = useState([]);
  const [link] = useState(`/labour/expense_records`);

  const mode = location.hash.replace("#", "");
  const addExpenseModelOpen = mode === "add" || mode === "edit";

  const handleAdd = () => {
      setEditedExpense(null);
    navigate("/app/reports/labour-bills#add");
  };
  const handleEdit = (row) => {
    setEditedExpense(row);
    navigate("/app/reports/labour-bills#edit");
  };

  const handleToggleSidebar = () => {
    if (addExpenseModelOpen) {
      navigate("/app/reports/labour-bills");
    } else {
      navigate("/app/reports/labour-bills#add");
    }
  };
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["labours-bills", page, perPage, apiFilters],
    queryFn: fetchLaboursBills,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const LabourExpenseData = data?.docs || [];
  const totalPages = data?.pages || 1;
  const totalEntries = data?.docsCount || 10;

      const {data:labourDropDownData} = useLabourDropdown()

            const laboursOptions = labourDropDownData?.map((v) => ({ id: v._id, name: `${v.name} (${v.phoneNumber || 'No Phone'})` })) || [];


            const { data: summaryData,  } = useQuery({
  queryKey: ["labour-expense-summary", apiFilters.labour, apiFilters.from, apiFilters.to],
  queryFn: fetchLabourExpenseSummary,
  enabled: !!apiFilters.labour,
  staleTime: 1000 * 30,
});


  const LabourBillsConfig = [
   {
      name: "labour",
      type: "select",
      searchable: true,
      placeholder: "Labour Name",
      options: laboursOptions,
    },

    {
      name: "dateRange",
      type: "date-range",
      label: "Select Date Range",
      placeholder: "Choose Range (From - To)",
    },
   
  ];

 const handleFilterChange = (name, value) => {
    if (name === "dateRange") {
      setFilters((prev) => ({ 
        ...prev, 
        from: value.from, 
        to: value.to 
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSearchSubmit = () => {
  console.log("Submitting Filters to API:", filters);
  setApiFilters({
    labour: filters.labour || "",
    from: filters.from || "",
    to: filters.to || "",
  });
};

  return (
    <div className="w-full space-y-5 md:w-[80%] lg:w-[85%] xl:w-[87%]   px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-xl font-medium text-black tracking-tight">
            All Labours Bills
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButton
            selectedRows={selectedRows}
            apiFilters={apiFilters}
            linkRecord={link}
          />

          <button
            onClick={handleToggleSidebar}
            type="button"
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm ${
              addExpenseModelOpen
                ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                : "bg-[#1A1C1E] hover:bg-black text-white shadow-gray-200"
            }`}
          >
            {addExpenseModelOpen ? (
              <>
                <X size={16} className="stroke-[2.5]" />
                <span>Cancel</span>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="flex justify-center items-center gap-x-2"
              >
                <Plus size={18} className="stroke-[2.5]" />
                <span>Add Labour Bill</span>
              </button>
            )}
          </button>
        </div>
      </div>

      <div className="w-full mb-6">
        <SearchFilters
          config={LabourBillsConfig}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleSearchSubmit}
        />
      </div>
      {apiFilters.labour && summaryData && (
  <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <User size={18} className="text-gray-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {summaryData.labour.name}
          </h3>
          <p className="text-xs text-gray-500">
            {summaryData.labour.phoneNumber}
          </p>
        </div>
      </div>
      <span className="text-xs text-gray-400">
        {new Date(summaryData.period.from).toLocaleDateString("en-GB")} -{" "}
        {new Date(summaryData.period.to).toLocaleDateString("en-GB")}
      </span>
    </div>

    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50">
        <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
          <TrendingDown size={16} className="text-red-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Spent This Period</p>
          <p className="text-base font-semibold text-red-600">
            {summaryData.totalSpent.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  </div>
)}

      <div
        className={`w-full flex flex-col-reverse lg:flex-row  ${addExpenseModelOpen ? "gap-6" : ""} items-start`}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            addExpenseModelOpen ? "w-full lg:w-[65%] shrink-0" : "w-full"
          }`}
        >
          <LabourExpenseTable
           setEditedLabour={handleEdit}
            laboursData={LabourExpenseData} 
            isLoading={isLoading || isFetching} 
            page={page} 
            perPage={perPage}
            setPage={setPage} 
            setPerPage={setPerPage}
            totalPages={totalPages}
            totalEntries = {totalEntries}
            setSelectedRows={setSelectedRows}
          />
        </div>
        
      
        <div
          className={`transition-all duration-300 ease-in-out ${
            addExpenseModelOpen
              ? "w-full lg:w-[35%] opacity-100 scale-100 visible"
              : "w-0 h-0 opacity-0 scale-95 overflow-hidden invisible"
          }`}
        >
          {addExpenseModelOpen && (
            <div className="w-full ">
              <AddLabourExpense editExpense={editExpense} setEditedExpense={setEditedExpense} />
            </div>
          )}

          
        </div>

        
      </div>

    

    </div>
  );
}

export default LabourBills;