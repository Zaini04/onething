import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div>
      <AdminHeader openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex items-start justify-end  ">
        {openSidebar && (
          <div
            className="fixed inset-0 top-16 bg-black/40 z-20 md:hidden block transition-opacity duration-300"
            onClick={() => setOpenSidebar(false)}
          />
        )}
        <AdminSidebar />
        
        {/* Child pages (jaise EntryVehicles) yahan render hoti hain */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;