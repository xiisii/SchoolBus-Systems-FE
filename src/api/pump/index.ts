import { Pump, PumpDetail } from "src/types/pumps";
import { apiGet, apiPost, apiDelete, apiPatch } from "src/utils/api-request";

export class PumpsApi {
  static async postPump(request: Omit<Pump, "id">): Promise<number> {
    return await apiPost("/pump", request);
  }

  static async getPumps(request: FormData): Promise<PumpDetail[]> {
    const response = await apiGet("/pumps", request);
    return response;
  }

  static async putPumps(request: Partial<Pump & Pick<Pump, "id">>) {
    return await apiPatch(`/pumps/${request.id}`, request);
  }

  static async deletePump(id: number) {
    return await apiDelete(`/pumps/${id}`, { id });
  }
}
