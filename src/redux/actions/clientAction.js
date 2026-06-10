import { useQuery } from "@tanstack/react-query";
import Axios from "../../configs/api";

export const fetchClients = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/client/all_clients", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const useClients = (page = 1, perPage = 10,apiFilters={}) => {
  return useQuery({
    queryKey: ["clients", page, perPage,apiFilters],
    queryFn: fetchClients,
    staleTime: 1000 * 30, 
  cacheTime: 1000 * 60 * 10, 
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  keepPreviousData: true,
  });
};

export const fetchClientDropdown = async () => {
  const res = await Axios.get("/client/clients_list");
  return res.data?.data || [];
};

export const useClientDropdown = () => {
  return useQuery({
    queryKey: ["clientDropdown"],
    queryFn: fetchClientDropdown,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};