import { getObjectValue } from "./obj-helper";

export interface DateRange {
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface FilterOption<P, T> {
  compare:
    | "exact"
    | "partial"
    | "range"
    | ((data: T, filterValue: any) => boolean);
  key: keyof P;
  target: string;
}

function compare<P, T>(d: T, f: any, o: FilterOption<P, T>): boolean {
  const dataValue = getObjectValue(d, o.target);
  if (o.compare == "exact") {
    return String(dataValue).toLowerCase() === String(f).toLowerCase();
  }
  if (o.compare == "partial") {
    return String(dataValue).toLowerCase().includes(String(f).toLowerCase());
  }
  if (o.compare == "range") {
    const range = f as DateRange;
    const date = new Date(dataValue as number | string);
    return (
      (!range.startDate || range.startDate.getTime() <= date.getTime()) &&
      (!range.endDate || range.endDate.getTime() >= date.getTime())
    );
  }
  return o.compare(d, f);
}

export function applyFilter<P, T>(
  data: T[],
  filter: Partial<P>,
  options: FilterOption<P, T>[]
) {
  return data.filter((d) =>
    options.every((o) => {
      const isArray = Array.isArray(filter[o.key]);
      if (isArray) {
        const fs = filter[o.key] as any[];
        if (fs.length == 0) {
          return true;
        }
        return fs.some((f) => compare(d, f, o));
      } else {
        if (
          filter[o.key] == undefined ||
          filter[o.key] == null ||
          filter[o.key] == ""
        ) {
          return true;
        }
        return compare(d, filter[o.key], o);
      }
    })
  );
}
