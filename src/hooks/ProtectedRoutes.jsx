import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

 const hasRoutePermission = (user, requiredMenu) => {
  if (!user) return false;
  
  if (user.isSuperAdmin === true || user.role?.name === "superadmin") return true;

  const permissionsArray = user.role?.permissions;

  if (Array.isArray(permissionsArray)) {
    return permissionsArray.some(
      (perm) => perm.menu === requiredMenu && perm.actions?.view === true
    );
  }

  return false;
};

export default function ProtectedRoute({ requiredMenu }) {
  const user = useSelector((state) => state.auth.user); 

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredMenu && !hasRoutePermission(user, requiredMenu)) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}