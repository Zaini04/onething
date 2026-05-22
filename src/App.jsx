import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/main/AdminLayout";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Vehicles from "./pages/admin/Vehicles";
import EntryVehicles from "./pages/admin/EntryVehicles";
import Clients from "./pages/admin/Clients";
import Vendors from "./pages/admin/Vendors";
import AllSites from "./pages/admin/AllSites";
import FuelCompany from "./pages/admin/FuelCompany";
import   EntryFuels  from "./pages/admin/EntryFuels";
import IncomeTax from "./pages/admin/IncomeTax";
import Settings from "./pages/admin/Settings";
import ScrollToTop from "./hooks/ScrollToTop";
import EntryVehicle from "./components/admin/vehicles/EntryVehicle";
import AddClient from "./components/admin/clients/AddClient";
import AddVendor from "./components/admin/vendors/AddVendor";
import AddSite from "./components/admin/sites/AddSite";

function App() {
  return (
    <>
    <ScrollToTop />
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        
        {/* Admin Dashboard Layout Wrapper */}
        <Route path="/app" element={<AdminLayout />}>
          {/* Default Route: Agar user sirf /app par aaye to dashboard par redirect ho */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Sub-routes under /app/ (Inme dobara /app lagane ki zaroori nahi hoti) */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="entry-vehicles" element={<EntryVehicles />} />
          <Route path="entry-vehicles/entry" element={<EntryVehicle />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/add" element={<AddClient />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path='vendors/add' element={<AddVendor />} />
          <Route path="sites" element={<AllSites />} />
          <Route path="sites/add" element={<AddSite />} />
          <Route path ='fuel-company' element={<FuelCompany />} />
          <Route path ='entry-fuel' element={<EntryFuels />} />
          <Route path ='income-expense' element={<IncomeTax />} />
          <Route path ='settings' element={<Settings />} />
        </Route>

        {/* Catch-all global redirect */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </>
  );
}

export default App;