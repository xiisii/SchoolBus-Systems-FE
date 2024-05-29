import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { CustomFilterItemConfig } from "src/components/custom-filter";
import { StudentInfo } from "src/types/student-info";
import { User } from "src/types/user";
import { FilterOption } from "src/utils/apply-filter";

export interface StudentInfoFilter extends Pick<StudentInfo, "bus" | "name"> {}
export type StudentInfoFilterConfig = FilterOption<
  StudentInfoFilter,
  StudentInfo
> &
  CustomFilterItemConfig<StudentInfoFilter>;

const studentInfoFilterConfigs: StudentInfoFilterConfig[] = [
  {
    compare: "exact",
    target: "bus",
    key: "bus",
    label: "Chuyến xe",
    xs: 4,
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
    compare: "partial",
    target: "name",
    key: "name",
    label: "Tìm kiếm...",
    xs: 8,
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

export default studentInfoFilterConfigs;
