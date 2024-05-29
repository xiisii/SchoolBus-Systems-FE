import { Grid, TextField, Stack, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useCallback, useState } from "react";
import CustomDrawer from "src/components/custom-drawer";
import { useStudentInfoContext } from "src/contexts/student-info/student-info-context"; // Thay đổi từ useDriverInfoContext thành useStudentInfoContext
import {
  StudentInfoDetail,
  initialStudentInfo,
  studentInfoSchema,
} from "src/types/student-info"; // Thay đổi từ DriverInfoDetail, initialDriverInfo, driverInfoSchema thành StudentInfoDetail, initialStudentInfo, studentInfoSchema

export const StudentInfoEditDrawer = ({
  open,
  onClose,
  student,
}: {
  open: boolean;
  onClose: () => void;
  student?: StudentInfoDetail;
}) => {
  const { updateStudentInfo, createStudentInfo, getStudentInfoApi } =
    useStudentInfoContext(); // Thay đổi từ updateDriverInfo thành updateStudentInfo, từ createDriverInfo thành createStudentInfo

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = useCallback(
    async (values: StudentInfoDetail) => {
      try {
        if (student) {
          await updateStudentInfo(values); // Thay đổi từ updateDriverInfo thành updateStudentInfo
        } else {
          await createStudentInfo(values); // Thay đổi từ createDriverInfo thành createStudentInfo
        }
        onClose();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [student, createStudentInfo, updateStudentInfo, onClose]
  );

  const formik = useFormik({
    initialValues: student || initialStudentInfo, // Thay đổi từ initialDriverInfo thành initialStudentInfo
    validationSchema: studentInfoSchema, // Thay đổi từ driverInfoSchema thành studentInfoSchema
    onSubmit: async (values) => {
      // Handle image upload logic if needed here
      await handleSubmit(values);
    },
  });

  useEffect(() => {
    if (open) {
      if (!getStudentInfoApi.data) {
        getStudentInfoApi.call(new FormData());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (student?.id && open) {
      formik.setValues(student);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student?.id, open]);

  return (
    <CustomDrawer
      DrawerProps={{
        open: open,
        onClose: onClose,
      }}
      title={(student ? "Sửa" : "Thêm") + " thông tin học sinh"} // Thay đổi từ "Thêm tài khoản" thành "Thêm thông tin học sinh", từ "Sửa tài khoản" thành "Sửa thông tin học sinh"
      cancelText="Đóng"
      submitText={student ? "Cập nhật" : "Xác nhận thêm"} // Thay đổi từ "Cập nhật" thành "Cập nhật", từ "Xác nhận thêm" thành "Xác nhận thêm"
      onSubmit={formik.handleSubmit}
    >
      <Stack px={2}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin học sinh</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tên"
                placeholder="Nhập tên học sinh"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="lang"
                name="lang"
                label="Vị trí nhà"
                placeholder="Nhập vị trí nhà theo định dạng:  LAT_LNG"
                value={formik.values.lang}
                onChange={formik.handleChange}
                error={formik.touched.lang && !!formik.errors.lang}
                helperText={formik.touched.lang && formik.errors.lang}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="lot"
                name="lot"
                label="Chuyến xe"
                placeholder="Nhập chuyến xe"
                value={formik.values.lot}
                onChange={formik.handleChange}
                error={formik.touched.lot && !!formik.errors.lot}
                helperText={formik.touched.lot && formik.errors.lot}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                id="status"
                name="status"
                label="Trạng thái"
                placeholder="Nhập trạng thái học sinh"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && !!formik.errors.status}
                helperText={formik.touched.status && formik.errors.status}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                sx={{ marginTop: 2 }}
              >
                Tải ảnh lên
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {selectedImage && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {selectedImage.name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Stack>
    </CustomDrawer>
  );
};
