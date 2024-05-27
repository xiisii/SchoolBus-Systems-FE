import { apiDelete, apiGet, apiPatch, apiPost } from "src/utils/api-request";
import { BusInfo, BusInfoDetail } from "src/types/bus-info";

type BusInfoResponse = Promise<BusInfoDetail>;

export class BusInfoApi {
  static async createBusInfo(request: Omit<BusInfo, "id">): Promise<number> {
    return await apiPost("/buses/create", request);
  }

  static async getBusInfoList(request: FormData): Promise<BusInfo[]> {
    const response = await apiGet("/buses", request);
    return response;
  }

  static async updateBusInfo(
    request: Partial<BusInfo>
  ): Promise<BusInfoDetail> {
    const response = await apiPatch("/buses/" + request.id, request);
    return response.data;
  }

  static async deleteBusInfo(id: string): Promise<void> {
    await apiDelete(`/buses/${id}`, { id });
  }
}
