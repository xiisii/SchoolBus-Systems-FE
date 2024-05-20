import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { CustomFilterItemConfig } from "src/components/custom-filter";
import { SaleShift } from "src/types/sale-shift";
import { Station } from "src/types/station";
import { FilterOption } from "src/utils/apply-filter";

export interface SaleShiftFilter extends Pick<SaleShift, "employee" | "name"> {}
export type SaleShiftFilterConfig = FilterOption<SaleShiftFilter, SaleShift> &
  CustomFilterItemConfig<SaleShiftFilter>;

const saleShiftFilterConfigs: SaleShiftFilterConfig[] = [
  // {
  //   compare: "exact",
  //   target: "type",
  //   key: "type",
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

export default saleShiftFilterConfigs;
