import { PumpCylinder, PumpCylinderDetail } from "src/types/pump-cylinder";
import { apiGet, apiPost, apiDelete, apiPatch } from "src/utils/api-request";

export class PumpCylindersApi {
  static async postPumpCylinder(
    request: Omit<PumpCylinder, "id">
  ): Promise<number> {
    return await apiPost("/pump-cylinders", request);
  }

  static async getPumpCylinders(
    request: FormData
  ): Promise<PumpCylinderDetail[]> {
    const response = await apiGet("/pump-cylinders", request);
    return response;
  }

  static async putPumpCylinders(
    request: Partial<PumpCylinder & Pick<PumpCylinder, "id">>
  ) {
    return await apiPatch(`/pump-cylinders/${request.id}`, request);
  }

  static async deletePumpCylinder(id: number) {
    return await apiDelete(`/pump-cylinders/${id}`, { id });
  }
}
