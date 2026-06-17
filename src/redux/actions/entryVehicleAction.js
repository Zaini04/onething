import { useQuery } from "@tanstack/react-query";
import Axios from "../../configs/api";

export const fetchEntryVehiclesData = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/entry-vehicle/all_entry_vehicles", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const useEntryVehicles = (page = 1, perPage = 10,apiFilters={}) => {
  return useQuery({
    queryKey: ["entry-vehicles", page, perPage,apiFilters],
    queryFn: fetchEntryVehiclesData,
    staleTime: 1000 * 30, 
  cacheTime: 1000 * 60 * 10, 
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  keepPreviousData: true,
  });
};