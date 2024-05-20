import _ from "lodash";

export const getObjectValue = (
  data: any,
  key: string | number | symbol
): any => {
  if (!data) {
    return undefined;
  }

  if (typeof key != "string") {
    return data[key];
  }

  const dotIndex = key.indexOf(".");
  const bracketIndex = key.indexOf("[");

  if (bracketIndex >= 0) {
    const arrayKey = key.substring(0, bracketIndex);

    if (Array.isArray(data[arrayKey])) {
      const closeBracketIndex = key.indexOf("]");
      const suffix = key.substring(closeBracketIndex + 2);
      const remainingKey = key.substring(bracketIndex + 1, closeBracketIndex);
      const arrayIndex = parseInt(remainingKey);
      return getObjectValue(data[arrayKey][arrayIndex], suffix);
    } else {
      return data[arrayKey];
    }
  } else if (dotIndex >= 0) {
    const prefix = key.substring(0, dotIndex);
    const suffix = key.substring(dotIndex + 1);
    return getObjectValue(data[prefix], suffix);
  } else {
    return data[key];
  }
};

export function trimStringOrObject<T extends string | object | string[]>(
  input: T
): T {
  if (typeof input === "string") {
    return input.trim() as T;
  } else if (Array.isArray(input)) {
    return trimArray(input) as T;
  } else {
    return trimObject(input) as T;
  }
}

export function trimObject(input: object): object {
  const newObj: { [key: string]: unknown } = {};
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "string") {
      newObj[key] = value.trim();
    } else if (typeof value === "object") {
      newObj[key] = trimStringOrObject(value);
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
}

export function trimArray(input: string[]): string[] {
  const newArr = [];
  for (const value of input) {
    if (typeof value === "string") {
      newArr.push(value.trim());
    } else if (typeof value === "object") {
      newArr.push(trimStringOrObject(value));
    } else {
      newArr.push(value);
    }
  }
  return newArr;
}
