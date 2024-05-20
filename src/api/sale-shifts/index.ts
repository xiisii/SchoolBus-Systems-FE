import { SaleShift, SaleShiftDetail } from "src/types/sale-shift";
import { apiGet, apiPost, apiDelete, apiPatch } from "src/utils/api-request";

export class SaleShiftsApi {
  static async postSaleShift(request: Omit<SaleShift, "id">): Promise<number> {
    return await apiPost("/sale-shifts", request);
  }

  static async getSaleShifts(request: FormData): Promise<SaleShiftDetail[]> {
    const response = await apiGet("/sale-shifts", request);
    return response;
  }

  static async putSaleShifts(
    request: Partial<SaleShift & Pick<SaleShift, "id">>
  ) {
    return await apiPatch(`/sale-shifts/${request.id}`, request);
  }

  static async deleteSaleShift(id: number) {
    return await apiDelete(`/sale-shifts/${id}`, { id });
  }
}
