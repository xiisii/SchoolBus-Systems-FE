import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import { SaleShiftsApi } from "src/api/sale-shifts";
import { useAuth } from "src/hooks/use-auth";
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";
import { SaleShift, SaleShiftDetail } from "src/types/sale-shift";

interface ContextValue {
  getSaleShiftsApi: UseFunctionReturnType<FormData, SaleShiftDetail[]>;
  currentStation?: SaleShiftDetail;

  createSaleShift: (requests: Omit<SaleShiftDetail, "id">) => Promise<void>;
  updateSaleShift: (SaleShift: Partial<SaleShiftDetail>) => Promise<void>;
  deleteSaleShift: (ids: number[]) => Promise<void>;
}

export const SaleShiftsContext = createContext<ContextValue>({
  getSaleShiftsApi: DEFAULT_FUNCTION_RETURN,

  createSaleShift: async () => {},
  updateSaleShift: async () => {},
  deleteSaleShift: async () => {},
});

const SaleShiftsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const getSaleShiftsApi = useFunction(SaleShiftsApi.getSaleShifts);
  const router = useRouter();
  const [currentStation, setCurrentStation] = useState<SaleShiftDetail>();
  // useEffect(() => {
  //   if (currentStation?.id != router.query.stationId) {
  //     const SaleShift = (getSaleShiftsApi.data || []).find(
  //       (s) => s.id == Number(router.query.stationId)
  //     );
  //     setCurrentStation(SaleShift);
  //   }
  // }, [router.query.stationId, currentStation?.id, getSaleShiftsApi.data]);

  const createSaleShift = useCallback(
    async (request: Omit<SaleShiftDetail, "id">) => {
      try {
        const id = await SaleShiftsApi.postSaleShift(request);
        if (id) {
          const newStations: SaleShiftDetail[] = [
            {
              ...request,
              id: id.toString(),
            },
            ...(getSaleShiftsApi.data || []),
          ];

          getSaleShiftsApi.setData(newStations);
        }
      } catch (error) {
        throw error;
      }
    },
    [getSaleShiftsApi]
  );

  const updateSaleShift = useCallback(
    async (SaleShift: Partial<SaleShift>) => {
      try {
        await SaleShiftsApi.putSaleShifts(SaleShift);
        getSaleShiftsApi.setData(
          (getSaleShiftsApi.data || []).map((c) =>
            c.id.toString() == SaleShift.id ? Object.assign(c, SaleShift) : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getSaleShiftsApi]
  );

  const deleteSaleShift = useCallback(
    async (ids: number[]) => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) => SaleShiftsApi.deleteSaleShift(id))
        );
        getSaleShiftsApi.setData([
          ...(getSaleShiftsApi.data || []).filter(
            (SaleShift) =>
              !results.find(
                (result, index) =>
                  result.status == "fulfilled" &&
                  ids[index].toString() == SaleShift.id
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
    [getSaleShiftsApi]
  );

  useEffect(() => {
    if (isAuthenticated) {
      getSaleShiftsApi.call(new FormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <SaleShiftsContext.Provider
      value={{
        getSaleShiftsApi,
        currentStation,

        createSaleShift,
        updateSaleShift,
        deleteSaleShift,
      }}
    >
      {children}
    </SaleShiftsContext.Provider>
  );
};

export const useSaleShiftsContext = () => useContext(SaleShiftsContext);

export default SaleShiftsProvider;
