import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { CustomFilterItemConfig } from "src/components/custom-filter";
import { DriverInfo } from "src/types/driver-info";
import { FilterOption } from "src/utils/apply-filter";

export interface DriverInfoFilter extends Pick<DriverInfo, "name" | "phone"> {}
export type DriverInfoFilterConfig = FilterOption<
  DriverInfoFilter,
  DriverInfo
> &
  CustomFilterItemConfig<DriverInfoFilter>;

const getDriverInfoFilterConfigs = (
  driverInfoData: DriverInfo[]
): DriverInfoFilterConfig[] => {
  const nameOptions = Array.from(
    new Set(driverInfoData.map((item) => item.name))
  ).map((name) => ({
    value: name,
    label: name,
  }));

  return [
    {
      compare: "partial",
      target: "name",
      key: "name",
      label: "Tìm kiếm...",
      xs: 12,
      type: "text",
      TextFieldProps: {
        InputProps: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      },
      options: nameOptions,
    },
  ];
};

export default getDriverInfoFilterConfigs;
