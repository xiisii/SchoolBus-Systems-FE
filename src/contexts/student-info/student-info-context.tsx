import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { StudentInfoApi } from "../../api/student-info/index"; // Đổi từ UsersApi thành StudentInfoApi
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";
import { StudentInfo, StudentInfoDetail } from "../../types/student-info"; // Đổi từ User và UserDetail thành StudentInfo và StudentInfoDetail

interface ContextValue {
  getStudentInfoApi: UseFunctionReturnType<FormData, StudentInfo[]>; // Thay đổi từ getUsersApi thành getStudentInfoApi

  createStudentInfo: (
    requests: Omit<StudentInfoDetail, "id">
  ) => Promise<StudentInfoDetail | undefined>; // Thay đổi từ createUser thành createStudentInfo
  updateStudentInfo: (studentInfo: Partial<StudentInfoDetail>) => Promise<void>; // Thay đổi từ updateUser thành updateStudentInfo
  deleteStudentInfo: (ids: string[]) => Promise<void>; // Thay đổi từ deleteUser thành deleteStudentInfo
}

export const StudentInfoContext = createContext<ContextValue>({
  getStudentInfoApi: DEFAULT_FUNCTION_RETURN,

  createStudentInfo: async () => undefined,
  updateStudentInfo: async () => {},
  deleteStudentInfo: async () => {},
});

const StudentInfoProvider = ({ children }: { children: ReactNode }) => {
  const getStudentInfoApi = useFunction(StudentInfoApi.getStudentInfoList); // Thay đổi từ getUsersApi thành getStudentInfoApi

  const createStudentInfo = useCallback(
    async (request: Omit<StudentInfoDetail, "id">) => {
      try {
        const id = await StudentInfoApi.createStudentInfo(request); // Thay đổi từ UsersApi.postUser thành StudentInfoApi.createStudentInfo
        if (id) {
          const newStudentInfos: StudentInfoDetail[] = [
            {
              ...request,
              id: id.toString(),
            },
            ...(getStudentInfoApi.data || []),
          ];
          getStudentInfoApi.setData(newStudentInfos);
          return {
            id: id.toString(),
            ...request,
          };
        }
      } catch (error) {
        throw error;
      }
    },
    [getStudentInfoApi]
  );

  const updateStudentInfo = useCallback(
    async (studentInfo: Partial<StudentInfo>) => {
      try {
        await StudentInfoApi.updateStudentInfo(studentInfo); // Thay đổi từ UsersApi.putUser thành StudentInfoApi.updateStudentInfo
        getStudentInfoApi.setData(
          (getStudentInfoApi.data || []).map((c) =>
            c.id === studentInfo.id ? { ...c, ...studentInfo } : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getStudentInfoApi]
  );

  const deleteStudentInfo = useCallback(
    async (ids: string[]) => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) => StudentInfoApi.deleteStudentInfo(id)) // Thay đổi từ UsersApi.deleteUser thành StudentInfoApi.deleteStudentInfo
        );
        getStudentInfoApi.setData(
          (getStudentInfoApi.data || []).filter(
            (studentInfo) =>
              !results.find(
                (result, index) =>
                  result.status === "fulfilled" && ids[index] === studentInfo.id
              )
          )
        );
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            throw new Error(
              "Không thể xoá sinh viên có ID: " +
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
    [getStudentInfoApi]
  );

  useEffect(() => {
    // Gọi API để lấy danh sách sinh viên khi component được render
    getStudentInfoApi.call(new FormData());
  }, [getStudentInfoApi]);

  return (
    <StudentInfoContext.Provider
      value={{
        getStudentInfoApi,

        createStudentInfo,
        updateStudentInfo,
        deleteStudentInfo,
      }}
    >
      {children}
    </StudentInfoContext.Provider>
  );
};

export const useStudentInfoContext = () => useContext(StudentInfoContext);
export default StudentInfoProvider;
