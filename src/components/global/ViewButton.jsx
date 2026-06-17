import { useSearchParams } from "react-router-dom";

export default function ViewButton({ row, type = "entry-vehicle" }) {
  const [, setSearchParams] = useSearchParams();

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setSearchParams({ modal: "view", id: String(row._id), type: type });
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