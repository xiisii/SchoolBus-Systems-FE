import { FormatRelativeFnOptions, FormatRelativeToken, Locale } from "date-fns";
import locale from "date-fns/locale/en-US";

const formatDistanceLocale: Record<string, string> = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

export const formatDate = (date: Date): string => {
  if (!date) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};

export const formatDatetime = (date: Date): string => {
  if (!date) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const monthDiff = (d1: Date, d2: Date) => {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

export const nextMonth = (d: Date): Date => {
  if (d.getMonth() == 11) {
    return new Date(d.getFullYear() + 1, 0, 1);
  } else {
    return new Date(d.getFullYear(), d.getMonth() + 1, 1);
  }
};

export const endMonth = (d: Date): Date => {
  if (d.getMonth() == 11) {
    return new Date(new Date(d.getFullYear() + 1, 0, 1).getTime() - 1);
  } else {
    return new Date(
      new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime() - 1
    );
  }
};

export const previousMonth = (d: Date): Date => {
  if (d.getMonth() == 0) {
    return new Date(d.getFullYear() - 1, 11, 1);
  } else {
    return new Date(d.getFullYear(), d.getMonth() - 1, 1);
  }
};

export const startMonth = (d: Date): Date => {
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

export const startDate = (d: Date): Date => {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};
