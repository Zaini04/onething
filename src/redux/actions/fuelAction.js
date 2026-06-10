import { useQuery } from "@tanstack/react-query";
import Axios from "../../configs/api";

export const fetchFuelCompanies = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/fuel/all_fuel_companies", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const useFuelCompanies = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ["fuel-companies", page, perPage],
    queryFn: fetchFuelCompanies,
    staleTime: 1000 * 30, 
  cacheTime: 1000 * 60 * 10, 
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  keepPreviousData: true,
  });
};