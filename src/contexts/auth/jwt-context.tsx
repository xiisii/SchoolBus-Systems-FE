import type { FC, ReactNode } from "react";
import { createContext, useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { UsersApi } from "src/api/users";
import type { UserDetail } from "src/types/user";
import { Issuer } from "src/utils/auth";
import CookieHelper, { CookieKeys } from "src/utils/cookie-helper";
import { useRouter } from "next/router";
import { paths } from "src/paths";

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: UserDetail | null;
}

enum ActionType {
  INITIALIZE = "INITIALIZE",
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: UserDetail | null;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    user: UserDetail;
  };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    user: UserDetail;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action = InitializeAction | SignInAction | SignUpAction | SignOutAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthContextType extends State {
  issuer: Issuer.JWT;
  signIn: (email: string, password: string) => Promise<UserDetail | undefined>;
  signUp: (
    email: string,
    user_name: string,
    full_name: string,
    password: string,
    confirm_password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(undefined),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const accessToken = localStorage.getItem(CookieKeys.TOKEN);

      if (accessToken) {
        let user: UserDetail | undefined = undefined;
        try {
          user = await UsersApi.me();
        } catch {}
        if (!user) {
          user = await JSON.parse(localStorage.getItem("user_data") || "{}");
          if (!user || !user.id || !user.role || !user.name) {
            throw new Error("Ger user failed.");
          }
        }
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (user_name: string, password: string): Promise<UserDetail> => {
      const response = await UsersApi.signIn({ user_name, password });

      localStorage.setItem(CookieKeys.TOKEN, response.token);
      localStorage.setItem("user_data", JSON.stringify(response.data));

      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user: response.data,
        },
      });
      return response.data;
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (
      email: string,
      user_name: string,
      full_name: string,
      password: string,
      confirm_password: string
    ): Promise<void> => {
      const { accessToken } = await UsersApi.signUp({
        email,
        user_name,
        password,
        full_name,
        confirm_password,
      });
      // const user = await UsersApi.me({ accessToken });

      // sessionStorage.setItem(STORAGE_KEY, accessToken);

      // dispatch({
      //   type: ActionType.SIGN_UP,
      //   payload: {
      //     user,
      //   },
      // });
    },
    []
  );

  const signOut = useCallback(async (): Promise<void> => {
    CookieHelper.removeItem(CookieKeys.TOKEN);
    dispatch({ type: ActionType.SIGN_OUT });
    router.push(paths.auth.login);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
