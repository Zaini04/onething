import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ClientCard from "../../components/admin/clients/ClientCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClientRecordTable from "../../components/admin/companyRecords/ClientRecordTable";
import ExportButton from "../../components/global/ExportButton";
import { Plus } from "lucide-react";
import {  fetchCompanyRecord } from "../../redux/actions/companyRecordsAction";
import SearchFilters from "../../components/global/SearchFilter";
import { useSiteMaterials } from "../../redux/actions/siteAction";

export default function CompanyRecordsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

    const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

const [selectedRows, setSelectedRows] = useState([]);
  const [apiFilters, setApiFilters] = useState({});
  const [filters, setFilters] = useState({ site: "", from: "",   to: "",   });
  const [link]= useState(`/company-records/client_records/${id}`)




    const { data:companyData, isLoading:companyDataLoading } = useQuery({
    queryKey: ["company-records", page, perPage,apiFilters,id],
    queryFn:  fetchCompanyRecord,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const companyRecordData = companyData?.docs || [];
  const totalPages = companyData?.pages || 1;
  const totalEntries = companyData?.docsCount || 10

  const clientId = id
  const { data: siteMaterials } = useSiteMaterials(clientId);
    const siteOptions = siteMaterials?.map((s) => ({ id: s.siteName, name: s.siteName })) || [];

    console.log("so",siteOptions)

    



  const clientVendorConfig = [
    {
      name: "site",
      type: "select",
      searchable: true,
      placeholder: "site",
      options: siteOptions,
    },
   {
      name: "dateRange", 
      type: "date-range", // 👈 Custom Type
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
    const payload = {
      site: filters.site,
      from: filters.from,
      to: filters.to
    };
    console.log("Submitting Range Filters to API:", payload);
    setApiFilters(payload);
  };

  
 


  return (
    <div className="md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="flex flex-col xs:flex-row justify-between items-center text-gray-900 tracking-tight mb-4">
        <div>
          <h2 className="text-xl font-medium text-black">Company Details</h2>
        </div>
       
        <div className="flex items-center gap-3 w-full sm:w-auto">
             <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaArrowLeft
            className="cursor-pointer bg-white p-2 rounded-xl w-12 h-9 border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95"
            size={20}
          />
        </button>
          
              <ExportButton  selectedRows={selectedRows} apiFilters={apiFilters} linkRecord={link} />

            <button
              onClick={() => navigate(`/app/company-records/add/${id}`)} // Clean page navigation route
              type="button"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-gray-200"
            >
              <Plus size={18} className="stroke-[2.5]" />
              <span>Add Record</span>
            </button>
          </div>

      </div>

      <ClientCard />

      <div className="w-full mt-4">
          <SearchFilters
            config={clientVendorConfig}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSubmit={handleSearchSubmit}
          />
        </div>



      <div className="mt-4">
        <ClientRecordTable
        entryVehicleData ={companyRecordData}
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
