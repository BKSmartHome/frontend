import { API_URL } from "@env";
import { request } from "@utils/request";

export const getStudentByIdApi = async (
  accessToken: string,
  studentId: string
): Promise<{
  error?: string;
  data?: IGetStudentByIdResponse;
  status: number;
}> => {
  const url = `${API_URL}/students/${studentId}`;
  const options: RequestOptions<Record<string, never>> = {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const result = await request<Record<string, never>, IGetStudentByIdResponse>(
    url,
    options
  );
  try {
    if (result.status !== 200) {
      return Promise.reject({
        error: "Failed to get student by id",
        status: result.status,
      });
    }

    return Promise.resolve({ data: result.data, status: result.status });
  } catch (e) {
    return Promise.reject({
      error: "Failed to get student by id",
      status: result.status,
    });
  }
};
