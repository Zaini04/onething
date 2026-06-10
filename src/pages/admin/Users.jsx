import { Plus, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AddUser from "../../components/admin/users/AddUser";
// import {  useSelector } from "react-redux";
import AllUserTable from "../../components/admin/users/AllUserTable";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../redux/actions/superAdminActions";
import { useState } from "react";
import { useSelector } from "react-redux";
function Users() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [editUser, setEditedUser] = useState(null);
  
  const user = useSelector(state => state.auth.user)



const mode = location.hash.replace("#", "");
const addUserModelOpen = mode === "add" || mode === "edit";


const handleAdd = () => {
  setEditedUser(null);          
  navigate("/app/users#add");   
};
const handleEdit = (row) => {
  setEditedUser(row);          
  navigate("/app/users#edit"); 
};
  const handleToggleSidebar = () => {
    if (addUserModelOpen) {
      navigate("/app/users");
    } else {
      navigate("/app/users#add");
    }
  };


  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", page, perPage],
    queryFn: user.isSuperAdmin ? fetchUsers : [],
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const users = data?.docs || [];
  const totalPages = data?.pages || 1;
  //   const getAllUsers = async () => {
  //   dispatch(setUserLoading(true));

  //   try {
  //     const res = await Axios.get('/user/all-admins');
  //     const docs = res?.data?.data?.docs || [];
  //     console.log("docs",docs)
  //     dispatch(setUsers(docs));
  //     // toast.success("User Fethced Successfully");

  //   } catch (error) {
  //     toastError(error);
  //   } finally {
  //     dispatch(setUserLoading(false));
  //   }
  // };

  //   useEffect(()=>{
  //     getAllUsers()
  //   },[])

  //   const usersq = useSelector(state => state.user.users)
  //   console.log("users",usersq);

  return (
    <div className="w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-xl font-medium text-black tracking-tight">
            All Users
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleToggleSidebar}
            type="button"
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 font-normal sm:font-medium text-[14px] sm:text-sm rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-sm ${
              addUserModelOpen
                ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                : "bg-[#1A1C1E] hover:bg-black text-white shadow-gray-200"
            }`}
          >
            {addUserModelOpen ? (
              <>
                <X size={16} className="stroke-[2.5]" />
                <span>Cancel</span>
              </>
            ) : (
              <button className="flex justify-center items-center gap-x-2" onClick={handleAdd}>
                <Plus size={18} className="stroke-[2.5]" />
                <span>Add User</span>
              </button>
            )}
          </button>
        </div>
      </div>

      <div
        className={`w-full flex flex-col-reverse lg:flex-row  ${addUserModelOpen ? "gap-6" : ""} items-start`}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            addUserModelOpen ? "w-full lg:w-[65%] shrink-0" : "w-full"
          }`}
        >
          <AllUserTable
            setEditedUser={handleEdit}
            addUserModelOpen={handleToggleSidebar}
            usersData={users}
            isLoading={isLoading || isFetching}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            totalPages={totalPages}
          />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out ${
            addUserModelOpen
              ? "w-full lg:w-[35%] opacity-100 scale-100 visible"
              : "w-0 h-0 opacity-0 scale-95 overflow-hidden invisible"
          }`}
        >
          {addUserModelOpen && (
            <div className="w-full ">
              <AddUser setEditedUser={setEditedUser} editUser={editUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
