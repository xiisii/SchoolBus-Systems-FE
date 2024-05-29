import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { CustomFilterItemConfig } from "src/components/custom-filter";
import { DriverInfo } from "src/types/driver-info";
import { StudentInfo } from "src/types/student-info";
import { User } from "src/types/user";
import { FilterOption } from "src/utils/apply-filter";

export interface DriverInfoFilter extends Pick<DriverInfo, "name" | "phone"> {}
export type DriverInfoFilterConfig = FilterOption<
  DriverInfoFilter,
  DriverInfo
> &
  CustomFilterItemConfig<DriverInfoFilter>;

const driverInfoFilterConfigs: DriverInfoFilterConfig[] = [
  // {
  //   compare: "exact",
  //   target: "name",
  //   key: "name",
  //   label: "Tên",
  //   xs: 3,
  //   type: "select",
  //   TextFieldProps: {
  //     label: "Tên",
  //     placeholder: "Tất cả",
  //   },
  //   // options: [
  //   //   { value: "brick", label: "Trạm cân gạch" },
  //   //   { value: "stone", label: "Trạm cân đá" },
  //   // ],
  // },
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
  },
];

export default driverInfoFilterConfigs;
