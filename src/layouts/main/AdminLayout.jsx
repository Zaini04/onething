import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  Outlet,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import PaymentReceivedModel from "../../components/global/PaymentReceivedModel";
import GenerateBillModal from "../../components/global/GenerateBillModel";
import ViewDetailsModal from "../../components/global/ViewDetailsModel";
import { clearSelectedEntryVehicle } from "../../redux/slices/entryVehiclesSlice";
import { clearSelectedVehicleLeger } from "../../redux/slices/vehicleLedgerSlice";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentModal = searchParams.get("modal");
  const dataType = searchParams.get("type");

  const handleCloseModal = () => {
    if (dataType === "entry-vehicle") {
      dispatch(clearSelectedEntryVehicle());
    } else if (dataType === "vehicle-ledger") {
      dispatch(clearSelectedVehicleLeger());
    }

    navigate(location.pathname + location.hash, { replace: true });
  };

  const handleConfirmAction = (data) => {
    console.log(`Action confirmed for ${currentModal}:`, data);
    handleCloseModal();
  };

  return (
    <div>
      <AdminHeader openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex items-start">
        {openSidebar && (
          <div
            className="fixed inset-0 top-16 bg-black/40 z-20 md:hidden block transition-opacity duration-300"
            onClick={() => setOpenSidebar(false)}
          />
        )}
        <AdminSidebar />
        <Outlet />
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

export default AdminLayout;
