import { API_URL } from "@env";
import { request } from "@utils/request";

export const listAllReceiversApi = async (): Promise<{
  error?: string;
  data?: IReceiver[];
  status: number;
}> => {
  const url = `${API_URL}/api/receiver/list`;
  const options: RequestOptions<Record<never, never>> = {
    method: "get",
    headers: {},
  };

  try {
    const result = await request<Record<never, never>, IReceiver[]>(
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

interface ICreateReceiverRequest {
  name: string;
  email: string;
}

export const createReceiverApi = async (
  payload: ICreateReceiverRequest
): Promise<{
  error?: string;
  data?: IReceiver;
  status: number;
}> => {
  const url = `${API_URL}/api/receiver/create`;
  const options: RequestOptions<ICreateReceiverRequest> = {
    method: "post",
    data: payload,
    headers: {},
  };

  try {
    const result = await request<ICreateReceiverRequest, IReceiver>(
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

export const deleteReceiverApi = async (
  name: string
): Promise<{
  error?: string;
  data?: string;
  status: number;
}> => {
  const url = `${API_URL}/api/receiver/delete`;
  const options: RequestOptions<{ name: string }> = {
    method: "post",
    data: { name },
    headers: {},
  };

  try {
    const result = await request<{ name: string }, string>(url, options);
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
