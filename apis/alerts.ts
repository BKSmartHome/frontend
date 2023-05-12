import { API_URL } from "@env";
import { request } from "@utils/request";

export const listAllAlertsApi = async (
  from: string,
  to: string
): Promise<{
  error?: string;
  data?: IAlertData[];
  status: number;
}> => {
  const url = `${API_URL}/api/alert/list`;
  const options: RequestOptions<{
    from: string;
    to: string;
  }> = {
    method: "post",
    data: {
      from,
      to,
    },
    headers: {},
  };

  try {
    const result = await request<
      {
        from: string;
        to: string;
      },
      IAlertData[]
    >(url, options);
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
