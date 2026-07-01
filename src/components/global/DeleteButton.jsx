import { useState } from "react";
import DeleteModel from "./DeleteModel";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastError } from "../../hooks/toastError";

function DeleteButton({ row, deleteFn, queryKey, title = "Delete Item" }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return await deleteFn(row._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(`${title.replace("Delete ", "")} deleted successfully!`);
      setIsDeleteModalOpen(false);
    },
    onError: (error) => {
      console.error(`Error deleting item:`, error);
      toastError(error)
      setIsDeleteModalOpen(false);
    },
  });

  return (
    <>
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        type="button"
        title={title}
        disabled={deleteMutation.isLoading}
        className="w-7 h-7 flex items-center justify-center bg-[#FEE2E2] hover:bg-[#FEE2E2]/90 text-[#DC2626] rounded-lg transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
      >
        {deleteMutation.isLoading ? (
          <span className="w-3 h-3 border-2 border-[#DC2626]/20 border-t-[#DC2626] rounded-full animate-spin"></span>
        ) : (
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
        )}
      </button>

      <DeleteModel
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}

export default DeleteButton;