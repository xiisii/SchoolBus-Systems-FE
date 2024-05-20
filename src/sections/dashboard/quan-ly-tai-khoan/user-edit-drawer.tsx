import { Grid, TextField, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useMemo, useEffect, useCallback, useState } from "react";
import { PermissionsApi } from "src/api/permissions";
import { StationsApi } from "src/api/stations";
import AutocompleteTextFieldMultiple from "src/components/autocomplete-textfield-multiple";
import AutocompleteTextField from "src/components/autocomplete-textfield";
import CustomDrawer from "src/components/custom-drawer";
import { useUsersContext } from "src/contexts/users/users-context";
import useFunction from "src/hooks/use-function";
import { UserDetail, initialUser, userSchema } from "src/types/user";
import { Station } from "src/types/station";
import { Permission } from "src/types/permission";

export const UserEditDrawer = ({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user?: UserDetail;
}) => {
  const getStationApi = useFunction(StationsApi.getStations);
  const stations = useMemo(() => {
    return getStationApi.data || [];
  }, [getStationApi.data]);
  const stationOptions = useMemo(
    () =>
      stations.map((station) => ({ value: station.id, label: station.name })),
    [stations]
  );
  const [selectedStationOptions, setSelectedStationOptions] = useState<
    { value: Station["id"]; label: string }[]
  >([]);

  // const getPermissionApi = useFunction(PermissionsApi.getPermissions);
  // const permissions = useMemo(() => {
  //   return getPermissionApi.data || [];
  // }, [getPermissionApi.data]);

  const [selectedPermissionOption, setSelectedPermissionOption] =
    useState<Permission["id"]>();

  const { updateUser, createUser } = useUsersContext();
  const handleSubmit = useCallback(
    async (values: UserDetail) => {
      let user_id: number = user?.id || 0;
      const userDetail = {
        // ...values,
        // permissions: selectedPermissionOption
        //   ? [
        //       {
        //         id: selectedPermissionOption,
        //         name:
        //           permissions.find((p) => p.id == selectedPermissionOption)
        //             ?.name || "",
        //       },
        //     ]
        //   : [],
        // stations: selectedStationOptions.map((sso) => ({
        //   id: sso.value,
        //   name: sso.label,
        //   address:
        //     stations.find((station) => station.id == sso.value)?.address ||
        //     "--",
        // })),
      };
      if (user) {
        await updateUser(userDetail);
      } else {
        // const user = await createUser(userDetail);
        // user_id = user?.id || 0;
      }
    },
    [
      // selectedPermissionOption,
      // selectedStationOptions,
      user,
      updateUser,
      //  permissions,
      // stations,
      // createUser,
    ]
  );
  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: (user ? "Sửa" : "Thêm") + "tài khoản thành công!",
  });

  const formik = useFormik({
    initialValues: initialUser,
    validationSchema: userSchema,
    onSubmit: async (values, { resetForm }) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        onClose();
        resetForm();
      }
    },
  });

  // useEffect(() => {
  //   setSelectedStationOptions(
  //     stationOptions.filter((so) =>
  //       (formik.values.stations || []).some((s) => s.id == so.value)
  //     )
  //   );
  // }, [formik.values.stations, stationOptions]);

  // useEffect(() => {
  //   setSelectedPermissionOption(formik.values.permissions?.[0]?.id);
  // }, [formik.values.permissions, permissionOptions]);

  useEffect(() => {
    // if (!getPermissionApi.data) {
    //   getPermissionApi.call(new FormData());
    // }
    if (!getStationApi.data) {
      getStationApi.call(new FormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.id && open) {
      formik.setValues(user);
    } else {
      formik.setValues(initialUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, open]);

  return (
    <CustomDrawer
      DrawerProps={{
        open: open,
        onClose: onClose,
      }}
      title={(user ? "Sửa" : "Thêm") + " tài khoản"}
      cancelText="Đóng"
      submitText={user ? "Cập nhật" : "Xác nhận thêm"}
      onSubmit={formik.handleSubmit}
    >
      <Stack px={2}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin tài khoản</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Tài khoản"
                placeholder="Ví dụ: tentaikhoan123"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Mật khẩu"
                placeholder="Nhập..."
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tên khách hàng"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tên công ty"
                placeholder="Ví dụ: TNHH"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Mã số thuế"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="SĐT"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Email"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Địa chỉ"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
          </Grid>
        </form>
      </Stack>
    </CustomDrawer>
  );
};
