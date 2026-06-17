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



// export const fetchSiteMaterials = async ({ queryKey }) => {

//   const [, page, limit,apiFilters] = queryKey;
//   const pageSize = limit
//   const res = await Axios.get("/site/all_clients_sites", {
//     params: { page, pageSize,...apiFilters },
//   });


//   return res.data.data;
// };

// export const useSiteMaterials = (page = 1, perPage = 10,apiFilters={}) => {
//   return useQuery({
//     queryKey: ["site-materials", page, perPage,apiFilters],
//     queryFn: fetchSites,
//     staleTime: 1000 * 30, 
//   cacheTime: 1000 * 60 * 10, 
//   refetchOnWindowFocus: false,
//   refetchOnMount: true,
//   keepPreviousData: true,
//   });
// };



export const fetchSiteMaterials = async ({ queryKey }) => {
  const [_, clientId] = queryKey;
  if (!clientId) return [];
  
  const { data } = await Axios.get(`/site/clients_sites_materials/${clientId}`);
  return data?.data?.docs || [];
};

export const useSiteMaterials = (clientId) => {
  return useQuery({
    queryKey: ["clientSitesMaterial", clientId],
    queryFn: fetchSiteMaterials,
    enabled: !!clientId, // Only runs the query if a clientId is actually selected
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};


export const fetchSitesWithClients = async ({ queryKey }) => {
  const [_, page, limit,apiFilters,id] = queryKey;
  if (!id) return [];
  console.log("clsid",id)

    const pageSize = limit

  
  const res = await Axios.get(`/site/clients_sites/${id}`, {
    params: { page, pageSize,...apiFilters, },
  });
  return  res.data?.data || [];
};

