import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/main/AdminLayout";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Vehicles from "./pages/admin/Vehicles";
import EntryVehicles from "./pages/admin/EntryVehicles";
import Clients from "./pages/admin/Clients";
import Vendors from "./pages/admin/Vendors";
import AllSites from "./pages/admin/AllSites";
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
import FuelCompany from "./pages/admin/FuelCompany";
import FuelStock from "./pages/admin/FuelStock";
import ProtectedRoute from './hooks/ProtectedRoutes'
import UserProfile from "./pages/admin/UserProfile";
import EditProfile from "./components/auth/EditProfile";
import UpdatePassword from "./components/auth/UpdatePassword";
import CompanyRecords from "./pages/admin/CompanyRecords";
import CompanyRecordsDetails from "./pages/admin/CompanyRecordsDetails";
import AddCompanyRecord from "./components/admin/companyRecords/AddCompanyRecord";
import OfficeExpenses from "./pages/admin/OfficeExpenses";
import PumpBills from "./pages/admin/PumpBills";
import AddPumpBill from "./components/admin/Fuel/AddPumpBill";
import Employees from "./pages/admin/Employees";
import AddEmployee from "./components/admin/employee/AddEmployee";
import EmployeesBills from "./pages/admin/EmolyeesBills";
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
          
            <Route element={<ProtectedRoute requiredMenu = "dashboard"/>} >
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>
          
            <Route element={<ProtectedRoute requiredMenu = "vehicles"/>} >
              <Route path="vehicles" element={<Vehicles />} />
              <Route path="vehicles/:id" element={<VehicleDetails />} />
            </Route>

            <Route element={<ProtectedRoute requiredMenu = "entry-vehicle"/>} >
              <Route path="entry-vehicles" element={<EntryVehicles />} />
              <Route path="entry-vehicles/entry" element={<EntryVehicle />} />
              <Route path="entry-vehicles/edit" element={<EntryVehicle />} />
            </Route>

            <Route element={<ProtectedRoute requiredMenu = "clients"/>} >
              <Route path="clients" element={<Clients />} />
              <Route path="clients/add" element={<AddClient />} />
              <Route path="clients/edit" element={<AddClient />} />
              <Route path="clients/:id" element={<ClientDetails />} />
            </Route>
            <Route element={<ProtectedRoute requiredMenu = "employee"/>} >
              <Route path="employees" element={<Employees />} />
              <Route path="employees/add" element={<AddEmployee />} />
              <Route path="employees/edit" element={<AddEmployee />} />

            </Route>



            <Route element={<ProtectedRoute requiredMenu = "pump-Bills"/>} >
              <Route path="pump-bills" element={<PumpBills />} />
              <Route path="pump-bills/entry" element={<AddPumpBill />} />
              <Route path="pump-bills/edit" element={<AddPumpBill />} />
            </Route>


            <Route element={<ProtectedRoute requiredMenu = "office-expense"/>} >
              <Route path="office-expense" element={<OfficeExpenses />} />
              
            </Route>

             <Route element={<ProtectedRoute requiredMenu = "company-records"/>} >
              <Route path="company-records" element={<CompanyRecords />} />
              <Route path="company-records/add/:id" element={<AddCompanyRecord />} />
              <Route path="company-records/edit/:id" element={<AddCompanyRecord />} />
              <Route path="company-records/:id" element={<CompanyRecordsDetails />} />
            </Route>

            <Route element={<ProtectedRoute requiredMenu = "vendors"/>} >
              <Route path="vendors" element={<Vendors />} />
              <Route path='vendors/add' element={<AddVendor />} />
            </Route>

            <Route element={<ProtectedRoute requiredMenu = "sites"/>} >
              <Route path="sites" element={<AllSites />} />
              <Route path="sites/add" element={<AddSite />} />
              <Route path="sites/edit" element={<AddSite />} />
            </Route>

            <Route element={<ProtectedRoute requiredMenu = "fuel-company"/>} >
              <Route path ='entry-fuel/fuel-company' element={<FuelCompany />} />
            </Route>

            <Route element={<ProtectedRoute requiredMenu = "fuel-stock"/>} >
              <Route path ='fuel-stock' element={<FuelStock />} />
            </Route>

            <Route element={<ProtectedRoute requiredMenu = "entry-fuel"/>} > 
              <Route path ='entry-fuel' element={<EntryFuels />} />
            </Route> 

            <Route element={<ProtectedRoute requiredMenu = "icome-expense"/>} >
              <Route path ='income-expense' element={<IncomeTax />} />
            </Route>

            <Route element={<ProtectedRoute requiredMenu = "users"/>} >
              <Route path ='users' element={<Users />} />
            </Route>

            <Route element={<ProtectedRoute requiredMenu = "settings"/>} >
              <Route path ='settings' element={<Settings />} />
            </Route>
            <Route element={<ProtectedRoute requiredMenu = "reports"/>} >
              <Route path ='reports/employee-bills' element={<EmployeesBills />} />
              <Route path ='reports/reports/labour-bills' element={<Settings />} />
              <Route path ='reports/reports/company-bills' element={<Settings />} />
            </Route>
           
            <Route element={<ProtectedRoute requiredMenu = "profile"/>} >
              
              {/* <Route path ='profile-edit' element={<UserProfile />} /> */}
              <Route path ='profile-edit' element={<EditProfile />} />
              <Route path ='profile-edit/update-password' element={<UpdatePassword />} />
            </Route>


        </Route>

        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </>
  );
}

export default App;