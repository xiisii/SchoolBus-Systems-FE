import { Station, StationDetail } from "src/types/station";
import { apiGet, apiPost, apiDelete, apiPatch } from "src/utils/api-request";

export class StationsApi {
  static async postStation(request: Omit<Station, "id">): Promise<number> {
    return await apiPost("/stations", request);
  }

  static async getStations(request: FormData): Promise<StationDetail[]> {
    const response = await apiGet("/stations", request);
    return response;
  }

  static async putStations(request: Partial<Station & Pick<Station, "id">>) {
    return await apiPatch(`/stations/${request.id}`, request);
  }

  static async deleteStation(id: number) {
    return await apiDelete(`/stations/${id}`, { id });
  }
}
