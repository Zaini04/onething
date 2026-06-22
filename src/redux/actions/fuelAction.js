import { useQuery } from "@tanstack/react-query";
import Axios from "../../configs/api";

export const fetchFuelStocks = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/fuel/all_fuel_stocks", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const useFuelStocks = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ["fuel-stocks", page, perPage],
    queryFn: fetchFuelStocks,
    staleTime: 1000 * 30, 
  cacheTime: 1000 * 60 * 10, 
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  keepPreviousData: true,
  });
};

export const fetchFuelCompanies = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/fuel/all_fuel_companies", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const useFuelCompaniesDropdown = () => {
  return useQuery({
    queryKey: ["fuel-companies"],
    queryFn: fetchFuelCompanies,
    staleTime: 1000 * 30, 
  cacheTime: 1000 * 60 * 10, 
  refetchOnWindowFocus: false,
  
  });
};


export const fetchFuelCompaniesList = async () => {
  const {data:{data:{docs,message}}} = await Axios.get("/fuel/all_fuel_companies_list");
  console.log("flr",docs)
  return docs || [];
};

export const useFuelStockCompaniesDropdown = () => {
  return useQuery({
    queryKey: ["fuelCompaniesLists"],
    queryFn: fetchFuelCompaniesList,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};



export const fetchFuelStockCompaniesList = async () => {
  const {data:{data:{docs,message}}} = await Axios.get("/fuel/all_fuel_stock_companies_list");
  console.log("flr",docs)
  return docs || [];
};

export const useFuelStockCompaniesListsDropdown = () => {
  return useQuery({
    queryKey: ["fuelCompaniesStockLists"],
    queryFn: fetchFuelStockCompaniesList,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};


export const fetchEntryFuels = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/fuel/entry_fuels", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};