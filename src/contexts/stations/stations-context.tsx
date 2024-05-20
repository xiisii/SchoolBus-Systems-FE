import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import { StationsApi } from "src/api/stations";
import { useAuth } from "src/hooks/use-auth";
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";
import { Station, StationDetail } from "src/types/station";

interface ContextValue {
  getStationsApi: UseFunctionReturnType<FormData, StationDetail[]>;
  currentStation?: StationDetail;

  createStation: (requests: Omit<StationDetail, "id">) => Promise<void>;
  updateStation: (Station: Partial<StationDetail>) => Promise<void>;
  deleteStation: (ids: number[]) => Promise<void>;
}

export const StationsContext = createContext<ContextValue>({
  getStationsApi: DEFAULT_FUNCTION_RETURN,

  createStation: async () => {},
  updateStation: async () => {},
  deleteStation: async () => {},
});

const StationsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const getStationsApi = useFunction(StationsApi.getStations);
  const router = useRouter();
  const [currentStation, setCurrentStation] = useState<StationDetail>();
  useEffect(() => {
    if (currentStation?.id != router.query.stationId) {
      const station = (getStationsApi.data || []).find(
        (s) => s.id == Number(router.query.stationId)
      );
      setCurrentStation(station);
    }
  }, [router.query.stationId, currentStation?.id, getStationsApi.data]);

  const createStation = useCallback(
    async (request: Omit<StationDetail, "id">) => {
      try {
        const id = await StationsApi.postStation(request);
        if (id) {
          const newStations: StationDetail[] = [
            {
              ...request,
              id: id,
            },
            ...(getStationsApi.data || []),
          ];

          getStationsApi.setData(newStations);
        }
      } catch (error) {
        throw error;
      }
    },
    [getStationsApi]
  );

  const updateStation = useCallback(
    async (Station: Partial<Station>) => {
      try {
        await StationsApi.putStations(Station);
        getStationsApi.setData(
          (getStationsApi.data || []).map((c) =>
            c.id == Station.id ? Object.assign(c, Station) : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getStationsApi]
  );

  const deleteStation = useCallback(
    async (ids: number[]) => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) => StationsApi.deleteStation(id))
        );
        getStationsApi.setData([
          ...(getStationsApi.data || []).filter(
            (Station) =>
              !results.find(
                (result, index) =>
                  result.status == "fulfilled" && ids[index] == Station.id
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
    [getStationsApi]
  );

  useEffect(() => {
    if (isAuthenticated) {
      getStationsApi.call(new FormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <StationsContext.Provider
      value={{
        getStationsApi,
        currentStation,

        createStation,
        updateStation,
        deleteStation,
      }}
    >
      {children}
    </StationsContext.Provider>
  );
};

export const useStationsContext = () => useContext(StationsContext);

export default StationsProvider;
