import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useMemo } from "react";
import { CustomFilterItemConfig } from "src/components/custom-filter";
import { BusInfo, BusInfoDetail } from "src/types/bus-info"; // Thay đổi từ StudentInfo thành BusInfo
import { User } from "src/types/user";
import { FilterOption } from "src/utils/apply-filter";

export interface BusInfoFilter
  extends Pick<BusInfoDetail, "status" | "bus" | "name"> {} // Thay đổi từ StudentInfo thành BusInfo
export type BusInfoFilterConfig = FilterOption<BusInfoFilter, BusInfoDetail> &
  CustomFilterItemConfig<BusInfoFilter>;

const getBusInfoFilterConfigs = (
  busInfoData: BusInfoDetail[]
): BusInfoFilterConfig[] => {
  const busOptions = Array.from(
    new Set(busInfoData.map((item) => item.bus))
  ).map((bus) => ({
    value: bus,
    label: `Chuyến xe ${bus}`,
  }));

  const statusOptions = Array.from(
    new Set(busInfoData.map((item) => item.status))
  ).map((status) => ({
    value: status,
    label: status,
  }));
  const nameOptions = Array.from(
    new Set(busInfoData.map((item) => item.name))
  ).map((name) => ({
    value: name,
    label: name,
  }));
  return [
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
      options: busOptions,
    },
    {
      compare: "exact",
      target: "status",
      key: "status",
      label: "Trạng thái",
      xs: 6,
      type: "select",
      TextFieldProps: {
        label: "Chọn trạng thái",
        placeholder: "Tất cả",
      },
      options: statusOptions,
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
      options: nameOptions,
    },
  ];
};

// Sử dụng hàm getBusInfoFilterConfigs trong useMemo

export default getBusInfoFilterConfigs;
