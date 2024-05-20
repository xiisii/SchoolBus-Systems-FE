import { Grid, GridProps, TextField, TextFieldProps } from "@mui/material";
import { DateRange } from "mui-daterange-picker";
import AutocompleteTextField from "./autocomplete-textfield";
import DateRangePickerTextField from "./date-range-picker-textfield";
import AutocompleteTextFieldMultiple from "./autocomplete-textfield-multiple";

export interface CustomFilterItemConfig<T> {
  key: keyof T;
  label: string;
  xs: GridProps["xs"];
  type: "text" | "select" | "range" | "select-multiple";
  TextFieldProps?: TextFieldProps;
  options?: { value: any; label: string }[];
  hide?: boolean;
}

function CustomFilter<T>({
  filter,
  onChange,
  configs,
}: {
  filter: Partial<T>;
  onChange: (filter: Partial<T>) => void;
  configs: CustomFilterItemConfig<T>[];
}) {
  return (
    <Grid container spacing={2}>
      {configs
        .filter((c) => !c.hide)
        .map((config) => {
          if (config.type == "text") {
            return (
              <Grid item xs={config.xs} key={String(config.key)}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={filter[config.key] || undefined}
                  placeholder="Tìm kiếm ..."
                  onChange={(e) =>
                    onChange({ ...filter, [config.key]: e.target.value })
                  }
                  {...config.TextFieldProps}
                />
              </Grid>
            );
          } else if (config.type == "select") {
            return (
              <Grid item xs={config.xs} key={String(config.key)}>
                <AutocompleteTextField
                  TextFieldProps={{
                    fullWidth: true,
                    ...config.TextFieldProps,
                  }}
                  value={filter[config.key] || ""}
                  onChange={(value) =>
                    onChange({ ...filter, [config.key]: value })
                  }
                  options={config.options || []}
                />
              </Grid>
            );
          } else if (config.type == "select-multiple") {
            return (
              <Grid item xs={config.xs} key={String(config.key)}>
                <AutocompleteTextFieldMultiple
                  TextFieldProps={{
                    fullWidth: true,
                    ...config.TextFieldProps,
                  }}
                  value={((filter[config.key] as any[]) || []).map((v) =>
                    config.options?.find((o) => o.value == v)
                  )}
                  onChange={(values) =>
                    onChange({
                      ...filter,
                      [config.key]: values.map((v: any) => v.value),
                    })
                  }
                  options={config.options || []}
                />
              </Grid>
            );
          } else if (config.type == "range") {
            return (
              <Grid item xs={config.xs} key={String(config.key)}>
                <DateRangePickerTextField
                  initialDateRange={filter[config.key] as DateRange}
                  onChange={(value) =>
                    onChange({ ...filter, [config.key]: value })
                  }
                />
              </Grid>
            );
          }
        })}
    </Grid>
  );
}

export default CustomFilter;
