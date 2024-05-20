import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import { PumpCylindersApi } from "src/api/pump-cylinder";
import { useAuth } from "src/hooks/use-auth";
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";
import { PumpCylinder, PumpCylinderDetail } from "src/types/pump-cylinder";

interface ContextValue {
  getPumpCylindersApi: UseFunctionReturnType<FormData, PumpCylinderDetail[]>;
  currentStation?: PumpCylinderDetail;

  createPumpCylinder: (
    requests: Omit<PumpCylinderDetail, "id">
  ) => Promise<void>;
  updatePumpCylinder: (
    PumpCylinder: Partial<PumpCylinderDetail>
  ) => Promise<void>;
  deletePumpCylinder: (ids: number[]) => Promise<void>;
}

export const PumpCylindersContext = createContext<ContextValue>({
  getPumpCylindersApi: DEFAULT_FUNCTION_RETURN,

  createPumpCylinder: async () => {},
  updatePumpCylinder: async () => {},
  deletePumpCylinder: async () => {},
});

const PumpCylindersProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const getPumpCylindersApi = useFunction(PumpCylindersApi.getPumpCylinders);
  const router = useRouter();
  const [currentStation, setCurrentStation] = useState<PumpCylinderDetail>();
  // useEffect(() => {
  //   if (currentStation?.id != router.query.stationId) {
  //     const SaleShift = (getSaleShiftsApi.data || []).find(
  //       (s) => s.id == Number(router.query.stationId)
  //     );
  //     setCurrentStation(SaleShift);
  //   }
  // }, [router.query.stationId, currentStation?.id, getSaleShiftsApi.data]);

  const createPumpCylinder = useCallback(
    async (request: Omit<PumpCylinderDetail, "id">) => {
      try {
        const id = await PumpCylindersApi.postPumpCylinder(request);
        if (id) {
          const newStations: PumpCylinderDetail[] = [
            {
              ...request,
              id: id.toString(),
            },
            ...(getPumpCylindersApi.data || []),
          ];

          getPumpCylindersApi.setData(newStations);
        }
      } catch (error) {
        throw error;
      }
    },
    [getPumpCylindersApi]
  );

  const updatePumpCylinder = useCallback(
    async (PumpCylinder: Partial<PumpCylinder>) => {
      try {
        await PumpCylindersApi.putPumpCylinders(PumpCylinder);
        getPumpCylindersApi.setData(
          (getPumpCylindersApi.data || []).map((c) =>
            c.id.toString() == PumpCylinder.id
              ? Object.assign(c, PumpCylinder)
              : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getPumpCylindersApi]
  );

  const deletePumpCylinder = useCallback(
    async (ids: number[]) => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) => PumpCylindersApi.deletePumpCylinder(id))
        );
        getPumpCylindersApi.setData([
          ...(getPumpCylindersApi.data || []).filter(
            (PumpCylinder) =>
              !results.find(
                (result, index) =>
                  result.status == "fulfilled" &&
                  ids[index].toString() == PumpCylinder.id
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
    [getPumpCylindersApi]
  );

  useEffect(() => {
    if (isAuthenticated) {
      getPumpCylindersApi.call(new FormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <PumpCylindersContext.Provider
      value={{
        getPumpCylindersApi,
        currentStation,

        createPumpCylinder,
        updatePumpCylinder,
        deletePumpCylinder,
      }}
    >
      {children}
    </PumpCylindersContext.Provider>
  );
};

export const usePumpCylindersContext = () => useContext(PumpCylindersContext);

export default PumpCylindersProvider;
