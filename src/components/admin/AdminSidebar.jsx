import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutModal from "../auth/LogoutModel";
import { menuItems } from "../../constants/Sidebar";

function AdminSidebar({ isMobile = false, isOpen = false, onClose }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    navigate("/auth/login");
  };

  const handleMobileLogoutClick = () => {
    if (onClose) onClose();
    setIsLogoutModalOpen(true);
  };

  const tooltipClass =
    "absolute left-16 z-[100000] scale-0 group-hover:scale-100 bg-black text-white text-xs font-semibold px-3 py-2 rounded-md shadow-lg transition-all duration-150 origin-left whitespace-nowrap pointer-events-none";

  const handleActions = (item) => {
    if (onClose) onClose();

    navigate(item.link);
  };

  if (isMobile) {
    return (
      <>
        <div
          className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white flex flex-col p-4 shadow-2xl border-r border-gray-100 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-y-1.5 w-full h-full">
            <div className="flex flex-col gap-y-1.5 w-full">
              {menuItems.map((item) => {
                const isActive =
                  location.pathname === item.link ||
                  location.pathname.startsWith(`${item.link}/`);

                return (
                  <div
                    key={item.id}
                    className={`w-full flex items-center gap-x-4 px-4 py-3.5 font-normal rounded-xl transition duration-200 cursor-pointer group ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-black hover:text-white"
                    }`}
                    onClick={() => handleActions(item)}
                  >
                    <div
                      className={
                        isActive
                          ? "text-white"
                          : "text-gray-500 group-hover:text-white transition duration-200"
                      }
                    >
                      {item.icon}
                    </div>
                    <span className="text-[13px] tracking-wide">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <hr className="w-full border-gray-100 my-3" />

            <div
              className="w-full flex items-center gap-x-4 px-4 py-3.5 text-red-500 font-medium rounded-xl transition duration-200 hover:bg-red-500 hover:text-white group cursor-pointer mt-auto"
              onClick={handleMobileLogoutClick}
            >
              <div className="text-red-500 group-hover:text-white transition duration-200">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12.0526 21C16.9941 21 21 16.9706 21 12C21 7.02944 16.9941 3 12.0526 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 8C7 8 3 10.946 3 12C3 13.0541 7 16 7 16M3.5 12H15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[15px] tracking-wide">Logout</span>
            </div>
          </div>
        </div>

        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogoutConfirm}
        />
      </>
    );
  }

  return (
    <div className="hidden z-40 w-16 sticky top-24 left-2 mt-16 ml-2 py-4 mb-6 rounded-full bg-white shadow-md md:flex flex-col items-center gap-y-3">
      {menuItems.map((item) => {
        const isActive =
          location.pathname === item.link ||
          location.pathname.startsWith(`${item.link}/`);

        return (
          <div
            onClick={() => handleActions(item)}
            key={item.id}
            className={`group relative p-3 rounded-full transition cursor-pointer flex items-center justify-center ${
              isActive
                ? "bg-black text-white"
                : "text-black hover:bg-black hover:text-white"
            }`}
          >
            {item.icon}
            <span className={tooltipClass}>{item.label}</span>
          </div>
        );
      })}

      <hr className="w-8 border-gray-100 my-1" />

      <div
        className="group relative p-3 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition cursor-pointer flex items-center justify-center"
        onClick={() => setIsLogoutModalOpen(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12.0526 21C16.9941 21 21 16.9706 21 12C21 7.02944 16.9941 3 12.0526 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 8C7 8 3 10.946 3 12C3 13.0541 7 16 7 16M3.5 12H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={`${tooltipClass} bg-red-500`}>Logout</span>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

export default AdminSidebar;
