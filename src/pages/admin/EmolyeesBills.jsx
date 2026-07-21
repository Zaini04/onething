import { Plus, TrendingDown, TrendingUp, User, Wallet, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExportButton from "../../components/global/ExportButton";
import { useQuery } from "@tanstack/react-query";
import { fetchOfficeExpenses } from "../../redux/actions/superAdminActions";
import AllExpenses from "../../components/admin/officeExpense/AllExpenses";
import AddOfficeExpense from "../../components/admin/officeExpense/AddExpense";
import SearchFilters from "../../components/global/SearchFilter";
import { fetchEmployeeExpenseSummary, fetchEmployeesBills, useEmployeeDropdown } from "../../redux/actions/employeeAction";
import EmployeeExpenseTable from "../../components/admin/employee/EmployeeExpenseTable";
import AddEmployeeExpense from "../../components/admin/employee/AddEmployeeExpense";
import dayjs from "dayjs"; 
function EmployeesBills() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ employee: "", from: dayjs().startOf("month").format("YYYY-MM-DD"),
  to: dayjs().endOf("month").format("YYYY-MM-DD"),  });

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({ employee: "", from: dayjs().startOf("month").format("YYYY-MM-DD"),
  to: dayjs().endOf("month").format("YYYY-MM-DD"), });
  const [editExpense, setEditedExpense] = useState(null);

  const [selectedRows, setSelectedRows] = useState([]);
  const [link] = useState(`/employee/expense_records`);

  const mode = location.hash.replace("#", "");
  const addExpenseModelOpen = mode === "add" || mode === "edit";

  const handleAdd = () => {
      setEditedExpense(null);
    navigate("/app/reports/employee-bills#add");
  };
  const handleEdit = (row) => {
    setEditedExpense(row);
    navigate("/app/reports/employee-bills#edit");
  };

  const handleToggleSidebar = () => {
    if (addExpenseModelOpen) {
      navigate("/app/reports/employee-bills");
    } else {
      navigate("/app/reports/employee-bills#add");
    }
  };
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["employees-bills", page, perPage, apiFilters],
    queryFn: fetchEmployeesBills,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const EmployeeExpenseData = data?.docs || [];
  const totalPages = data?.pages || 1;
  const totalEntries = data?.docsCount || 10;

      const {data:employeeDropDownData} = useEmployeeDropdown()
        //  const emloyeesOptions = [...new Set(employeeDropDownData?.map((v)=>v.name)|| [])].map((name)=>({id:name,name:name,phoneNumber:phoneNumber})) || [];
  
            const emloyeesOptions = employeeDropDownData?.map((v) => ({ id: v._id, name: `${v.name} (${v.phoneNumber || 'No Phone'})` })) || [];


            const { data: summaryData, isLoading: isSummaryLoading } = useQuery({
  queryKey: ["employee-expense-summary", apiFilters.employee, apiFilters.from, apiFilters.to],
  queryFn: fetchEmployeeExpenseSummary,
  enabled: !!apiFilters.employee, // yehi condition card ko start pe hide rakhti hai
  staleTime: 1000 * 30,
});


  const EmployeeBillsConfig = [
   {
      name: "employee",
      type: "select",
      searchable: true,
      placeholder: "Employee Name",
      options: emloyeesOptions,
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
// 1. Submit controller ko fix karein taake wo local controlled 'filters' state se data read kare, random parameter se nahi
const handleSearchSubmit = () => {
  console.log("Submitting Filters to API:", filters);
  setApiFilters({
    employee: filters.employee || "",
    from: filters.from || "",
    to: filters.to || "",
    status: filters.status || ""
  });
};

  return (
    <div className="w-full space-y-5 md:w-[80%] lg:w-[85%] xl:w-[87%]   px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-xl font-medium text-black tracking-tight">
            All Employees Expenses
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
                <span>Add Employee Expense</span>
              </button>
            )}
          </button>
        </div>
      </div>

      <div className="w-full mb-6">
        <SearchFilters
          config={EmployeeBillsConfig}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleSearchSubmit}
        />
      </div>
      {apiFilters.employee && summaryData && (
  <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <User size={18} className="text-gray-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {summaryData.employee.name}
          </h3>
          <p className="text-xs text-gray-500">
            {summaryData.employee.phoneNumber}
          </p>
        </div>
      </div>
      <span className="text-xs text-gray-400">
        {new Date(summaryData.period.from).toLocaleDateString("en-GB")} -{" "}
        {new Date(summaryData.period.to).toLocaleDateString("en-GB")}
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
          <Wallet size={16} className="text-blue-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Monthly Salary</p>
          <p className="text-base font-semibold text-gray-900">
            {summaryData.employee.monthlySalary.toLocaleString()}
          </p>
        </div>
      </div>

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

      <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50">
        <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
          <TrendingUp size={16} className="text-green-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Remaining Salary</p>
          <p className="text-base font-semibold text-green-600">
            {summaryData.remainingSalary.toLocaleString()}
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
          <EmployeeExpenseTable
           setEditedEmployee={handleEdit}
            employeesData={EmployeeExpenseData} 
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
              <AddEmployeeExpense editExpense={editExpense} setEditedExpense={setEditedExpense} />
            </div>
          )}

          
        </div>

        
      </div>

    

    </div>
  );
}

export default EmployeesBills;
