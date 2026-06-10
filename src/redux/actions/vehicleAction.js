import { useQuery } from "@tanstack/react-query";
import Axios from "../../configs/api";

export const fetchVehicles = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/vehicle/all_vehicles", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const useVehicles = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ["vehicles", page, perPage],
    queryFn: fetchVehicles,
    staleTime: 1000 * 30, 
  cacheTime: 1000 * 60 * 10, 
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  keepPreviousData: true,
  });
};