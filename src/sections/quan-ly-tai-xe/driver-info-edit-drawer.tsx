import { Grid, TextField, Stack, Typography, MenuItem, } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useCallback, useState } from "react";
import AutocompleteTextField from "src/components/autocomplete-textfield";
import CustomDrawer from "src/components/custom-drawer";
import { useDriverInfoContext } from "src/contexts/driver-info/driver-info-context"; // Thay đổi từ useUsersContext thành useDriverInfoContext
import useFunction from "src/hooks/use-function";
import {
  DriverInfoDetail,
  initialDriverInfo,
  driverInfoSchema,
} from "src/types/driver-info"; // Thay đổi từ UserDetail, initialUser, userSchema thành DriverInfoDetail, initialDriverInfo, driverInfoSchema
import { v4 as uuidv4 } from "uuid";

export const DriverInfoEditDrawer = ({
  open,
  onClose,
  driver,
  onAddDriver,
  onUpdateDriver,
  sampleDriverInfo,
}: {
  open: boolean;
  onClose: () => void;
  driver?: DriverInfoDetail;
  onAddDriver: (student: DriverInfoDetail) => void;
  onUpdateDriver: (student: DriverInfoDetail) => void;
  sampleDriverInfo: DriverInfoDetail[]; 
}) => {
  const { updateDriverInfo, createDriverInfo, getDriverInfoApi } =
    useDriverInfoContext(); // Thay đổi từ updateUser thành updateDriverInfo, từ createUser thành createDriverInfo

  const [statusValue, setStatusValue] = useState<string>("");
  
  const handleSubmit = useCallback(
    async (values: DriverInfoDetail) => {
      try {
        if (driver) {
          onUpdateDriver(values);
        } else {
          const newDriver = { ...values, id: uuidv4() };
          onAddDriver(newDriver); 
        }
        onClose();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [driver, createDriverInfo, updateDriverInfo, onClose, onAddDriver]
  );

  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: (driver ? "Sửa" : "Thêm") + " tài xế thành công!",
  });

  const formik = useFormik({
    initialValues: initialDriverInfo, // Thay đổi từ initialUser thành initialDriverInfo
    validationSchema: driverInfoSchema, // Thay đổi từ userSchema thành driverInfoSchema
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
      if (!getDriverInfoApi.data) {
        getDriverInfoApi.call(new FormData());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const driverExists = sampleDriverInfo.some((s) => s.id === driver?.id);
    if (driver?.id && open) {
      formik.setValues(driver);
    }
    if (!driver && !driverExists && open) {
      formik.setValues(initialDriverInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driver?.id, open]);
 
  const uniqueBuses = Array.from(
    new Set(sampleDriverInfo.map((driver) => driver.bus))
  );

  const handleStatus = (event: any) => {
    setStatusValue(event);
  };

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
                id="bus"
                name="bus"
                label="Chuyến xe"
                placeholder="Nhập chuyến xe của tài xế"
                value={formik.values.bus}
                onChange={formik.handleChange}
                error={formik.touched.bus && !!formik.errors.bus}
                helperText={formik.touched.bus && formik.errors.bus}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                id="status"
                name="status"
                label="Trạng thái"
                value={formik.values.status}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleStatus(e.target.value);
                }}
              >
                <MenuItem value={"Hoạt động"}>Hoạt động</MenuItem>
                <MenuItem value={"Không hoạt động"}>Không hoạt động</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </CustomDrawer>
  );
};
