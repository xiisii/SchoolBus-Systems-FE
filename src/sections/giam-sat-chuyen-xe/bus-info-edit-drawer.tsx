import { Grid, TextField, Stack, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useCallback } from "react";
import CustomDrawer from "src/components/custom-drawer";
import { useBusInfoContext } from "src/contexts/bus-info/bus-info-context";
import {
  BusInfoDetail,
  initialBusInfo,
  BusInfoSchema,
} from "src/types/bus-info";

export const BusInfoEditDrawer = ({
  open,
  onClose,
  busInfo,
}: {
  open: boolean;
  onClose: () => void;
  busInfo?: BusInfoDetail;
}) => {
  const { updateBusInfo, createBusInfo, getBusInfoApi } = useBusInfoContext();

  const handleSubmit = useCallback(
    async (values: BusInfoDetail) => {
      try {
        if (busInfo) {
          await updateBusInfo(values);
        } else {
          await createBusInfo(values);
        }
        onClose();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [busInfo, createBusInfo, updateBusInfo, onClose]
  );

  const formik = useFormik({
    initialValues: busInfo || initialBusInfo,
    validationSchema: BusInfoSchema,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  useEffect(() => {
    if (open) {
      if (!getBusInfoApi.data) {
        getBusInfoApi.call(new FormData());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (busInfo?.id && open) {
      formik.setValues(busInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busInfo?.id, open]);

  return (
    <CustomDrawer
      DrawerProps={{
        open: open,
        onClose: onClose,
      }}
      title={(busInfo ? "Sửa" : "Thêm") + " thông tin xe buýt"}
      cancelText="Đóng"
      submitText={busInfo ? "Cập nhật" : "Xác nhận thêm"}
      onSubmit={formik.handleSubmit}
    >
      <Stack px={2}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin xe buýt</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tên"
                placeholder="Nhập tên xe buýt"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="status"
                name="status"
                label="Trạng thái"
                placeholder="Nhập trạng thái xe buýt"
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
