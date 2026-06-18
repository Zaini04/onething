import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchFilters from "../../components/global/SearchFilter";
import ExportButton from "../../components/global/ExportButton";
import AllSitesTable from "../../components/admin/sites/AllSitesTable";
import { fetchSites } from "../../redux/actions/siteAction";
import { useQuery } from "@tanstack/react-query";

function AllSites() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [status, setStatus] = useState('');
  const [apiFilters, setApiFilters] = useState({});

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["sites", page, perPage, apiFilters],
    queryFn: fetchSites,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  });

  const sites = data?.docs || [];
  const totalPages = data?.pages || 1;
  const totalEntries = data?.docsCount || 10


  const clientVendorConfig = [
    {
      name: "siteName",
      type: "select",
      placeholder: "Enter Site Name",
      searchable: true,
      options: [
        'ali','niazi','ghm'
      ],
    },

    {
      name: "date",
      type: "date",
      placeholder: "Date",
      options: [
        { label: "Today", value: "today" },
        { label: "Yesterday", value: "yesterday" },
        { label: "This Week", value: "this_week" },
      ],
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Blocked", value: "Blocked" },
        { label: "Deleted", value: "Deleted" },
      ],
    },
  ];

  const [filters, setFilters] = useState({ siteName: "", date: "", status: "" });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (finalFilters) => {
    console.log("Fetching Entry Vehicles data with fields:", finalFilters);
     setApiFilters(finalFilters);
    setPage(1);
  };

   const handleEdit = (row)=>{
    navigate(`/app/sites/edit`, { state: { siteData: row } });
  }
  return (
    <div className="md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-hidden">
      <div className="w-full flex flex-col  animate-in fade-in duration-200">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <h1 className="text-xl font-medium text-black tracking-tight">
              All Sites
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <ExportButton />

            <button
              onClick={() => navigate("/app/sites/add")}
              type="button"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-gray-200"
            >
              <Plus size={18} className="stroke-[2.5]" />
              <span>Add Site</span>
            </button>
          </div>
        </div>

        <div className="w-full">
          <SearchFilters
            config={clientVendorConfig}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSubmit={handleSearchSubmit}
          />
        </div>

        <div className="w-full ">
          <AllSitesTable 
          setEditedSite={handleEdit}
            sitesData={sites} 
            isLoading={isLoading || isFetching} 
            page={page} 
            perPage={perPage}
            setPage={setPage} 
            setPerPage={setPerPage}
            totalPages={totalPages}
            totalEntries = {totalEntries}
          />
        </div>
      </div>
    </div>
  );
}

export default AllSites;
