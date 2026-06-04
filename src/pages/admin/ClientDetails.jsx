import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { clientInitialData } from "../../assets/mockData";
import ClientCard from "../../components/admin/clients/ClientCard";
import { useState } from "react";
import ClientEntryTable from "../../components/admin/clients/ClientEntryTable";
import ClientSitesTable from "../../components/admin/clients/ClientSitesTable";
import Ledger from "../../components/admin/clients/Ledger";
import Billings from "../../components/admin/clients/Billings";

export default function ClientDetails() {
  const { id } = useParams();
  const [entryTable, setEntryTable] = useState(true);
  const [siteModel, setSiteModel] = useState(false);
  const [ledgerModel, setLedgerModel] = useState(false);
  const [billingModel, setBillingModel] = useState(false);

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

  const client = clientInitialData.find((item) => item.id === Number(id));

  return (
    <div className="w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
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

      <ClientCard client={client} />

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
        {entryTable && <ClientEntryTable />}
        {siteModel && <ClientSitesTable />}
        {ledgerModel && <Ledger />}
        {billingModel && <Billings />}
      </div>
    </div>
  );
}
