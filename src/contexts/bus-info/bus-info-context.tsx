import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { BusInfoApi } from "../../api/bus-info/index"; // Thay đổi từ DriverInfoApi thành BusInfoApi
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";
import { BusInfo, BusInfoDetail } from "../../types/bus-info"; // Thay đổi từ DriverInfo và DriverInfoDetail thành BusInfo và BusInfoDetail

interface ContextValue {
  getBusInfoApi: UseFunctionReturnType<FormData, BusInfo[]>; // Thay đổi từ getDriverInfoApi thành getBusInfoApi

  createBusInfo: (
    request: Omit<BusInfoDetail, "id">
  ) => Promise<BusInfoDetail | undefined>; // Thay đổi từ createDriverInfo thành createBusInfo
  updateBusInfo: (busInfo: Partial<BusInfoDetail>) => Promise<void>; // Thay đổi từ updateDriverInfo thành updateBusInfo
  deleteBusInfo: (ids: string[]) => Promise<void>; // Thay đổi từ deleteDriverInfo thành deleteBusInfo
}

export const BusInfoContext = createContext<ContextValue>({
  getBusInfoApi: DEFAULT_FUNCTION_RETURN,

  createBusInfo: async () => undefined,
  updateBusInfo: async () => {},
  deleteBusInfo: async () => {},
});

const BusInfoProvider = ({ children }: { children: ReactNode }) => {
  const getBusInfoApi = useFunction(BusInfoApi.getBusInfoList); // Thay đổi từ getDriverInfoApi thành getBusInfoApi

  const createBusInfo = useCallback(
    async (request: Omit<BusInfoDetail, "id">) => {
      try {
        const id = await BusInfoApi.createBusInfo(request); // Thay đổi từ DriverInfoApi.createDriverInfo thành BusInfoApi.createBusInfo
        if (id) {
          const newBusInfos: BusInfoDetail[] = [
            {
              ...request,
              id: id.toString(),
            },
            ...(getBusInfoApi.data || []),
          ];
          getBusInfoApi.setData(newBusInfos);
          return {
            id: id.toString(),
            ...request,
          };
        }
      } catch (error) {
        throw error;
      }
    },
    [getBusInfoApi]
  );

  const updateBusInfo = useCallback(
    async (busInfo: Partial<BusInfo>) => {
      try {
        await BusInfoApi.updateBusInfo(busInfo); // Thay đổi từ DriverInfoApi.updateDriverInfo thành BusInfoApi.updateBusInfo
        getBusInfoApi.setData(
          (getBusInfoApi.data || []).map((c) =>
            c.id === busInfo.id ? { ...c, ...busInfo } : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getBusInfoApi]
  );

  const deleteBusInfo = useCallback(
    async (ids: string[]) => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) => BusInfoApi.deleteBusInfo(id)) // Thay đổi từ DriverInfoApi.deleteDriverInfo thành BusInfoApi.deleteBusInfo
        );
        getBusInfoApi.setData(
          (getBusInfoApi.data || []).filter(
            (busInfo) =>
              !results.find(
                (result, index) =>
                  result.status === "fulfilled" && ids[index] === busInfo.id
              )
          )
        );
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            throw new Error(
              "Không thể xoá xe buýt có ID: " +
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
    [getBusInfoApi]
  );

  useEffect(() => {
    // Gọi API để lấy danh sách xe buýt khi component được render
    getBusInfoApi.call(new FormData());
  }, [getBusInfoApi]);

  return (
    <BusInfoContext.Provider
      value={{
        getBusInfoApi,

        createBusInfo,
        updateBusInfo,
        deleteBusInfo,
      }}
    >
      {children}
    </BusInfoContext.Provider>
  );
};

export const useBusInfoContext = () => useContext(BusInfoContext);
export default BusInfoProvider;
