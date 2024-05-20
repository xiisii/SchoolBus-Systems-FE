import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { CustomFilterItemConfig } from "src/components/custom-filter";
import { Station } from "src/types/station";
import { FilterOption } from "src/utils/apply-filter";

export interface StationFilter extends Pick<Station, "type" | "name"> {}
export type StationFilterConfig = FilterOption<StationFilter, Station> &
  CustomFilterItemConfig<StationFilter>;

const stationFilterConfigs: StationFilterConfig[] = [
  {
    compare: "exact",
    target: "type",
    key: "type",
    label: "Trạm",
    xs: 3,
    type: "select",
    TextFieldProps: {
      label: "Trạm",
      placeholder: "Tất cả",
    },
    options: [
      { value: "brick", label: "Trạm cân gạch" },
      { value: "stone", label: "Trạm cân đá" },
    ],
  },
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

export default stationFilterConfigs;
