import { Permission } from "src/types/permission";
import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPatch,
} from "src/utils/api-request";

export class PermissionsApi {
  static async postPermission(
    request: Omit<Permission, "id">
  ): Promise<number> {
    return await apiPost("/permissions", request);
  }

  static async getPermissions(request: FormData): Promise<Permission[]> {
    const response = await apiGet("/permissions", request);
    return response;
  }

  static async putPermission(request: Partial<Permission>) {
    return await apiPatch(`/permissions/${request.id}`, request);
  }

  static async deletePermission(id: number) {
    return await apiDelete(`/permissions/${id}`, { id });
  }
}
