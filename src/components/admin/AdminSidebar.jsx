import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import LogoutModal from "../auth/LogoutModel";
import { menuItems } from "../../constants/Sidebar";
import { hasMenuAccess } from "../../hooks/MenuAccess";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction";

function SidebarItem({ item, isActive, onClick }) {
  const ref = useRef(null);
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="relative w-fit ml-1 flex items-center justify-center py-3 px-3 transition-all duration-200 cursor-pointer flex-shrink-0"
    >
      <div className="flex items-center gap-2.5">
        {item.icon}
        <p className="text-xs font-medium">{item.label}</p>
      </div>
    </div>
  );
}

function LogoutItem({ onClick }) {
  const ref = useRef(null);
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="relative w-full ml-1 flex items-center justify-center p-3 text-red-600 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 cursor-pointer flex-shrink-0"
    >
      <div className="flex items-center gap-2.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12.0526 21C16.9941 21 21 16.9706 21 12C21 7.02944 16.9941 3 12.0526 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 8C7 8 3 10.946 3 12C3 13.0541 7 16 7 16M3.5 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-sm font-medium">Logout</p>
      </div>
    </div>
  );
}

function CustomScrollbar({ scrollRef, isVisible }) {
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!el || !thumb || !track) return;

    const updateThumb = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight <= clientHeight) {
        thumb.style.opacity = "0";
        return;
      }
      const trackH = track.clientHeight;
      const thumbH = Math.max(24, (clientHeight / scrollHeight) * trackH);
      const maxScroll = scrollHeight - clientHeight;
      const maxTop = trackH - thumbH;
      const top = (scrollTop / maxScroll) * maxTop;
      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${top}px)`;
    };

    el.addEventListener("scroll", updateThumb);
    updateThumb();

    const onMouseDown = (e) => {
      isDragging.current = true;
      dragStartY.current = e.clientY;
      dragStartScroll.current = el.scrollTop;
      document.body.style.userSelect = "none";
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const { scrollHeight, clientHeight } = el;
      const trackH = track.clientHeight;
      const thumbH = thumb.clientHeight;
      const maxTop = trackH - thumbH;
      const maxScroll = scrollHeight - clientHeight;
      const delta = e.clientY - dragStartY.current;
      el.scrollTop = dragStartScroll.current + (delta / maxTop) * maxScroll;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
    };

    thumb.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("scroll", updateThumb);
      thumb.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [scrollRef]);

  return (
    <div
      ref={trackRef}
      style={{
        position: "absolute",
        left: "0px",
        top: "8px",
        bottom: "8px",
        width: "2px",
        borderRadius: "999px",
        background: "transparent",
        zIndex: 10,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        ref={thumbRef}
        style={{
          width: "2px",
          borderRadius: "999px",
          background: "#9ca3af",
          cursor: "pointer",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}

function AdminSidebar({ isMobile = false, isOpen = false, onClose }) {
  const user = useSelector((state) => state.auth.user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const scrollRef = useRef(null);
  const hideTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const showScrollbar = () => {
    setScrollbarVisible(true);
    clearTimeout(hideTimer.current);
  };

  const hideScrollbarDelayed = () => {
    hideTimer.current = setTimeout(() => {
      setScrollbarVisible(false);
    }, 1000);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    dispatch(logoutUser(navigate));
  };

  const handleMobileLogoutClick = () => {
    if (onClose) onClose();
    setIsLogoutModalOpen(true);
  };

  const handleActions = (item) => {
    if (item.isHeader) return; // Prevent clicks on non-clickable item headers
    if (onClose) onClose();
    navigate(item.link);
  };

  const filteredMenu = menuItems.filter((item) => hasMenuAccess(user, item.id));

  // --- MOBILE SIDEBAR RENDERING ---
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
              {filteredMenu.map((item) => {
                if (item.isHeader) {
                  return (
                    <div key={item.id} className="w-full flex flex-col mt-2">
                      <div className="w-full flex items-center gap-x-4 px-4 py-2.5 text-gray-400 font-semibold select-none">
                        <div>{item.icon}</div>
                        <span className="text-[12px] uppercase tracking-wider">{item.label}</span>
                      </div>
                      {/* Render Sub Tabs */}
                      <div className="flex flex-col gap-y-1 pl-4 border-l border-gray-100 ml-6 mt-1">
                        {item.subItems?.map((sub) => {
                          const isSubActive = location.pathname === sub.link;
                          return (
                            <div
                              key={sub.id}
                              className={`w-full flex items-center px-4 py-2.5 text-[13px] rounded-xl transition duration-200 cursor-pointer ${
                                isSubActive ? "bg-black text-white" : "text-gray-600 hover:bg-black hover:text-white"
                              }`}
                              onClick={() => {
                                if (onClose) onClose();
                                navigate(sub.link);
                              }}
                            >
                              {sub.label}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                const isActive =
                  location.pathname === item.link ||
                  location.pathname.startsWith(`${item.link}/`);

                return (
                  <div
                    key={item.id}
                    className={`w-full flex items-center gap-x-4 px-4 py-3.5 font-normal rounded-xl transition duration-200 cursor-pointer group ${
                      isActive ? "bg-black text-white" : "text-gray-700 hover:bg-black hover:text-white"
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
              <button onClick={() => setIsLogoutModalOpen(true)} className="text-red-500 group-hover:text-white transition duration-200">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12.0526 21C16.9941 21 21 16.9706 21 12C21 7.02944 16.9941 3 12.0526 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 8C7 8 3 10.946 3 12C3 13.0541 7 16 7 16M3.5 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
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

  // --- DESKTOP SIDEBAR RENDERING ---
  return (
    <div className="hidden md:flex flex-col items-center z-40 w-44 fixed top-16 left-1 h-[90vh] py-3 bg-white shadow-md border border-gray-100 overflow-visible px-1.5">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="relative w-full flex-1 overflow-hidden"
        onMouseEnter={showScrollbar}
        onMouseLeave={hideScrollbarDelayed}
      >
        <CustomScrollbar scrollRef={scrollRef} isVisible={scrollbarVisible} />

        <div
          ref={scrollRef}
          className="no-scrollbar w-full h-full flex flex-col items-center gap-y-2 overflow-y-auto overflow-x-visible"
          onScroll={() => {
            showScrollbar();
            hideScrollbarDelayed();
          }}
        >
          {filteredMenu.map((item) => {
            if (item.isHeader) {
              return (
                <div key={item.id} className="w-full flex flex-col mt-2 px-1">
                  {/* Non-clickable Header Title */}
                  <div className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 font-semibold select-none">
                    {item.icon}
                    <span className="text-[11px] uppercase tracking-wider">{item.label}</span>
                  </div>
                  {/* Dynamic Sub-tab lists */}
                  <div className="flex flex-col gap-y-1.5 pl-3 border-l-2 border-gray-100 ml-5 mt-1">
                    {item.subItems?.map((sub) => {
                      const isSubActive = location.pathname === sub.link;
                      return (
                        <div
                          key={sub.id}
                          onClick={() => navigate(sub.link)}
                          className={`w-full text-left px-3 py-2 text-[11px] font-medium rounded-xl transition duration-200 cursor-pointer truncate ${
                            isSubActive ? "bg-black text-white" : "text-gray-600 hover:bg-black hover:text-white"
                          }`}
                        >
                          {sub.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive =
              location.pathname === item.link ||
              location.pathname.startsWith(`${item.link}/`);
            return (
              <div
                onClick={() => handleActions(item)}
                className={`cursor-pointer rounded-xl ${
                  isActive ? "bg-black text-white" : "text-gray-700 hover:bg-black hover:text-white"
                }`}
                key={item.id}
                style={{ width: "100%" }}
              >
                <SidebarItem
                  item={item}
                  isActive={isActive}
                  onClick={() => handleActions(item)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <hr className="w-full border-gray-100 my-2 flex-shrink-0" />

      <LogoutItem onClick={() => setIsLogoutModalOpen(true)} />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

export default AdminSidebar;