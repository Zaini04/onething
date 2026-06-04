import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEntryVehicleById } from "../../redux/slices/entryVehiclesSlice";
import { setvehicleLedgerById } from "../../redux/slices/vehicleLedgerSlice";

export default function ViewButton({ row, type = "entry-vehicle" }) {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleOpenModal = (e) => {
    e.stopPropagation();

    if (type === "entry-vehicle") {
      dispatch(setEntryVehicleById(row.id));
    }
    else if (type === "vehicle-ledger") { dispatch(setvehicleLedgerById(row.id)); }

    setSearchParams({ modal: "view", id: String(row.id), type: type });
  };

  return (
    <button 
      onClick={handleOpenModal}
      type="button"
      className="inline-block text-left cursor-pointer px-2 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-300 w-full transition-colors"
    >
      View
    </button>
  );
}