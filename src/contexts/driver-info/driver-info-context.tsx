import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { DriverInfoApi } from "../../api/driver-info/index"; // Thay đổi từ StudentInfoApi thành DriverInfoApi
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";
import { DriverInfo, DriverInfoDetail } from "../../types/driver-info"; // Thay đổi từ StudentInfo và StudentInfoDetail thành DriverInfo và DriverInfoDetail

interface ContextValue {
  getDriverInfoApi: UseFunctionReturnType<FormData, DriverInfo[]>; // Thay đổi từ getStudentInfoApi thành getDriverInfoApi

  createDriverInfo: (
    requests: Omit<DriverInfoDetail, "id">
  ) => Promise<DriverInfoDetail | undefined>; // Thay đổi từ createStudentInfo thành createDriverInfo
  updateDriverInfo: (driverInfo: Partial<DriverInfoDetail>) => Promise<void>; // Thay đổi từ updateStudentInfo thành updateDriverInfo
  deleteDriverInfo: (ids: string[]) => Promise<void>; // Thay đổi từ deleteStudentInfo thành deleteDriverInfo
}

export const DriverInfoContext = createContext<ContextValue>({
  getDriverInfoApi: DEFAULT_FUNCTION_RETURN,

  createDriverInfo: async () => undefined,
  updateDriverInfo: async () => {},
  deleteDriverInfo: async () => {},
});

const DriverInfoProvider = ({ children }: { children: ReactNode }) => {
  const getDriverInfoApi = useFunction(DriverInfoApi.getDriverInfoList); // Thay đổi từ getStudentInfoApi thành getDriverInfoApi

  const createDriverInfo = useCallback(
    async (request: Omit<DriverInfoDetail, "id">) => {
      try {
        const id = await DriverInfoApi.createDriverInfo(request); // Thay đổi từ StudentInfoApi.createStudentInfo thành DriverInfoApi.createDriverInfo
        if (id) {
          const newDriverInfos: DriverInfoDetail[] = [
            {
              ...request,
              id: id.toString(),
            },
            ...(getDriverInfoApi.data || []),
          ];
          getDriverInfoApi.setData(newDriverInfos);
          return {
            id: id.toString(),
            ...request,
          };
        }
      } catch (error) {
        throw error;
      }
    },
    [getDriverInfoApi]
  );

  const updateDriverInfo = useCallback(
    async (driverInfo: Partial<DriverInfo>) => {
      try {
        await DriverInfoApi.updateDriverInfo(driverInfo); // Thay đổi từ StudentInfoApi.updateStudentInfo thành DriverInfoApi.updateDriverInfo
        getDriverInfoApi.setData(
          (getDriverInfoApi.data || []).map((c) =>
            c.id === driverInfo.id ? { ...c, ...driverInfo } : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getDriverInfoApi]
  );

  const deleteDriverInfo = useCallback(
    async (ids: string[]) => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) => DriverInfoApi.deleteDriverInfo(id)) // Thay đổi từ StudentInfoApi.deleteStudentInfo thành DriverInfoApi.deleteDriverInfo
        );
        getDriverInfoApi.setData(
          (getDriverInfoApi.data || []).filter(
            (driverInfo) =>
              !results.find(
                (result, index) =>
                  result.status === "fulfilled" && ids[index] === driverInfo.id
              )
          )
        );
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            throw new Error(
              "Không thể xoá tài xế có ID: " +
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
    [getDriverInfoApi]
  );

  useEffect(() => {
    // Gọi API để lấy danh sách tài xế khi component được render
    getDriverInfoApi.call(new FormData());
  }, [getDriverInfoApi]);

  return (
    <DriverInfoContext.Provider
      value={{
        getDriverInfoApi,

        createDriverInfo,
        updateDriverInfo,
        deleteDriverInfo,
      }}
    >
      {children}
    </DriverInfoContext.Provider>
  );
};

export const useDriverInfoContext = () => useContext(DriverInfoContext);
export default DriverInfoProvider;
