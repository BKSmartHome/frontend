import { API_URL } from "@env";
import { request } from "@utils/request";

export const listAllAlertsApi = async (
  from: string,
  to: string,
  pageSize: number
): Promise<{
  error?: string;
  data?: IAlertData[];
  status: number;
}> => {
  const url = `${API_URL}/api/alert/list?from=${from}&to=${to}&page_size=${pageSize}`;
  const options: RequestOptions<Record<never, never>> = {
    method: "get",
    headers: {},
  };

  try {
    const result = await request<Record<never, never>, IAlertData[]>(
      url,
      options
    );
    return Promise.resolve({
      data: result.data,
      status: result.status,
    });
  } catch (e) {
    return Promise.reject({
      error: "Failed to login",
      status: 404,
    });
  }
};
