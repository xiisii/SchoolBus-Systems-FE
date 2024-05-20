import { Grid, TextField, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { initial } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { UsersApi } from "src/api/users";
import AutocompleteTextField from "src/components/autocomplete-textfield";
import CustomDrawer from "src/components/custom-drawer";
import { useStationsContext } from "src/contexts/stations/stations-context";
import useFunction from "src/hooks/use-function";
import { PumpDetail, initialPump, PumpSchema } from "src/types/pumps";

export const PumpEditDrawer = ({
  open,
  onClose,
  pump,
}: {
  open: boolean;
  onClose: () => void;
  pump?: PumpDetail;
}) => {
  const getUserApi = useFunction(UsersApi.getUsers);
  const users = useMemo(() => {
    return getUserApi.data || [];
  }, [getUserApi.data]);

  const { updateStation, createStation } = useStationsContext();
  const handleSubmit = useCallback(async (values: PumpDetail) => {
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
    successMessage: (pump ? "Sửa" : "Thêm") + " vòi bơm thành công!",
  });

  const formik = useFormik({
    initialValues: initialPump,
    validationSchema: PumpSchema,
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
    if (pump?.id && open) {
      formik.setValues(pump);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pump?.id, open]);

  return (
    <CustomDrawer
      DrawerProps={{
        open: open,
        onClose: onClose,
      }}
      title={pump ? "Sửa" : "Thêm" + " vòi bơm"}
      cancelText="Đóng"
      submitText={pump ? "Cập nhật" : "Xác nhận thêm"}
      onSubmit={formik.handleSubmit}
    >
      <Stack px={2}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin vời bơm</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tên vòi bơm"
                placeholder="Ví dụ: Vòi 1"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="port"
                name="port"
                label="Sử dụng thiết bị"
                placeholder="Ví dụ: Thiết bị 1"
                value={formik.values.port}
                onChange={formik.handleChange}
                error={formik.touched.port && !!formik.errors.port}
                helperText={formik.touched.port && formik.errors.port}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Mô tả"
                placeholder="Ví dụ: ..."
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description && !!formik.errors.description
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="status"
                name="status"
                label="Trạng thái kết nối"
                placeholder="Ví dụ: Đã kết nối/ Chưa kết nối"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && !!formik.errors.status}
                helperText={formik.touched.status && formik.errors.status}
              />
            </Grid>
          </Grid>
        </form>
      </Stack>
    </CustomDrawer>
  );
};
