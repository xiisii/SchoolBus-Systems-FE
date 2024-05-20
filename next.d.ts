import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { Router } from "next/dist/client/router";
import type {
  AppPropsType,
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";

declare module "next" {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

declare module "next/app" {
  export declare type AppProps<P = any> = AppPropsType<Router, P> & {
    Component: NextPage;
    // emotionCache: EmotionCache;
  };
}
