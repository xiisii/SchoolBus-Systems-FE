import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { CookieValueTypes, OptionsType } from "cookies-next/lib/types";
import ConsoleLogger from "./logger";

/**
 * Defined CookieKeys to use
 */
const CookieHelper = {
  setItem: (
    key: string,
    value: string | object,
    options?: OptionsType | undefined
  ): void => {
    ConsoleLogger.logEvt("Set to cookie");
    return setCookie(key, value, options);
  },

  getItem: (
    key: string,
    options?: OptionsType | undefined
  ): CookieValueTypes => {
    return getCookie(key, options);
  },

  removeItem: (name: string, options?: OptionsType | undefined): void => {
    ConsoleLogger.logEvt("Remove from cookie");
    return deleteCookie(name, options);
  },
};

/**
 * Use for implement keys related to cookie
 */
export enum CookieKeys {
  TOKEN = "token",
}

export default CookieHelper;
