import { Grid, TextField, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { UsersApi } from "src/api/users";
import AutocompleteTextField from "src/components/autocomplete-textfield";
import CustomDrawer from "src/components/custom-drawer";
import { useStationsContext } from "src/contexts/stations/stations-context";
import useFunction from "src/hooks/use-function";
import {
  StationDetail,
  initialStation,
  stationSchema,
} from "src/types/station";

export const StationEditDrawer = ({
  open,
  onClose,
  station,
}: {
  open: boolean;
  onClose: () => void;
  station?: StationDetail;
}) => {
  const getUserApi = useFunction(UsersApi.getUsers);
  const users = useMemo(() => {
    return getUserApi.data || [];
  }, [getUserApi.data]);

  const { updateStation, createStation } = useStationsContext();
  const handleSubmit = useCallback(
    async (values: StationDetail) => {
      if (station) {
        await updateStation({
          ...values,
          station_head_name: users.find((u) => u.id == values.station_head_id)
            ?.name,
        });
      } else {
        await createStation({
          ...values,
          station_head_name:
            users.find((u) => u.id == values.station_head_id)?.name || "",
        });
      }
    },
    [createStation, station, updateStation, users]
  );
  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: (station ? "Sửa" : "Thêm") + " trạm thành công!",
  });

  const formik = useFormik({
    initialValues: initialStation,
    validationSchema: stationSchema,
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
    if (station?.id && open) {
      formik.setValues(station);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [station?.id, open]);

  return (
    <CustomDrawer
      DrawerProps={{
        open: open,
        onClose: onClose,
      }}
      title={station ? "Sửa" : "Thêm" + " cửa hàng"}
      cancelText="Đóng"
      submitText={station ? "Cập nhật" : "Xác nhận thêm"}
      onSubmit={formik.handleSubmit}
    >
      <Stack px={2}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin trạm</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tên trạm"
                placeholder="Ví dụ: Trạm cân số 1"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Địa chỉ"
                placeholder="Ví dụ: 123 Nguyễn Công Trứ, Bình Dương"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && !!formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <AutocompleteTextField
                key={(station ? formik.values.id : "") + String(users)}
                TextFieldProps={{
                  fullWidth: true,
                  id: "station_head_id",
                  name: "station_head_id",
                  label: "Trưởng trạm",
                  placeholder: "Chọn trưởng trạm",
                  error:
                    formik.touched.station_head_id &&
                    !!formik.errors.station_head_id,
                  helperText:
                    formik.touched.station_head_id &&
                    formik.errors.station_head_id,
                }}
                value={formik.values.station_head_id}
                onChange={(value) =>
                  formik.setFieldValue("station_head_id", value)
                }
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name || "",
                }))}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="num_staff"
                name="num_staff"
                label="Số lượng nhân viên"
                placeholder="Ví dụ: 3"
                value={formik.values.num_staff}
                onChange={formik.handleChange}
                error={formik.touched.num_staff && !!formik.errors.num_staff}
                helperText={formik.touched.num_staff && formik.errors.num_staff}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <AutocompleteTextField
                TextFieldProps={{
                  fullWidth: true,
                  id: "type",
                  name: "type",
                  label: "Loại trạm",
                  placeholder: "Chọn loại trạm",
                  error: formik.touched.type && !!formik.errors.type,
                  helperText: formik.touched.type && formik.errors.type,
                }}
                value={formik.values.type}
                onChange={(value) => formik.setFieldValue("type", value)}
                options={[
                  { value: "brick", label: "Trạm cân gạch" },
                  { value: "stone", label: "Trạm cân đá" },
                ]}
              />
            </Grid>
          </Grid>
        </form>
      </Stack>
    </CustomDrawer>
  );
};
