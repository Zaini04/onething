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
  const {data:{data:{docs}}} = await Axios.get("/client/clients_list");
  console.log("dr",docs)
  return docs || [];
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


export const fetchClientLedger = async ({ queryKey }) => {

  const [, page, limit,apiFilters,id] = queryKey;
  const pageSize = limit
  const res = await Axios.get(`/client/ledger/${id}`, {
    params: { page, pageSize,...apiFilters, },
  });


  return res.data.data;
};

export const useClientLedger = () => {
  return useQuery({
    queryKey: ["client-ledger"],
    queryFn: fetchClientLedger,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const fetchClientSummary = async ({ queryKey }) => {
  const [, id] = queryKey;  
  const { data: { data } } = await Axios.get(`/client/client_summary/${id}`);
  return data.summary || {};  
};

export const fetchClient = async ({ queryKey }) => {
  const [, id] = queryKey;  
  const { data: { data } } = await Axios.get(`/client/${id}`);
  return data.doc || {}; 
};


