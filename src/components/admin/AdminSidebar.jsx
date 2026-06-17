import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import LogoutModal from "../auth/LogoutModel";
import { menuItems } from "../../constants/Sidebar";
import { hasMenuAccess } from "../../hooks/MenuAccess";
import { useSelector } from "react-redux";

function FloatingTooltip({ label, anchorRef, color = "black" }) {
  const [pos, setPos] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const show = () => {
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.top + rect.height / 2, left: rect.right + 10 });
      setVisible(true);
    };
    const hide = () => setVisible(false);
    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);
    return () => {
      el.removeEventListener("mouseenter", show);
      el.removeEventListener("mouseleave", hide);
    };
  }, [anchorRef]);

  if (!pos) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        transform: "translateY(-50%)",
        background: color === "red" ? "#ef4444" : "#111",
        color: "#fff",
        fontSize: "12px",
        fontWeight: 500,
        padding: "5px 10px",
        borderRadius: "8px",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s",
      }}
    >
      <span
        style={{
          position: "absolute",
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          borderWidth: "5px",
          borderStyle: "solid",
          borderColor: `transparent ${color === "red" ? "#ef4444" : "#111"} transparent transparent`,
        }}
      />
      {label}
    </div>,
    document.body
  );
}

function SidebarItem({ item, isActive, onClick }) {
  const ref = useRef(null);
  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        className={`relative w-fit ml-1 flex items-center justify-center py-3 px-3 rounded-4xl transition-all duration-200 cursor-pointer flex-shrink-0 ${
          isActive ? "bg-black text-white" : "text-gray-700 hover:bg-black hover:text-white"
        }`}
      >
        <div className="flex items-center justify-center max-w-[20px]">
          {item.icon}
        </div>
      </div>
      <FloatingTooltip label={item.label} anchorRef={ref} />
    </>
  );
}

function LogoutItem({ onClick }) {
  const ref = useRef(null);
  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        className="relative w-full flex items-center justify-center p-3 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition-all duration-200 cursor-pointer flex-shrink-0"
      >
        <div className="flex items-center justify-center min-w-[24px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12.0526 21C16.9941 21 21 16.9706 21 12C21 7.02944 16.9941 3 12.0526 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 8C7 8 3 10.946 3 12C3 13.0541 7 16 7 16M3.5 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <FloatingTooltip label="Logout" anchorRef={ref} color="red" />
    </>
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
        left: "0px",        // bilkul left edge par
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

  const showScrollbar = () => {
    setScrollbarVisible(true);
    clearTimeout(hideTimer.current);
  };

  const hideScrollbarDelayed = () => {
    hideTimer.current = setTimeout(() => {
      setScrollbarVisible(false);
    }, 1000); // 1 second baad hide
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    navigate("/auth/login");
  };

  const handleMobileLogoutClick = () => {
    if (onClose) onClose();
    setIsLogoutModalOpen(true);
  };

  const handleActions = (item) => {
    if (onClose) onClose();
    navigate(item.link);
  };

  const filteredMenu = menuItems.filter((item) => hasMenuAccess(user, item.id));

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
              <div className="text-red-500 group-hover:text-white transition duration-200">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12.0526 21C16.9941 21 21 16.9706 21 12C21 7.02944 16.9941 3 12.0526 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 8C7 8 3 10.946 3 12C3 13.0541 7 16 7 16M3.5 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    <div className="hidden md:flex flex-col items-center z-40 w-16 fixed top-24 left-4 h-[80vh] py-3 rounded-4xl bg-white shadow-md border border-gray-100 overflow-visible px-1.5">

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="relative w-full flex-1 overflow-hidden"
        onMouseEnter={showScrollbar}
        onMouseLeave={hideScrollbarDelayed}
      >
        {/* Custom scrollbar — left edge par, sirf hover/scroll par show */}
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
            const isActive =
              location.pathname === item.link ||
              location.pathname.startsWith(`${item.link}/`);
            return (
              <div key={item.id} style={{ width: "100%" }}>
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