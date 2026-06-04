import { useState } from "react";
import DeleteModel from "./DeleteModel";

function DeleteButton({ row }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal state

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);

    console.log("Delete clicked for ID:", row.id);
  };

  return (
    <>
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        type="button"
        title="Delete Vehicle"
        className="w-7 h-7 flex items-center justify-center bg-[#FEE2E2] hover:bg-[#FEE2E2]/90 text-[#DC2626] rounded-lg transition-colors cursor-pointer active:scale-95"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      <DeleteModel
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default DeleteButton;
