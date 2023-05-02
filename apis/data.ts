import { API_URL } from "@env";
import { request } from "@utils/request";

export const listAllDataApi = async (
  pageId: number,
  pageSize: number
): Promise<{
  error?: string;
  data?: ISensorData[];
  status: number;
}> => {
  const url = `${API_URL}/api/data/list?page_id=${pageId}&page_size=${pageSize}`;
  const options: RequestOptions<Record<never, never>> = {
    method: "get",
    headers: {},
  };

  const result = await request<Record<never, never>, ISensorData[]>(
    url,
    options
  );
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
