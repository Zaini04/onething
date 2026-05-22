import {  AlertCircle } from "lucide-react";
import { createPortal } from "react-dom"; // 1. Ye import karein

function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  // 2. Pure UI ko createPortal ke andar wrap kar dein
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* --- BACKGROUND OVERLAY WITH BLUR --- */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose} 
      />

      {/* --- CENTRAL MODAL CARD --- */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[320px] flex flex-col items-center text-center z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Warning Icon Container */}
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
          <AlertCircle size={28} className="stroke-[1.8]" />
        </div>

        {/* Modal Texts */}
        <h2 className="text-xl font-medium text-gray-900 tracking-tight mb-2">
          Logout
        </h2>
        <p className="text-sm font-normal text-gray-500 px-4 mb-6 leading-relaxed">
          Are you sure you want to logout?
        </p>

        {/* Action Buttons Layout */}
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 px-4 bg-[#FF6B6B] hover:bg-red-500 text-white font-medium text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-red-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body // 3. Target body element
  );
}

export default LogoutModal;