import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useStudentInfoContext } from "src/contexts/student-info/student-info-context";
import { useAuth } from "src/hooks/use-auth";
import { useDialog } from "src/hooks/use-dialog";
import { useDrawer } from "src/hooks/use-drawer";
import usePagination from "src/hooks/use-pagination";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import studentInfoFilterConfigs, {
  StudentInfoFilter,
} from "src/sections/quan-ly-hoc-sinh/student-info-filter";
import type { Page as PageType } from "src/types/page";
import { StudentInfoDetail } from "src/types/student-info";
import { applyFilter } from "src/utils/apply-filter";
import { PiPlus } from "react-icons/pi";
import studentInfoTableConfigs from "src/sections/quan-ly-hoc-sinh/student-info-configs";
import CustomFilter from "src/components/custom-filter";
import { CardTable } from "src/components/card-table";
import TitleConfirmRemoveDialog from "src/sections/title-confirm-remove-dialog";
import { Delete } from "@mui/icons-material";
import { StudentInfoEditDrawer } from "src/sections/quan-ly-hoc-sinh/student-info-edit-drawer";

const Page: PageType = () => {
  const editDrawer = useDrawer<StudentInfoDetail>();
  const [filter, setFilter] = useState<Partial<StudentInfoFilter>>({});
  const { deleteStudentInfo, getStudentInfoApi } = useStudentInfoContext();
  const sampleStudentInfo: StudentInfoDetail[] = [
    {
      id: "0001",
      name: "Nguyễn Văn A",
      bus: "1",
      lang: "None",
      lot: "None",
      status: "Hoạt động",
    },
    {
      id: "0002",
      name: "Đinh Văn D",
      bus: "2",

      lang: "None",
      lot: "None",
      status: "Không hoạt động",
    },
    {
      id: "0003",
      name: "Hoàng Nhật C",
      bus: "3",

      lang: "None",
      lot: "None",
      status: "Không hoạt động",
    },
    // Thêm dữ liệu mẫu khác nếu cần
  ];
  // const studentInfo = useMemo(
  //   () =>
  //     applyFilter(
  //       getStudentInfoApi.data || [],
  //       filter,
  //       studentInfoFilterConfigs
  //     ),
  //   [filter, getStudentInfoApi.data]
  // );
  const studentInfo = useMemo(() => sampleStudentInfo, []);

  const pagination = usePagination({ count: studentInfo.length });
  const pagedRows = useMemo(
    () =>
      studentInfo.slice(
        pagination.rowsPerPage * pagination.page,
        pagination.rowsPerPage * (pagination.page + 1)
      ),
    [pagination.page, pagination.rowsPerPage, studentInfo]
  );

  const select = useSelection<StudentInfoDetail>(pagedRows);
  const deleteDialog = useDialog<StudentInfoDetail>();

  const router = useRouter();
  // Dữ liệu mẫu của học sinh

  return (
    <>
      <Stack gap={4} py={4} px={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1}>
            <Typography variant="h4">Quản lý học sinh</Typography>
            <Typography variant="body2" color="text.secondary">
              Quản lý dữ liệu tất cả học sinh
            </Typography>
          </Stack>
          <div>
            <Button
              startIcon={<PiPlus />}
              variant="contained"
              className=" text-white bg-[#0284c7]"
              onClick={() => editDrawer.handleOpen()}
            >
              Thêm học sinh
            </Button>
          </div>
        </Stack>
        <CardTable
          rows={pagedRows}
          configs={studentInfoTableConfigs}
          select={select}
          pagination={pagination}
          indexColumn
          actions={
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              size="small"
              disabled={select.selected.length == 0}
              onClick={() => deleteDialog.handleOpen()}
            >
              Xoá ({select.selected.length})
            </Button>
          }
          onClickEdit={(data) => editDrawer.handleOpen(data)}
          onClickDelete={(data) => deleteDialog.handleOpen(data)}
        >
          <Stack gap={2} p={3} pb={2}>
            <Typography variant="h6">
              {"Danh sách học sinh: " + pagedRows.length}
            </Typography>
            <CustomFilter
              configs={studentInfoFilterConfigs}
              filter={filter}
              onChange={setFilter}
            />
          </Stack>
        </CardTable>
      </Stack>
      <StudentInfoEditDrawer
        student={editDrawer.data}
        open={editDrawer.open}
        onClose={editDrawer.handleClose}
      />
      <TitleConfirmRemoveDialog
        open={deleteDialog.open}
        titleText="Xóa học sinh"
        content="Xác nhận xóa học sinh này?"
        onClose={deleteDialog.handleClose}
        // onConfirm={async () => {
        //   if (deleteDialog.data) {
        //     await deleteSaleShift([Number(deleteDialog.data?.id)]);
        //     select.handleDeselectOne(deleteDialog.data);
        //   } else {
        //     await deleteSaleShift(select.selected.map((s) => s.id));
        //     select.handleDeselectAll();
        //   }
        // }}
      />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
