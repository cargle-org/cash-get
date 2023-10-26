import https from "../utils/https";
import { ILoginPayLoad, ILoginResponse, IResponse } from "./types";
const AUTH_BASE_URL = `/auth`;

const login = async (payload: ILoginPayLoad): Promise<IResponse<ILoginResponse>> =>
  https.post({
    url: `${AUTH_BASE_URL}/login`,
    body: JSON.stringify(payload),
  });

export const authApi = {
  login,
};
