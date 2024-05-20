import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { CustomFilterItemConfig } from "src/components/custom-filter";
import { User } from "src/types/user";
import { FilterOption } from "src/utils/apply-filter";

export interface UserFilter extends Pick<User, "code" | "name"> {}
export type UserFilterConfig = FilterOption<UserFilter, User> &
  CustomFilterItemConfig<UserFilter>;

const userFilterConfigs: UserFilterConfig[] = [
  // {
  //   compare: "exact",
  //   target: "station_type",
  //   key: "station_type",
  //   label: "Trạm",
  //   xs: 3,
  //   type: "select",
  //   TextFieldProps: {
  //     label: "Trạm",
  //     placeholder: "Tất cả",
  //   },
  //   options: [
  //     { value: "brick", label: "Trạm cân gạch" },
  //     { value: "stone", label: "Trạm cân đá" },
  //   ],
  // },
  {
    compare: "partial",
    target: "name",
    key: "name",
    label: "Tìm kiếm...",
    xs: 7,
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

export default userFilterConfigs;
