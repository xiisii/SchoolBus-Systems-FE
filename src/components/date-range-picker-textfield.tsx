import { Dialog, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { DateRangePicker } from "mui-daterange-picker";
import viLocale from "date-fns/locale/vi";
import { DateRangePickerWrapperProps } from "mui-daterange-picker/dist/components/DateRangePickerWrapper";
import { CalendarToday } from "@mui/icons-material";

function DateRangePickerTextField(
  props: Omit<DateRangePickerWrapperProps, "toggle" | "open">
) {
  const [inputDialogOpen, setInputDialogOpen] = useState(false);
  return (
    <>
      <TextField
        label="Chọn khoảng thời gian"
        fullWidth
        value={`${
          props.initialDateRange?.startDate?.toLocaleDateString("vi-VN") || ""
        } - ${
          props.initialDateRange?.endDate?.toLocaleDateString("vi-VN") || ""
        }`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarToday />
            </InputAdornment>
          ),
        }}
        onClick={() => {
          setInputDialogOpen(true);
        }}
      />

      <Dialog
        open={inputDialogOpen}
        onClose={() => {
          setInputDialogOpen(false);
        }}
      >
        <DateRangePicker
          definedRanges={[]}
          toggle={() => {
            setInputDialogOpen(!inputDialogOpen);
          }}
          initialDateRange={props.initialDateRange}
          open={inputDialogOpen}
          onChange={(date) => {
            props.onChange(date);
            setInputDialogOpen(false);
          }}
          locale={viLocale}
        />
      </Dialog>
    </>
  );
}

export default DateRangePickerTextField;
