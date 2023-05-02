import { API_URL } from "@env";
import { request } from "@utils/request";

export const createDegreesApi = async (
  degrees: ICreateDegreeRequest[],
  accessToken: string
): Promise<{
  error?: string;
  data?: ICreateDegreeResponse;
  status: number;
}> => {
  const url = `${API_URL}/degrees`;
  const options: RequestOptions<ICreateDegreeRequest[]> = {
    method: "post",
    data: degrees,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const result = await request<ICreateDegreeRequest[], ICreateDegreeResponse>(
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

export const getDegreesApi = async (
  accessToken: string
): Promise<{
  error?: string;
  data?: IGetDegreesResponse[];
  status: number;
}> => {
  const url = `${API_URL}/degrees`;
  const options: RequestOptions<Record<string, never>> = {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const result = await request<Record<string, never>, IGetDegreesResponse[]>(
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
