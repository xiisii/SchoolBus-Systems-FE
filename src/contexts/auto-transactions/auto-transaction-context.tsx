import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import { AutoTransactionsApi } from "src/api/auto-transactions";
import { SaleShiftsApi } from "src/api/sale-shifts";
import { useAuth } from "src/hooks/use-auth";
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";
import {
  AutoTransaction,
  AutoTransactionDetail,
} from "src/types/transaction-auto";

interface ContextValue {
  getAutoTransactionsApi: UseFunctionReturnType<
    FormData,
    AutoTransactionDetail[]
  >;
  currentStation?: AutoTransactionDetail;

  createAutoTransaction: (
    requests: Omit<AutoTransactionDetail, "id">
  ) => Promise<void>;
  updateAutoTransaction: (
    AutoTransaction: Partial<AutoTransactionDetail>
  ) => Promise<void>;
  deleteAutoTransaction: (ids: number[]) => Promise<void>;
}

export const AutoTransactionsContext: any = createContext<ContextValue>({
  getAutoTransactionsApi: DEFAULT_FUNCTION_RETURN,

  createAutoTransaction: async () => {},
  updateAutoTransaction: async () => {},
  deleteAutoTransaction: async () => {},
});

const AutoTransactionsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const getAutoTransactionsApi = useFunction(
    AutoTransactionsApi.getAutoTransactions
  );
  const router = useRouter();
  const [currentStation, setCurrentStation] = useState<AutoTransactionDetail>();
  // useEffect(() => {
  //   if (currentStation?.id != router.query.stationId) {
  //     const AutoTransaction = (getSaleShiftsApi.data || []).find(
  //       (s) => s.id == Number(router.query.stationId)
  //     );
  //     setCurrentStation(AutoTransaction);
  //   }
  // }, [router.query.stationId, currentStation?.id, getSaleShiftsApi.data]);

  const createAutoTransaction = useCallback(
    async (request: Omit<AutoTransactionDetail, "id">) => {
      try {
        const id = await AutoTransactionsApi.postAutoTransaction(request);
        if (id) {
          const newStations: AutoTransactionDetail[] = [
            {
              ...request,
              id: id.toString(),
            },
            ...(getAutoTransactionsApi.data || []),
          ];

          getAutoTransactionsApi.setData(newStations);
        }
      } catch (error) {
        throw error;
      }
    },
    [getAutoTransactionsApi]
  );

  const updateAutoTransaction = useCallback(
    async (AutoTransaction: Partial<AutoTransaction>) => {
      try {
        await SaleShiftsApi.putSaleShifts(AutoTransaction);
        getAutoTransactionsApi.setData(
          (getAutoTransactionsApi.data || []).map((c) =>
            c.id.toString() == AutoTransaction.id
              ? Object.assign(c, AutoTransaction)
              : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getAutoTransactionsApi]
  );

  const deleteAutoTransaction = useCallback(
    async (ids: number[]) => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) => AutoTransactionsApi.deleteAutoTransaction(id))
        );
        getAutoTransactionsApi.setData([
          ...(getAutoTransactionsApi.data || []).filter(
            (AutoTransaction) =>
              !results.find(
                (result, index) =>
                  result.status == "fulfilled" &&
                  ids[index].toString() == AutoTransaction.id
              )
          ),
        ]);
        results.forEach((result, index) => {
          if (result.status == "rejected") {
            throw new Error(
              "Không thể xoá danh mục: " +
                ids[index] +
                ". " +
                result.reason.toString()
            );
          }
        });
      } catch (error) {
        throw error;
      }
    },
    [getAutoTransactionsApi]
  );

  useEffect(() => {
    if (isAuthenticated) {
      getAutoTransactionsApi.call(new FormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <AutoTransactionsContext.Provider
      value={{
        getAutoTransactionsApi,
        currentStation,

        createAutoTransaction,
        updateAutoTransaction,
        deleteAutoTransaction,
      }}
    >
      {children}
    </AutoTransactionsContext.Provider>
  );
};

export const useAutoTransactionsContext = () =>
  useContext(AutoTransactionsContext);

export default AutoTransactionsProvider;
