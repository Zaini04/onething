import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClientRecordTable from "../../components/admin/companyRecords/ClientRecordTable";
import ExportButton from "../../components/global/ExportButton";
import { Package, Plus, TrendingDown, User } from "lucide-react";
import { fetchCompanyBills, fetchCompanyExpenseSummary } from "../../redux/actions/companyRecordsAction";
import { useClientDropdown } from "../../redux/actions/clientAction";
import SearchFilters from "../../components/global/SearchFilter";
import dayjs from "dayjs";

export default function CompanyBills() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    client: "",
    from: dayjs().startOf("month").format("YYYY-MM-DD"),
    to: dayjs().endOf("month").format("YYYY-MM-DD"),
  });
  const [apiFilters, setApiFilters] = useState({
    client: "",
    from: dayjs().startOf("month").format("YYYY-MM-DD"),
    to: dayjs().endOf("month").format("YYYY-MM-DD"),
  });
  const [link] = useState(`/company-records`);

  const { data: companyData, isLoading: companyDataLoading } = useQuery({
    queryKey: ["company-bills", page, perPage, apiFilters],
    queryFn: fetchCompanyBills,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  });

  const companyRecordData = companyData?.docs || [];
  const totalPages = companyData?.pages || 1;
  const totalEntries = companyData?.docsCount || 10;

  const { data: clientDropDownData } = useClientDropdown();
  const clientOptions = clientDropDownData?.map((v) => ({ id: v._id, name: `${v.name} (${v.phoneNumber || 'No Phone'})` })) || [];

  const { data: summaryData } = useQuery({
    queryKey: ["company-expense-summary", apiFilters.client, apiFilters.from, apiFilters.to],
    queryFn: fetchCompanyExpenseSummary,
    enabled: !!apiFilters.client,
    staleTime: 1000 * 30,
  });

  const clientVendorConfig = [
    {
      name: "client",
      type: "select",
      searchable: true,
      placeholder: "Company Name",
      options: clientOptions,
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
        to: value.to,
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearchSubmit = () => {
    const payload = {
      client: filters.client,
      from: filters.from,
      to: filters.to,
    };
    console.log("Submitting Range Filters to API:", payload);
    setApiFilters(payload);
  };

  const handleEdit = (row) => {
    navigate(`/app/company-records/edit`, { state: { companyRecordData: row } });
  };

  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="flex flex-col xs:flex-row justify-between items-center text-gray-900 tracking-tight mb-4">
        <div>
          <h2 className="text-xl font-medium text-black">Company Bills</h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
         

          <ExportButton selectedRows={selectedRows} apiFilters={apiFilters} linkRecord={link} />

          <button
            onClick={() => navigate(`/app/reports/company-bill/add`)}
            type="button"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-gray-200"
          >
            <Plus size={18} className="stroke-[2.5]" />
            <span>Add Record</span>
          </button>
        </div>
      </div>

      <div className="w-full mt-4">
        <SearchFilters
          config={clientVendorConfig}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleSearchSubmit}
        />
      </div>

      {apiFilters.client && summaryData && (
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={18} className="text-gray-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {summaryData.client.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {summaryData.client.phoneNumber}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(summaryData.period.from).toLocaleDateString("en-GB")} -{" "}
              {new Date(summaryData.period.to).toLocaleDateString("en-GB")}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Package size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Sft This Period</p>
                <p className="text-base font-semibold text-gray-900">
                  {summaryData.totalSft.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50">
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                <TrendingDown size={16} className="text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Amount This Period</p>
                <p className="text-base font-semibold text-red-600">
                  {summaryData.totalSpent.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <ClientRecordTable
          setEditedCompanyRecord={handleEdit}
          companiesRecordsData={companyRecordData}
          isLoading={companyDataLoading}
          page={page}
          perPage={perPage}
          setPage={setPage}
          setPerPage={setPerPage}
          totalPages={totalPages}
          totalEntries={totalEntries}
          setSelectedRows={setSelectedRows}
        />
      </div>
    </div>
  );
}