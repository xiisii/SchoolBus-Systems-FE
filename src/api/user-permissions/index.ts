import {
  UserPermission,
  UserPermissionDetail,
} from "src/types/user-permission";
import { apiGet, apiPost, apiDelete, apiPatch } from "src/utils/api-request";

export class UserPermissionsApi {
  static async postUserPermission(
    request: Omit<UserPermission, "id">[]
  ): Promise<number> {
    return await apiPost("/user_permissions", request);
  }

  static async getUserPermissions(
    request: UserPermission
  ): Promise<UserPermissionDetail[]> {
    let response: any;
    if (request.permission_id) {
      response = await apiGet(
        `/user_permissions/${request.user_id || "all"}/${
          request.permission_id
        }`,
        request
      );
    } else if (request.user_id) {
      response = await apiGet(`/user_permissions/${request.user_id}`);
    } else {
      response = await apiGet(`/user_permissions`);
    }
    return response;
  }

  static async putUserPermissions({
    old,
    current,
  }: {
    old: UserPermission;
    current: UserPermission;
  }) {
    return await apiPatch(
      `/user_permissions/${old.user_id}/${old.permission_id}`,
      current
    );
  }

  static async deleteUserPermission(request: UserPermission) {
    return await apiDelete(
      `/user_permissions/${request.user_id}/${request.permission_id}`,
      {}
    );
  }
  static async deleteUserPermissions(request: UserPermission[]) {
    return await apiDelete(`/user_permissions`, request);
  }
}
