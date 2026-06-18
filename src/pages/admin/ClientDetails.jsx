import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ClientCard from "../../components/admin/clients/ClientCard";
import { useState } from "react";
import ClientEntryTable from "../../components/admin/clients/ClientEntryTable";
import ClientSitesTable from "../../components/admin/clients/ClientSitesTable";
import Ledger from "../../components/admin/clients/Ledger";
import Billings from "../../components/admin/clients/Billings";
import { useQuery } from "@tanstack/react-query";
import {  fetchClientLedger } from "../../redux/actions/clientAction";
import ViewDetailsModal from "../../components/global/ViewDetailsModel";
import GenerateBillModal from "../../components/global/GenerateBillModel";
import PaymentReceivedModel from "../../components/global/PaymentReceivedModel";

export default function ClientDetails() {
  const { id } = useParams();
  const [entryTable, setEntryTable] = useState(true);
  const [siteModel, setSiteModel] = useState(false);
  const [ledgerModel, setLedgerModel] = useState(false);
  const [billingModel, setBillingModel] = useState(false);

    const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);


  const [apiFilters, setApiFilters] = useState({});

    const [searchParams, setSearchParams] = useSearchParams();
  const currentModal = searchParams.get("modal");

  const handleCloseModal = () => {
    // URL ko clean karne ke liye standard tareeqa
    setSearchParams({}, { replace: true });
  };

  const handleConfirmAction = (data) => {
    console.log(`Action confirmed for ${currentModal}:`, data);
    handleCloseModal();
  };

     const { data, isLoading, isFetching } = useQuery({
    queryKey: ["client-ledger", page, perPage,apiFilters,id],
    queryFn:  fetchClientLedger,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const clientLedger = data?.docs || [];
  const totalPages = data?.pages || 1;
  const totalEntries = data?.docsCount || 10



  const changEntryVehicleModel = () => {
    setEntryTable(true);
    setSiteModel(false);
    setLedgerModel(false);
    setBillingModel(false);
  };
  const changSiteModel = () => {
    setEntryTable(false);
    setSiteModel(true);
    setLedgerModel(false);
    setBillingModel(false);
  };
  const changLedgerModel = () => {
    setEntryTable(false);
    setSiteModel(false);
    setLedgerModel(true);
    setBillingModel(false);
  };
  const changBillingModel = () => {
    setEntryTable(false);
    setSiteModel(false);
    setLedgerModel(false);
    setBillingModel(true);
  };
  const navigate = useNavigate();


  return (
    <div className="md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="flex justify-between items-center text-gray-900 tracking-tight mb-4">
        <div>
          <h2 className="text-xl font-medium text-black">Client Details</h2>
        </div>
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
      </div>

      <ClientCard client={clientLedger} />

      <div className=" mt-4  ">
        <div className="flex text-xs items-center gap-x-6 gap-y-4 mb-4 bg-gray-200 py-0.5  px-4 rounded-xl">
          <button
            onClick={changEntryVehicleModel}
            className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer ${entryTable ? "font-semibold border-b-2 border-black text-black" : ""}`}
          >
            Entry Vehicles
          </button>
          <button
            onClick={changSiteModel}
            className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer ${siteModel ? "font-semibold border-b-2 border-black text-black" : ""}`}
          >
            Sites{" "}
          </button>
          <button
            onClick={changLedgerModel}
            className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer ${ledgerModel ? "font-semibold border-b-2 border-black text-black" : ""}`}
          >
            Ledger
          </button>
          <button
            onClick={changBillingModel}
            className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer ${billingModel ? "font-semibold border-b-2 border-black text-black" : ""}`}
          >
            Billings
          </button>
        </div>
        {entryTable && <ClientEntryTable  clientLedgerData={clientLedger}
            isLoading={isLoading || isFetching}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            totalPages={totalPages}  />}
        {siteModel && <ClientSitesTable />}
        {ledgerModel && <Ledger  clientLedgerData={clientLedger}
            isLoading={isLoading || isFetching}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            totalPages={totalPages}  />}
        {billingModel && <Billings   clientLedgerData={clientLedger}
            isLoading={isLoading || isFetching}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            totalPages={totalPages} 
            totalEntries = {totalEntries}

            />}
      </div>

      <PaymentReceivedModel
                    isOpen={currentModal === "payment"}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmAction}
                  />
            
                  <GenerateBillModal
                    isOpen={currentModal === "bill"}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmAction}
                  />
            
                  <ViewDetailsModal
                    isOpen={currentModal === "view"}
                    onClose={handleCloseModal}
                    title="Details View"
                    />
    </div>
  );
}
