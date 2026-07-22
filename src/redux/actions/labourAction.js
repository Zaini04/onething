import { useQuery } from "@tanstack/react-query";
import Axios from "../../configs/api";

export const fetchLabours= async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/labour/all_labours", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};
export const fetchLaboursBills= async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/labour/all_labours_expenses", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};
export const fetchOneLaburBills= async ({ queryKey }) => {

  const [, page, limit,apiFilters,id] = queryKey;
  const pageSize = limit
  const res = await Axios.get(`/labour/labour_expense/${id}`, {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};


export const fetchLabourDropdown = async () => {
  const {data:{data:{docs}}} = await Axios.get("/labour/labours_list");
  console.log("dr",docs)
  return docs || [];
};

export const useLabourDropdown = () => {
  return useQuery({
    queryKey: ["laboursDropdown"],
    queryFn: fetchLabourDropdown,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};


export const fetchLabourExpenseSummary = async ({ queryKey }) => {
  const [, labour, from, to] = queryKey;
  const { data } = await Axios.get("/labour/expense-summary", {
    params: { labour, from, to },
  });
  console.log("ls",data.data)
  return data.data; // ya jo bhi response shape hai
};