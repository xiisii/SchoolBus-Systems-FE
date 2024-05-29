import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { CustomFilterItemConfig } from "src/components/custom-filter";
import { BusInfo } from "src/types/bus-info"; // Thay đổi từ StudentInfo thành BusInfo
import { User } from "src/types/user";
import { FilterOption } from "src/utils/apply-filter";

export interface BusInfoFilter
  extends Pick<BusInfo, "status" | "bus" | "name"> {} // Thay đổi từ StudentInfo thành BusInfo
export type BusInfoFilterConfig = FilterOption<BusInfoFilter, BusInfo> &
  CustomFilterItemConfig<BusInfoFilter>;

const busInfoFilterConfigs: BusInfoFilterConfig[] = [
  {
    compare: "exact",
    target: "bus",
    key: "bus",
    label: "Chuyến xe",
    xs: 6,
    type: "select",
    TextFieldProps: {
      label: "Chọn chuyến xe",
      placeholder: "Tất cả",
    },
    // options: [
    //   { value: "up", label: "Có mặt trên xe" },
    //   { value: "up_true", label: "Lên đúng xe" },
    //   { value: "up_true_down", label: "Đã xuống trạm" },
    // ],
  },
  {
    compare: "exact",
    target: "bus",
    key: "bus",
    label: "Trạng thái",
    xs: 6,
    type: "select",
    TextFieldProps: {
      label: "Chọn trạng thái",
      placeholder: "Tất cả",
    },
    options: [
      { value: "up", label: "Có mặt trên xe" },
      { value: "up_true", label: "Lên đúng xe" },
      { value: "up_true_down", label: "Đã xuống trạm" },
    ],
  },
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

export default busInfoFilterConfigs;
