import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { UsersApi } from "src/api/users";
import { useAuth } from "src/hooks/use-auth";
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "src/hooks/use-function";
import { User, UserDetail } from "src/types/user";

interface ContextValue {
  getUsersApi: UseFunctionReturnType<FormData, UserDetail[]>;

  createUser: (
    requests: Omit<UserDetail, "id">
  ) => Promise<UserDetail | undefined>;
  updateUser: (User: Partial<UserDetail>) => Promise<void>;
  deleteUser: (ids: number[]) => Promise<void>;
}

export const UsersContext = createContext<ContextValue>({
  getUsersApi: DEFAULT_FUNCTION_RETURN,

  createUser: async () => undefined,
  updateUser: async () => {},
  deleteUser: async () => {},
});

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const getUsersApi = useFunction(UsersApi.getUsers);

  const createUser = useCallback(
    async (request: Omit<UserDetail, "id">) => {
      try {
        const id = await UsersApi.postUser(request);
        if (id) {
          const newUsers: UserDetail[] = [
            {
              ...request,
              id: id,
            },
            ...(getUsersApi.data || []),
          ];
          getUsersApi.setData(newUsers);
          return {
            id: id,
            ...request,
          };
        }
      } catch (error) {
        throw error;
      }
    },
    [getUsersApi]
  );

  const updateUser = useCallback(
    async (user: Partial<User>) => {
      try {
        await UsersApi.putUser(user);
        getUsersApi.setData(
          (getUsersApi.data || []).map((c) =>
            c.id == user.id ? Object.assign(c, user) : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getUsersApi]
  );

  const deleteUser = useCallback(
    async (ids: number[]) => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) => UsersApi.deleteUser(id))
        );
        getUsersApi.setData([
          ...(getUsersApi.data || []).filter(
            (user) =>
              !results.find(
                (result, index) =>
                  result.status == "fulfilled" && ids[index] == user.id
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
    [getUsersApi]
  );

  useEffect(() => {
    if (isAuthenticated) {
      getUsersApi.call(new FormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <UsersContext.Provider
      value={{
        getUsersApi,

        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);

export default UsersProvider;
