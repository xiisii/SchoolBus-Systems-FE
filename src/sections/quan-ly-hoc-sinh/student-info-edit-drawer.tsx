import { Grid, TextField, Stack, Typography, Button, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useCallback, useState } from "react";
import AutocompleteTextField from "src/components/autocomplete-textfield";
import CustomDrawer from "src/components/custom-drawer";
import { useStudentInfoContext } from "src/contexts/student-info/student-info-context"; // Thay đổi từ useDriverInfoContext thành useStudentInfoContext
import useFunction from "src/hooks/use-function";
import {
  StudentInfoDetail,
  initialStudentInfo,
  studentInfoSchema,
} from "src/types/student-info"; // Thay đổi từ DriverInfoDetail, initialDriverInfo, driverInfoSchema thành StudentInfoDetail, initialStudentInfo, studentInfoSchema
import { v4 as uuidv4 } from "uuid";

export const StudentInfoEditDrawer = ({
  open,
  onClose,
  student,
  onAddStudent,
  onUpdateStudent,
  sampleStudentInfo, // Add the sampleStudentInfo prop
}: {
  open: boolean;
  onClose: () => void;
  student?: StudentInfoDetail;
  onAddStudent: (student: StudentInfoDetail) => void;
  onUpdateStudent: (student: StudentInfoDetail) => void;

  sampleStudentInfo: StudentInfoDetail[]; // Add the sampleStudentInfo prop
}) => {
  const { updateStudentInfo, createStudentInfo, getStudentInfoApi } =
    useStudentInfoContext(); // Thay đổi từ updateDriverInfo thành updateStudentInfo, từ createDriverInfo thành createStudentInfo

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(
    null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [statusValue, setStatusValue] = useState<string>("");

  const handleSubmit = useCallback(
    async (values: StudentInfoDetail) => {
      try {
        const newValues = { ...values, status: statusValue };

        console.log(newValues);
        console.log("value of Image: ", selectedImage);
        if (student) {
          onUpdateStudent(newValues);
        } else {
          const newStudent = { ...newValues, id: uuidv4() };
          onAddStudent(newStudent);
        }
        onClose();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [selectedImageBase64, student, createStudentInfo, updateStudentInfo, onClose, onAddStudent, onUpdateStudent, selectedImage, statusValue]
  );
  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: (student ? "Sửa" : "Thêm") + " học sinh thành công!",
  });

  const formik = useFormik({
    initialValues: initialStudentInfo, // Thay đổi từ initialDriverInfo thành initialStudentInfo
    validationSchema: studentInfoSchema, // Thay đổi từ driverInfoSchema thành studentInfoSchema
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
      if (!getStudentInfoApi.data) {
        getStudentInfoApi.call(new FormData());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const studentExists = sampleStudentInfo.some((s) => s.id === student?.id);
    if (student?.id && open) {
      formik.setValues(student);
    }
    // if (!student && !studentExists && open) {
    //   formik.setValues(initialStudentInfo);
    //   setSelectedImage(null);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student?.id, open]);
  
  const uniqueBuses = Array.from(
    new Set(sampleStudentInfo.map((student) => student.bus))
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
                id="id"
                name="id"
                label="Student ID"
                placeholder="Nhập id học sinh"
                value={formik.values.id}
                onChange={formik.handleChange}
                error={formik.touched.id && !!formik.errors.id}
                helperText={formik.touched.id && formik.errors.id}
              />
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
                id="locate"
                name="locate"
                label="Vị trí nhà"
                placeholder="Nhập vị trí trạm theo định dạng:  LAT_LNG"
                value={formik.values.locate}
                onChange={formik.handleChange}
                error={formik.touched.locate && !!formik.errors.locate}
                helperText={formik.touched.locate && formik.errors.locate}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="bus"
                name="bus"
                label="Chuyến xe"
                placeholder="Nhập chuyến xe của học sinh"
                value={formik.values.bus}
                onChange={formik.handleChange}
                error={formik.touched.bus && !!formik.errors.bus}
                helperText={formik.touched.bus && formik.errors.bus}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Trạng thái"
                select
                fullWidth
                id="status"
                name="status"
                value={formik.values.status}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleStatus(e.target.value);
                }}
              >
                <MenuItem value={"Chưa lên xe"}>Chưa lên xe</MenuItem>
                <MenuItem value={"Có mặt trên xe"}>Có mặt trên xe</MenuItem>
                <MenuItem value={"Đã xuống xe"}>Đã xuống xe</MenuItem>
              </TextField>
            </Grid>    

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
