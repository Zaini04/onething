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
import VehicleDetails from "./pages/admin/VehicleDetails";
import ClientDetails from "./pages/admin/ClientDetails";
import {ToastContainer} from "react-toastify";
import Users from "./pages/admin/Users";
function App() {
  return (
    <>
          <ToastContainer 
          position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <ScrollToTop />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        
        <Route path="/app" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="entry-vehicles" element={<EntryVehicles />} />
          <Route path="entry-vehicles/entry" element={<EntryVehicle />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/add" element={<AddClient />} />
          <Route path="clients/edit" element={<AddClient />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path='vendors/add' element={<AddVendor />} />
          <Route path="sites" element={<AllSites />} />
          <Route path="sites/add" element={<AddSite />} />
          <Route path="sites/edit" element={<AddSite />} />
          <Route path ='fuel-company' element={<FuelCompany />} />
          <Route path ='entry-fuel' element={<EntryFuels />} />
          <Route path ='income-expense' element={<IncomeTax />} />
          <Route path ='users' element={<Users />} />
          <Route path ='settings' element={<Settings />} />
          <Route path="vehicles/:id" element={<VehicleDetails />} />
          <Route path="clients/:id" element={<ClientDetails />} />
        </Route>

        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </>
  );
}

export default App;