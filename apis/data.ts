import { API_URL } from "@env";
import { request } from "@utils/request";

interface ListDataRequest {
  type: string;
  from: string;
  to: string;
}
export const listAllDataApi = async (
  type: string,
  from: string,
  to: string
): Promise<{
  error?: string;
  data?: ISensorData[];
  status: number;
}> => {
  const url = `${API_URL}/api/data/list`;
  const options: RequestOptions<ListDataRequest> = {
    method: "post",
    data: {
      type: type,
      from: from,
      to: to,
    },
    headers: {},
  };

  const result = await request<ListDataRequest, ISensorData[]>(url, options);
  try {
    return Promise.resolve({
      data: result.data,
      status: result.status,
    });
  } catch (e) {
    return Promise.reject({
      error: "Failed to login",
      status: result.status,
    });
  }
};
