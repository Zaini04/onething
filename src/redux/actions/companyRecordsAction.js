import Axios from "../../configs/api";

export const fetchCompanyRecord = async ({ queryKey }) => {

  const [, page, limit,apiFilters,id] = queryKey;
  const pageSize = limit
  const res = await Axios.get(`/company-records/client_records/${id}`, {
    params: { page, pageSize,...apiFilters, },
  });


  return res.data.data;
};

export const fetchCompanyBills= async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/company-records/all_clients_expenses", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const fetchCompanyExpenseSummary = async ({ queryKey }) => {
  const [, client, from, to] = queryKey;
  const { data } = await Axios.get("/company-records/expense-summary", {
    params: { client, from, to },
  });
  return data.data; // ya jo bhi response shape hai
};


export const exportCompanyRecordsExcel = async ({
  clientId,
  selectedRows,
  filters,
}) => {
  const response = await Axios.post(
    `/company-records/client_records/${clientId}/export-excel`,
    {
      ids: selectedRows,
    },
    {
      params: filters,
      responseType: "blob",
    }
  );

  return response.data;
};

export const exportCompanyRecordsPdf = async ({
  id,
  selectedRows,
  filters,
}) => {
  const response = await Axios.post(
    `/company-records/client_records/${id}/export-pdf`,
    {
      ids: selectedRows,
    },
    {
      params: filters,
      responseType: "blob",
    }
  );

  return response.data;
};
