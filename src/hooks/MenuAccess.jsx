export const hasMenuAccess = (user, menuId) => {
  if (!user) return false;
  if (user.isSuperAdmin === true || user.role?.name === "superadmin") return true;
  
  return user.role?.permissions?.some(
    (perm) => perm.menu === menuId && perm.actions?.view === true
  );
};