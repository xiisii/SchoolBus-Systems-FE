import type { User, UserDetail } from "src/types/user";
import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
} from "src/utils/api-request";

type SignInRequest = {
  user_name: string;
  password: string;
};

type SignInResponse = Promise<{
  data: UserDetail;
  token: string;
}>;

type SignUpRequest = {
  email: string;
  user_name: string;
  password: string;
  full_name: string;
  confirm_password: string;
};

type SignUpResponse = Promise<{
  accessToken: string;
}>;

export class UsersApi {
  static async postUser(request: Omit<User, "id">): Promise<number> {
    return await apiPost("/users/create", request);
  }
  // static async createUser(request: Omit<User, "id">): Promise<{ id: string }> {
  //   return await apiPost("/users/create", request);
  // }

  static async getUsers(request: FormData): Promise<UserDetail[]> {
    const response = await apiGet("/users", request);
    return response;
  }

  static async putUser(request: Partial<User>) {
    const response = await apiPatch("/users/" + request.id, request);
    return response.data;
  }

  static async deleteUser(id: number) {
    return await apiDelete(`/users/${id}`, { id });
  }

  static async signIn(request: SignInRequest): Promise<SignInResponse> {
    return await apiPost("/users/login", request);
  }

  static async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return await apiPost("/users", request);
  }

  static async me(): Promise<UserDetail> {
    return await apiGet("/users/info");
  }

  static async updatePassword(payload: {
    old_password: string;
    new_password: string;
  }): Promise<User> {
    return await apiPost("/users/password", payload);
  }
}
