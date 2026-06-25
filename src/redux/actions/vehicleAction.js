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

export const fetchVehilceDropdown = async () => {
  const {data:{data:{docs,message}}} = await Axios.get("/vehicle/vehicles_list");
  console.log("drv",docs)
  return docs || [];
};

export const useVehicleDropdown = () => {
  return useQuery({
    queryKey: ["vehicleDropdown"],
    queryFn: fetchVehilceDropdown,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const fetchVehicleLedger = async ({ queryKey }) => {

  const [, page, limit,apiFilters,id] = queryKey;
  const pageSize = limit
  const res = await Axios.get(`/vehicle/ledger/${id}`, {
    params: { page, pageSize,...apiFilters, },
  });


  return res.data.data;
};

export const fetchVehicle = async ({ queryKey }) => {
  const [, id] = queryKey;  
  const { data: { data } } = await Axios.get(`/vehicle/${id}`);
  return data.doc || {}; 
};
