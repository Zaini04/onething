import { useSearchParams } from "react-router-dom";

export default function GenerateBillButton({ row, type = "entry-vehicle" }) {
  const [, setSearchParams] = useSearchParams();

  const handleOpenModal = (e) => {
    e.stopPropagation();
    // Redux dispatch khatam, sirf URL params change honge
    setSearchParams({ modal: "bill", id: String(row._id), type: type });
  };

  return (
    <button
      onClick={handleOpenModal}
      type="button"
      className="inline-block text-left cursor-pointer px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-300 border-b border-gray-300 w-full"
    >
      Generate Receipt
    </button>
  );
}