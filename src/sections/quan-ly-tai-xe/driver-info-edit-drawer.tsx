import { Grid, TextField, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useCallback } from "react";
import CustomDrawer from "src/components/custom-drawer";
import { useDriverInfoContext } from "src/contexts/driver-info/driver-info-context"; // Thay đổi từ useUsersContext thành useDriverInfoContext
import {
  DriverInfoDetail,
  initialDriverInfo,
  driverInfoSchema,
} from "src/types/driver-info"; // Thay đổi từ UserDetail, initialUser, userSchema thành DriverInfoDetail, initialDriverInfo, driverInfoSchema

export const DriverInfoEditDrawer = ({
  open,
  onClose,
  driver,
}: {
  open: boolean;
  onClose: () => void;
  driver?: DriverInfoDetail;
}) => {
  const { updateDriverInfo, createDriverInfo, getDriverInfoApi } =
    useDriverInfoContext(); // Thay đổi từ updateUser thành updateDriverInfo, từ createUser thành createDriverInfo

  const handleSubmit = useCallback(
    async (values: DriverInfoDetail) => {
      try {
        if (driver) {
          await updateDriverInfo(values); // Thay đổi từ updateUser thành updateDriverInfo
        } else {
          await createDriverInfo(values); // Thay đổi từ createUser thành createDriverInfo
        }
        onClose();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [driver, createDriverInfo, updateDriverInfo, onClose]
  );

  const formik = useFormik({
    initialValues: driver || initialDriverInfo, // Thay đổi từ initialUser thành initialDriverInfo
    validationSchema: driverInfoSchema, // Thay đổi từ userSchema thành driverInfoSchema
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });
  useEffect(() => {
    if (open) {
      if (!getDriverInfoApi.data) {
        getDriverInfoApi.call(new FormData());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (driver?.id && open) {
      formik.setValues(driver);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driver?.id, open]);
  // useEffect(() => {
  //   if (driver && open) {
  //     formik.setValues(driver);
  //   } else {
  //     formik.setValues(initialDriverInfo); // Thay đổi từ initialUser thành initialDriverInfo
  //   }
  // }, [driver, open, formik]);

  return (
    <CustomDrawer
      DrawerProps={{
        open: open,
        onClose: onClose,
      }}
      title={(driver ? "Sửa" : "Thêm") + " thông tin tài xế"} // Thay đổi từ "Thêm tài khoản" thành "Thêm thông tin tài xế", từ "Sửa tài khoản" thành "Sửa thông tin tài xế"
      cancelText="Đóng"
      submitText={driver ? "Cập nhật" : "Xác nhận thêm"} // Thay đổi từ "Cập nhật" thành "Cập nhật", từ "Xác nhận thêm" thành "Xác nhận thêm"
      onSubmit={formik.handleSubmit}
    >
      <Stack px={2}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin tài xế</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tên"
                placeholder="Nhập tên tài xế"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại tài xế"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && !!formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="car"
                name="car"
                label="Chuyến xe chạy"
                placeholder="Nhập thông tin chuyến xe"
                value={formik.values.car}
                onChange={formik.handleChange}
                error={formik.touched.car && !!formik.errors.car}
                helperText={formik.touched.car && formik.errors.car}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="status"
                name="status"
                label="Thống tin chuyến xe"
                placeholder="Nhập thông tin chuyến xe"
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
