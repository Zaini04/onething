import { useQuery } from "@tanstack/react-query";
import Axios from "../../configs/api";

export const fetchSites = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/site/all_sites", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const useSites = (page = 1, perPage = 10,apiFilters={}) => {
  return useQuery({
    queryKey: ["sites", page, perPage,apiFilters],
    queryFn: fetchSites,
    staleTime: 1000 * 30, 
  cacheTime: 1000 * 60 * 10, 
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  keepPreviousData: true,
  });
};



export const fetchSiteMaterials = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/site/all_clients_sites", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const useSiteMaterials = (page = 1, perPage = 10,apiFilters={}) => {
  return useQuery({
    queryKey: ["site-materials", page, perPage,apiFilters],
    queryFn: fetchSites,
    staleTime: 1000 * 30, 
  cacheTime: 1000 * 60 * 10, 
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  keepPreviousData: true,
  });
};


