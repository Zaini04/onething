import { useSearchParams } from "react-router-dom";

export default function PaymentReceivedButton({ row, type = "entry-vehicle" }) {
  const [, setSearchParams] = useSearchParams();

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setSearchParams({ modal: "payment", id: String(row._id), type: type });
  };

  return (
    <button 
      onClick={handleOpenModal}
      type="button"
      className="inline-block text-left cursor-pointer px-2 py-2 text-xs font-medium text-gray-500 hover:bg-gray-200/50 border-b border-gray-300 w-full"
    >
      Payment Receive
    </button> 
  );
}