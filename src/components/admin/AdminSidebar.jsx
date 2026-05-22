import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Hook imported here
import LogoutModal from "../auth/LogoutModel";

function AdminSidebar({ isMobile = false, isOpen = false, onClose }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // URL track karne ke liye hook initialized

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    navigate("/auth/login");
  };

  const handleMobileLogoutClick = () => {
    if (onClose) onClose();
    setIsLogoutModalOpen(true);
  };

  // --- CONFIGURING THE TOOLTIP CLASS ---
  const tooltipClass =
    "absolute left-16 z-[100000] scale-0 group-hover:scale-100 bg-black text-white text-xs font-semibold px-3 py-2 rounded-md shadow-lg transition-all duration-150 origin-left whitespace-nowrap pointer-events-none";

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      link: "/app/dashboard",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "vehicles",
      label: "Vehicles",
      link: "/app/vehicles",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M7 20C8.10457 20 9 19.1046 9 18C9 16.8954 8.10457 16 7 16C5.89543 16 5 16.8954 5 18C5 19.1046 5.89543 20 7 20Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M19 11H22V13C22 15.357 22 16.5355 21.2678 17.2678C20.7809 17.7546 20.0967 17.9178 19 17.9724M5 17.9724C3.90328 17.9178 3.2191 17.7546 2.73223 17.2678C2 16.5355 2 15.357 2 13V9C2 6.64298 2 5.46447 2.73223 4.73223C3.46447 4 4.64298 4 7 4H10.3C11.4168 4 11.9752 4 12.4271 4.14683C13.3404 4.44358 14.0564 5.15964 14.3532 6.07295C14.5 6.52485 14.5 7.08323 14.5 8.2C14.5 9.42079 14.5 10.0312 14.1657 10.444C14.0998 10.5254 14.0254 10.5998 13.944 10.6657C13.5312 11 12.9208 11 11.7 11H8M15 18H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 6H16.3212C17.7766 6 18.5042 6 19.0964 6.35371C19.6886 6.70742 20.0336 7.34811 20.7236 8.6295L22 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "entry-vehicle",
      label: "Entry Vehicle",
      link: "/app/entry-vehicles",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M7 20C8.10457 20 9 19.1046 9 18C9 16.8954 8.10457 16 7 16C5.89543 16 5 16.8954 5 18C5 19.1046 5.89543 20 7 20Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M19 11H22V13C22 15.357 22 16.5355 21.2678 17.2678C20.7809 17.7546 20.0967 17.9178 19 17.9724M5 17.9724C3.90328 17.9178 3.2191 17.7546 2.73223 17.2678C2 16.5355 2 15.357 2 13V9C2 6.64298 2 5.46447 2.73223 4.73223C3.46447 4 4.64298 4 7 4H10.3C11.4168 4 11.9752 4 12.4271 4.14683C13.3404 4.44358 14.0564 5.15964 14.3532 6.07295C14.5 6.52485 14.5 7.08323 14.5 8.2C14.5 9.42079 14.5 10.0312 14.1657 10.444C14.0998 10.5254 14.0254 10.5998 13.944 10.6657C13.5312 11 12.9208 11 11.7 11H8M15 18H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 6H16.3212C17.7766 6 18.5042 6 19.0964 6.35371C19.6886 6.70742 20.0336 7.34811 20.7236 8.6295L22 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "clients",
      label: "Clients",
      link: "/app/clients", 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.9702 14.44C18.3402 14.67 19.8502 14.43 20.9102 13.72C22.3202 12.78 22.3202 11.24 20.9102 10.3C19.8402 9.59001 18.3102 9.35 16.9402 9.59" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59001 5.65994 9.35 7.02994 9.59" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.0001 14.63C11.9401 14.62 11.8701 14.62 11.8101 14.63C10.4301 14.58 9.33008 13.45 9.33008 12.05C9.33008 10.62 10.4801 9.47 11.9101 9.47C13.3401 9.47 14.4901 10.63 14.4901 12.05C14.4801 13.45 13.3801 14.59 12.0001 14.63Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "vendors",
      label: "Vendors",
      link: "/app/vendors", 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51001 10.9402 9.51001 10.0202C9.51001 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 3V7H21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L17 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "sites",
      label: "Sites",
      link: "/app/sites",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5.1499 2V22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.1499 4H16.3499C19.0499 4 19.6499 5.5 17.7499 7.4L16.5499 8.6C15.7499 9.4 15.7499 10.7 16.5499 11.4L17.7499 12.6C19.6499 14.5 18.9499 16 16.3499 16H5.1499" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "fuel-company",
      label: "Fuel Company",
      link: "/app/fuel-company",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M10.4626 13L9.06858 14.8124C8.91919 15.0066 9.02626 15.2861 9.26987 15.3378L10.7301 15.6477C10.9899 15.7028 11.0889 16.0122 10.9073 16.2011L9.17773 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 10H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 21V9C4 6.17157 4 4.75736 4.87868 3.87868C5.75736 3 7.17157 3 10 3C12.8284 3 14.2426 3 15.1213 3.87868C16 4.75736 16 6.17157 16 9V21H4Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M2 21H18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 14H17.6667C17.9767 14 18.1317 14 18.2588 14.0341C18.6039 14.1265 18.8735 14.3961 18.9659 14.7412C19 14.8683 19 15.0233 19 15.3333V16.5C19 17.3284 19.6716 18 20.5 18C21.3284 18 22 17.3284 22 16.5V10.2111C22 9.60998 22 9.30941 21.9142 9.02598C21.8284 8.74255 21.6616 8.49247 21.3282 7.9923L20.5547 6.83205C20.2082 6.31223 19.6247 6 19 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "entry-fuel",
      label: "Entry Fuel",
      link: "/app/entry-fuel",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51001 10.9402 9.51001 10.0202C9.51001 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 3V7H21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L17 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "income-expense",
      label: "Income/Expense",
      link: "/app/income-expense",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 13H12" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 17H16" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
  id: "settings",
  label: "settings",
  link: "/app/settings",
  icon: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M20.7906 9.15201C21.5969 10.5418 22 11.2366 22 12C22 12.7634 21.5969 13.4582 20.7906 14.848L18.8669 18.1638C18.0638 19.548 17.6623 20.2402 17.0019 20.6201C16.3416 21 15.5402 21 13.9373 21H10.0627C8.45982 21 7.6584 21 6.99807 20.6201C6.33774 20.2402 5.93619 19.548 5.13311 18.1638L3.20942 14.848C2.40314 13.4582 2 12.7634 2 12C2 11.2366 2.40314 10.5418 3.20942 9.152L5.13311 5.83621C5.93619 4.45196 6.33774 3.75984 6.99807 3.37992C7.6584 3 8.45982 3 10.0627 3H13.9373C15.5402 3 16.3416 3 17.0019 3.37992C17.6623 3.75984 18.0638 4.45197 18.8669 5.83622L20.7906 9.15201Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}
  ];

  const handleActions = (item) => {
    if (onClose) onClose();
  

  navigate(item.link);  };

  // --- MOBILE SIDEBAR LAYOUT ---
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
                // Dynamically checking URL path for Active match
                const isActive = location.pathname === item.link ||   location.pathname.startsWith(`${item.link}/`);

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
                    <div className={isActive ? "text-white" : "text-gray-500 group-hover:text-white transition duration-200"}>
                      {item.icon}
                    </div>
                    <span className="text-[13px] tracking-wide">{item.label}</span>
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
                  <path d="M12.0526 21C16.9941 21 21 16.9706 21 12C21 7.02944 16.9941 3 12.0526 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 8C7 8 3 10.946 3 12C3 13.0541 7 16 7 16M3.5 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

  // --- DESKTOP SIDEBAR LAYOUT ---
  return (
    <div className="hidden z-40 w-16 sticky top-24 left-2 mt-16 ml-2 py-4 mb-6 rounded-full bg-white shadow-md md:flex flex-col items-center gap-y-3">
      {menuItems.map((item) => {
        // Dynamically checking URL path for Active match
                const isActive = location.pathname === item.link  ||  location.pathname.startsWith(`${item.link}/`); // For handling array links like entry-vehicle

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
          <path d="M12.0526 21C16.9941 21 21 16.9706 21 12C21 7.02944 16.9941 3 12.0526 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 8C7 8 3 10.946 3 12C3 13.0541 7 16 7 16M3.5 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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