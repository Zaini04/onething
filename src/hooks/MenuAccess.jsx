export const hasMenuAccess = (user, menuId) => {
  if (user?.isSuperAdmin) return true;

  return user?.role?.permissions?.some(
    (perm) => perm.menu === menuId
  );
};