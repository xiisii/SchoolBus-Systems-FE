import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useMemo } from "react";
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

const getStudentInfoFilterConfigs = (
  studentInfoData: StudentInfo[]
): StudentInfoFilterConfig[] => {
  const busOptions = Array.from(
    new Set(studentInfoData.map((item) => item.bus))
  ).map((bus) => ({
    value: bus,
    label: `Chuyến xe ${bus}`,
  }));

  const nameOptions = Array.from(
    new Set(studentInfoData.map((item) => item.name))
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
      xs: 4,
      type: "select",
      TextFieldProps: {
        label: "Chọn chuyến xe",
        placeholder: "Tất cả",
      },
      options: busOptions,
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
      options: nameOptions,
    },
  ];
};

export default getStudentInfoFilterConfigs;
