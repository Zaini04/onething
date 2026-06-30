import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExportButton from "../../components/global/ExportButton";
import { useQuery } from "@tanstack/react-query";
import { fetchOfficeExpenses } from "../../redux/actions/superAdminActions";
import AllExpenses from "../../components/admin/officeExpense/AllExpenses";
import AddOfficeExpense from "../../components/admin/officeExpense/AddExpense";

function OfficeExpenses() {
  const location = useLocation();
  const navigate = useNavigate();
const [filters, setFilters] = useState({
    vehicleNo: "",
    ownerName: "",
    status: "Active",
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [apiFilters, setApiFilters] = useState({});
  
const [selectedRows, setSelectedRows] = useState([]);
  const [link]= useState(`/office-expense/expense_records`)

const mode = location.hash.replace("#", "");
const addExpenseModelOpen = mode === "add" ;

const handleAdd = () => {
//   setEditedVehicle(null);          
  navigate("/app/office-expense#add");   
};
// const handleEdit = (row) => {
// //   setEditedVehicle(row);          
//   navigate("/app/vehicles#edit"); 
// };

  const handleToggleSidebar = () => {
    if (addExpenseModelOpen) {
      navigate("/app/office-expense");
    } else {
      navigate("/app/office-expense#add");
    }
  };
   const { data, isLoading, isFetching } = useQuery({
    queryKey: ["office-expenses", page, perPage,apiFilters],
    queryFn:  fetchOfficeExpenses,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const officeExpenseData = data?.docs || [];
  const totalPages = data?.pages || 1;
    const totalEntries = data?.docsCount || 10



  

  


  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]   px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-xl font-medium text-black tracking-tight">
            All Expenses
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ExportButton selectedRows={selectedRows} apiFilters={apiFilters} linkRecord={link}/>

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
              <button onClick={handleAdd} className="flex justify-center items-center gap-x-2">
                <Plus size={18} className="stroke-[2.5]" />
                <span>Add Expense</span>
              </button>
            )}
          </button>
        </div>
      </div>

     

      <div
        className={`w-full flex flex-col-reverse lg:flex-row  ${addExpenseModelOpen ? "gap-6" : ""} items-start`}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            addExpenseModelOpen ? "w-full lg:w-[65%] shrink-0" : "w-full"
          }`}
        >
          <AllExpenses  
            addModelOpen={handleToggleSidebar}
            officeExpenseData={officeExpenseData}
            isLoading={isLoading || isFetching}
            page={page}
            setPage={setPage}
            perPage={perPage}
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
              <AddOfficeExpense  />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfficeExpenses;
