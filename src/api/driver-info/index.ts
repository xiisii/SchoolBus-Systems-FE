import { apiDelete, apiGet, apiPatch, apiPost } from "src/utils/api-request";

import { DriverInfo, DriverInfoDetail } from "src/types/driver-info";

type DriverInfoResponse = Promise<DriverInfoDetail>;

export class DriverInfoApi {
  static async createDriverInfo(
    request: Omit<DriverInfo, "id">
  ): Promise<number> {
    return await apiPost("/drivers/create", request);
  }

  static async getDriverInfoList(request: FormData): Promise<DriverInfo[]> {
    const response = await apiGet("/drivers", request);
    return response;
  }

  static async updateDriverInfo(
    request: Partial<DriverInfo>
  ): Promise<DriverInfoDetail> {
    const response = await apiPatch("/drivers/" + request.id, request);
    return response.data;
  }

  static async deleteDriverInfo(id: string): Promise<void> {
    await apiDelete(`/drivers/${id}`, { id });
  }
}

