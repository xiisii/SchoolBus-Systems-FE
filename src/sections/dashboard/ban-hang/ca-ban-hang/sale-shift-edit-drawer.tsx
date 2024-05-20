import {
  Grid,
  TextField,
  Stack,
  Typography,
  InputAdornment,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { UsersApi } from "src/api/users";
import AutocompleteTextField from "src/components/autocomplete-textfield";
import CustomDrawer from "src/components/custom-drawer";
import { useStationsContext } from "src/contexts/stations/stations-context";
import useFunction from "src/hooks/use-function";
import {
  SaleShiftDetail,
  initialSaleShift,
  saleShiftSchema,
} from "src/types/sale-shift";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export const SaleShiftEditDrawer = ({
  open,
  onClose,
  saleshift,
}: {
  open: boolean;
  onClose: () => void;
  saleshift?: SaleShiftDetail;
}) => {
  const getUserApi = useFunction(UsersApi.getUsers);
  const users = useMemo(() => {
    return getUserApi.data || [];
  }, [getUserApi.data]);

  const { updateStation, createStation } = useStationsContext();
  const handleSubmit = useCallback(async (values: SaleShiftDetail) => {
    // if (station) {
    //   await updateStation({
    //     ...values,
    //     station_head_name: users.find((u) => u.id == values.station_head_id)
    //       ?.name,
    //   });
    // } else {
    //   await createStation({
    //     ...values,
    //     station_head_name:
    //       users.find((u) => u.id == values.station_head_id)?.name || "",
    //   });
    // }
  }, []);
  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: (saleshift ? "Sửa" : "Thêm") + " ca thành công!",
  });

  const formik = useFormik({
    initialValues: initialSaleShift,
    validationSchema: saleShiftSchema,
    onSubmit: async (values, { resetForm }) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        onClose();
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (open) {
      if (!getUserApi.data) {
        getUserApi.call(new FormData());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (saleshift?.id && open) {
      formik.setValues(saleshift);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleshift?.id, open]);

  return (
    <CustomDrawer
      DrawerProps={{
        open: open,
        onClose: onClose,
      }}
      title={saleshift ? "Sửa" : "Thêm" + " ca"}
      cancelText="Đóng"
      submitText={saleshift ? "Cập nhật" : "Xác nhận thêm"}
      onSubmit={formik.handleSubmit}
    >
      <Stack px={2}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin ca bán hàng</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tên ca bán hàng"
                placeholder="Ví dụ: Ca 1"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="Thời gian mở ca"
                value={new Date()}
                onChange={() => {}}
                renderInput={(props) => (
                  <TextField
                    fullWidth
                    {...props}
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment position="end">
                    //       <CalendarTodayIcon />
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </Stack>
    </CustomDrawer>
  );
};
