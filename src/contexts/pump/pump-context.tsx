import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import { PumpsApi } from "src/api/pump";
import { useAuth } from "src/hooks/use-auth";
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";
import { Pump, PumpDetail } from "src/types/pumps";

interface ContextValue {
  getPumpsApi: UseFunctionReturnType<FormData, PumpDetail[]>;
  currentStation?: PumpDetail;

  createPump: (requests: Omit<PumpDetail, "id">) => Promise<void>;
  updatePump: (Pump: Partial<PumpDetail>) => Promise<void>;
  deletePump: (ids: number[]) => Promise<void>;
}

export const PumpsContext = createContext<ContextValue>({
  getPumpsApi: DEFAULT_FUNCTION_RETURN,

  createPump: async () => {},
  updatePump: async () => {},
  deletePump: async () => {},
});

const PumpsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const getPumpsApi = useFunction(PumpsApi.getPumps);
  const router = useRouter();
  const [currentStation, setCurrentStation] = useState<PumpDetail>();
  // useEffect(() => {
  //   if (currentStation?.id != router.query.stationId) {
  //     const SaleShift = (getSaleShiftsApi.data || []).find(
  //       (s) => s.id == Number(router.query.stationId)
  //     );
  //     setCurrentStation(SaleShift);
  //   }
  // }, [router.query.stationId, currentStation?.id, getSaleShiftsApi.data]);

  const createPump = useCallback(
    async (request: Omit<PumpDetail, "id">) => {
      try {
        const id = await PumpsApi.postPump(request);
        if (id) {
          const newStations: PumpDetail[] = [
            {
              ...request,
              id: id.toString(),
            },
            ...(getPumpsApi.data || []),
          ];

          getPumpsApi.setData(newStations);
        }
      } catch (error) {
        throw error;
      }
    },
    [getPumpsApi]
  );

  const updatePump = useCallback(
    async (Pump: Partial<Pump>) => {
      try {
        await PumpsApi.putPumps(Pump);
        getPumpsApi.setData(
          (getPumpsApi.data || []).map((c) =>
            c.id.toString() == Pump.id ? Object.assign(c, Pump) : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getPumpsApi]
  );

  const deletePump = useCallback(
    async (ids: number[]) => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) => PumpsApi.deletePump(id))
        );
        getPumpsApi.setData([
          ...(getPumpsApi.data || []).filter(
            (Pump) =>
              !results.find(
                (result, index) =>
                  result.status == "fulfilled" &&
                  ids[index].toString() == Pump.id
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
    [getPumpsApi]
  );

  useEffect(() => {
    if (isAuthenticated) {
      getPumpsApi.call(new FormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <PumpsContext.Provider
      value={{
        getPumpsApi,
        currentStation,

        createPump,
        updatePump,
        deletePump,
      }}
    >
      {children}
    </PumpsContext.Provider>
  );
};

export const usePumpsContext = () => useContext(PumpsContext);

export default PumpsProvider;
