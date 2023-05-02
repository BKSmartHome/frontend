import { ACCESS_JWT_SECRET } from "@env";
import { JwtPayload, verify } from "jsonwebtoken";

interface IAccessTokenPayload extends JwtPayload {
  username: string;
}

export const decodeAccessToken = (
  accessToken: string
): Promise<{
  payload: IAccessTokenPayload;
}> => {
  let decoded;

  try {
    decoded = verify(accessToken, ACCESS_JWT_SECRET, {
      complete: true,
    });
  } catch (error) {
    console.log("error when decoding: ", { error });
    throw new Error("Unauthorized: unsuccessful verify JWT ");
  }

  if (!decoded || typeof decoded.payload === "string") {
    throw new Error(`Not have permission`);
  }
  return Promise.resolve({ payload: decoded.payload as IAccessTokenPayload });
};

// export const getRoleFromAccessToken = async (
//   accessToken: string
// ): Promise<{
//   isSuccessful: boolean;
//   username: string;
// }> => {
//   let username;

//   try {
//     const { payload } = await decodeAccessToken(accessToken);

//     if (!payload || typeof payload === "string") {
//       throw new Error("Invalid token");
//     }
//   } catch (error) {
//     throw new Error(`Not have permission`);
//   }

//   return Promise.resolve({
//     isSuccessful: true,
//     username: payload.username,
//   });
// };

export const getExpiredTimeFromAccessToken = async (
  accessToken: string
): Promise<{
  expiredAt: number;
}> => {
  let expiredAt;

  try {
    const { payload } = await decodeAccessToken(accessToken);

    if (payload && typeof payload !== "string") {
      expiredAt = payload?.expired_at;
      if (!expiredAt) {
        throw new Error(`ExpiredAt not found`);
      }
    } else {
      throw new Error(`Invalid payload`);
    }
  } catch (error) {
    throw new Error(`Invalid payload`);
  }

  return Promise.resolve({
    expiredAt,
  });
};
