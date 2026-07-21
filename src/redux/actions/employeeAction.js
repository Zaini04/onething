import { useQuery } from "@tanstack/react-query";
import Axios from "../../configs/api";

export const fetchEmployees= async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/employee/all_employees", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};
export const fetchEmployeesBills= async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/employee/all_employees_expenses", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};
export const fetchOneEmployeesBills= async ({ queryKey }) => {

  const [, page, limit,apiFilters,id] = queryKey;
  const pageSize = limit
  const res = await Axios.get(`/employee/employee_expense/${id}`, {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};


export const fetchEmployeeDropdown = async () => {
  const {data:{data:{docs}}} = await Axios.get("/employee/employees_list");
  console.log("dr",docs)
  return docs || [];
};

export const useEmployeeDropdown = () => {
  return useQuery({
    queryKey: ["employeesDropdown"],
    queryFn: fetchEmployeeDropdown,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};


export const fetchEmployeeExpenseSummary = async ({ queryKey }) => {
  const [, employee, from, to] = queryKey;
  const { data } = await Axios.get("/employee/expense-summary", {
    params: { employee, from, to },
  });
  return data.data; // ya jo bhi response shape hai
};