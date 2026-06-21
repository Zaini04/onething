import { BellRing, Menu, X, ChevronDown } from "lucide-react";
import loginIcon from "../../assets/images/onething.png";
import profile from "../../assets/images/profileImage.jpg";
import { useEffect, useState, useRef } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../auth/LogoutModel";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction";

function AdminHeader({ openSidebar, setOpenSidebar }) {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const user = useSelector(state => state.auth.user)


  
const dispatch = useDispatch()
  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    dispatch(logoutUser(navigate))
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(false);
      setShowProfileDropdown(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpenSidebar]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleProfile = ()=>{
    setShowProfileDropdown(false)
    navigate('/app/profile')
  }

  return (
    <div className="flex flex-col w-full sticky top-0 z-50 bg-white shadow-sm">
      <div className="w-[98%]">
        <div className="flex justify-between items-center h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="md:hidden mr-3 z-50 cursor-pointer text-black">
              {openSidebar ? (
                <X onClick={() => setOpenSidebar(false)} size={24} />
              ) : (
                <Menu onClick={() => setOpenSidebar(true)} size={24} />
              )}
            </div>

            <img className="w-5 h-5" src={loginIcon} alt="Login Icon " />
            <p className="font-bold text-[16px] mt-1 ">onething.</p>
          </div>

          <div
            className="flex justify-center items-center gap-x-3 relative"
            ref={dropdownRef}
          >
            <div className="rounded-[50%] border-2 border-white p-3">
              <BellRing size={20} className="text-[#379756] cursor-pointer " />
            </div>

            <div className="hidden sm:flex items-center gap-x-3">
              <div className="flex justify-start items-center bg-white rounded-full gap-x-2 px-1 py-1">
                <img
                  src={user?.image || profile}
                  alt="Profile"
                  className="rounded-[50%] w-10 h-10"
                />
                <p className="flex flex-col">
                  <span className="font-semibold text-sm">{user?.username}</span>
                  <span className="text-xs font-normal text-[#1A1C1E99] pr-3">
                    {user?.email}
                  </span>
                </p>
              </div>

              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="group flex justify-center text-red-500 text-xs items-center gap-2 hover:bg-red-400 hover:text-white cursor-pointer p-2 rounded-xl transition-all duration-300"
              >
                <svg
                  className="w-[18px] h-[18px] transition-transform duration-300 ease-in-out group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                >
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
              </button>
            </div>

            <div
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex sm:hidden items-center gap-x-1 cursor-pointer p-1 rounded-full hover:bg-gray-50 transition-colors"
            >
              <img
                src={user?.image || profile}
                alt="Profile"
                className="rounded-full w-9 h-9 border border-gray-100"
              />
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform duration-200 ${showProfileDropdown ? "rotate-180" : ""}`}
              />
            </div>

            {showProfileDropdown && (
              <div className="absolute right-0 top-14 bg-white border border-gray-100 shadow-xl rounded-2xl pt-4 w-52 flex flex-col gap-y-1 sm:hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col border-b border-gray-200 px-3.5  ">
                  <span className="font-semibold text-sm text-gray-900">
                    {user?.username}
                  </span>
                  <span className="text-xs text-gray-400 truncate mt-0.5">
                  {user?.email}
                  </span>

                </div>
                  <button onClick={handleProfile} className=" group w-full flex items-center justify-between font-medium  text-sm text-black  text-left py-2 px-3.5 cursor-pointer border-b border-b-gray-200 hover:bg-gray-50 transition-colors
                  ">
                  <span className="text-[13px]">Profile</span>
                   <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 8C15.5 5.23858 13.2614 3 10.5 3C7.73858 3 5.5 5.23858 5.5 8C5.5 10.7614 7.73858 13 10.5 13C13.2614 13 15.5 10.7614 15.5 8Z"
          stroke="currentColor"
          stroke-width="1.3"
          strokeMiterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.5 20C3.5 16.134 6.63401 13 10.5 13C11.775 13 12.9704 13.3409 14 13.9365"
          stroke="currentColor"
          strokeMiterlimit="10"
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.1887 14.9339L19.5661 14.3113C19.151 13.8962 18.478 13.8962 18.0629 14.3113L14.7141 17.6601C14.269 18.1052 13.9656 18.6722 13.8421 19.2895L13.5 21L15.2105 20.6579C15.8278 20.5344 16.3948 20.231 16.8399 19.7859L20.1887 16.4371C20.6038 16.022 20.6038 15.349 20.1887 14.9339Z"
          stroke="currentColor"
          stroke-width="1.3"
          strokeMiterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
                  </button>

                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="group w-full flex items-center justify-between text-red-500 text-xs font-semibold p-3.5 rounded-b-xl hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <span className="text-[13px]">Logout</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 ease-in-out rotate-180 group-hover:rotate-360"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
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
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-16 bg-black/40 z-40 md:hidden transition-opacity duration-300 pointer-events-none ${
          openSidebar ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        onClick={() => setOpenSidebar(false)}
      />

      <AdminSidebar
        isMobile={true}
        isOpen={openSidebar}
        onClose={() => setOpenSidebar(false)}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

export default AdminHeader;
