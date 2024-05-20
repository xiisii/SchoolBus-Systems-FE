import {
  AutoTransaction,
  AutoTransactionDetail,
} from "src/types/transaction-auto";
import { apiGet, apiPost, apiDelete, apiPatch } from "src/utils/api-request";

export class AutoTransactionsApi {
  static async postAutoTransaction(
    request: Omit<AutoTransaction, "id">
  ): Promise<number> {
    return await apiPost("/auto-transaction", request);
  }

  static async getAutoTransactions(
    request: FormData
  ): Promise<AutoTransactionDetail[]> {
    const response = await apiGet("/auto-transactions", request);
    return response;
  }

  static async putAutoTransactions(
    request: Partial<AutoTransaction & Pick<AutoTransaction, "id">>
  ) {
    return await apiPatch(`/auto-transactions/${request.id}`, request);
  }

  static async deleteAutoTransaction(id: number) {
    return await apiDelete(`/auto-transactions/${id}`, { id });
  }
}
