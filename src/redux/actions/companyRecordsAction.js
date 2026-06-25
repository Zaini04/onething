import Axios from "../../configs/api";

export const fetchCompanyRecord = async ({ queryKey }) => {

  const [, page, limit,apiFilters,id] = queryKey;
  const pageSize = limit
  const res = await Axios.get(`/company-records/client_records/${id}`, {
    params: { page, pageSize,...apiFilters, },
  });


  return res.data.data;
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
