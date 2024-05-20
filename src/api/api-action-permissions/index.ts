import { apiGet, apiPost, apiPut, apiDelete } from "src/utils/api-request";

export class ApiActionPermissionsApi {
  static async postApiActionPermission(request: {
    permission_id: number;
    api_action_id: number;
  }): Promise<{ id: number }> {
    return await apiPost("/api_action_permissions", request);
  }

  static async getApiActionPermissions(
    request: FormData
  ): Promise<
    { api_action_id: number; permission_id: number; api_action_name: string }[]
  > {
    const response = await apiGet("/api_action_permissions", request);
    return response;
  }

  static async updateApiActionPermissionsByApiAction(request: {
    permission_id: number;
    api_action_ids: number[];
  }): Promise<void> {
    const response = await apiPut(
      "/api_action_permissions/all/" + request.permission_id,
      request
    );
  }

  static async deleteApiActionPermission(request: {
    permission_id: number;
    api_action_id: number;
  }) {
    return await apiDelete(`/api_action_permissions`, request);
  }
}
