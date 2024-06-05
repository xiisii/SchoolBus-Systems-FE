import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDriverInfoContext } from "src/contexts/driver-info/driver-info-context"; // Thay đổi từ useStudentInfoContext thành useDriverInfoContext
import { useAuth } from "src/hooks/use-auth";
import { useDialog } from "src/hooks/use-dialog";
import { useDrawer } from "src/hooks/use-drawer";
import usePagination from "src/hooks/use-pagination";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import {
  DriverInfoFilter, // Thay đổi từ StudentInfoFilter thành DriverInfoFilter
} from "src/sections/quan-ly-tai-xe/driver-info-filter"; // Thay đổi từ student-info-filter thành driver-info-filter
import type { Page as PageType } from "src/types/page";
import { DriverInfoDetail } from "src/types/driver-info"; // Thay đổi từ StudentInfoDetail thành DriverInfoDetail
import { applyFilter } from "src/utils/apply-filter";
import { PiPlus } from "react-icons/pi";
import driverInfoTableConfigs from "src/sections/quan-ly-tai-xe/driver-info-configs"; // Thay đổi từ student-info-configs thành driver-info-configs
import CustomFilter from "src/components/custom-filter";
import { CardTable } from "src/components/card-table";
import TitleConfirmRemoveDialog from "src/sections/title-confirm-remove-dialog";
import { Delete } from "@mui/icons-material";
import { DriverInfoEditDrawer } from "src/sections/quan-ly-tai-xe/driver-info-edit-drawer";
import getDriverInfoFilterConfigs from "src/sections/quan-ly-tai-xe/driver-info-filter";

const Page: PageType = () => {
  const editDrawer = useDrawer<DriverInfoDetail>(); // Thay đổi từ StudentInfoDetail thành DriverInfoDetail
  const [filter, setFilter] = useState<Partial<DriverInfoFilter>>({}); // Thay đổi từ StudentInfoFilter thành DriverInfoFilter
  const { deleteDriverInfo, getDriverInfoApi } = useDriverInfoContext(); // Thay đổi từ useStudentInfoContext thành useDriverInfoContext
  const [sampleDriverInfo, setSampleDriverInfo] = useState<DriverInfoDetail[]>(
    []
  );
  useEffect(() => {
    // fetch or set sampleStudentInfo here
    setSampleDriverInfo([
      {
        id: "0001",
        name: "Phung Duc Hai",
        phone: "0123456789",
        car: "1",
        status: "Hoạt động",
      },
      {
        id: "0002",
        name: "Dinh Van Tung",
        phone: "0987654321",
        car: "3",
        status: "Không hoạt động",
      },
      {
        id: "0003",
        name: "Hoang Nhat Minh",
        phone: "0365789456",
        car: "2",
        status: "Không hoạt động",
      },
    ]);
  }, []);
  // const sampleDriverInfo: DriverInfoDetail[] = [
  //   // Thay đổi từ sampleStudentInfo thành sampleDriverInfo
  //   {
  //     id: "0001",
  //     name: "Phung Duc Hai",
  //     phone: "0123456789",
  //     car: "1",
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: "0002",
  //     name: "Dinh Van Tung",
  //     phone: "0987654321",
  //     car: "3",
  //     status: "Không hoạt động",
  //   },
  //   {
  //     id: "0003",
  //     name: "Hoang Nhat Minh",
  //     phone: "0365789456",
  //     car: "2",
  //     status: "Không hoạt động",
  //   },
  // ];
  // const sampleDriverInfo = useMemo(
  //   // Bỏ comment khi sử dụng dữ liệu từ API
  //   () =>
  //     applyFilter(getDriverInfoApi.data || [], filter, driverInfoFilterConfigs),
  //   [filter, getDriverInfoApi.data]
  // );
  // const driverInfo = useMemo(() => sampleDriverInfo, []); // Sử dụng dữ liệu mẫu
  const driverInfoFilterConfigs = useMemo(
    () => getDriverInfoFilterConfigs(sampleDriverInfo),
    [sampleDriverInfo]
  );
  const driverInfo = useMemo(() => {
    return applyFilter(sampleDriverInfo, filter, driverInfoFilterConfigs);
  }, [driverInfoFilterConfigs, filter, sampleDriverInfo]);
  const pagination = usePagination({ count: driverInfo.length });
  const pagedRows = useMemo(
    () =>
      driverInfo.slice(
        pagination.rowsPerPage * pagination.page,
        pagination.rowsPerPage * (pagination.page + 1)
      ),
    [pagination.page, pagination.rowsPerPage, driverInfo]
  );

  const select = useSelection<DriverInfoDetail>(pagedRows);
  const deleteDialog = useDialog<DriverInfoDetail>();

  const router = useRouter();
  // Dữ liệu mẫu của tài xế
  const deleteSelectedDrivers = (selectedStudents: any) => {
    const updatedSampleDriverInfo = sampleDriverInfo.filter(
      (driver) => !selectedStudents.includes(driver)
    );
    setSampleDriverInfo(updatedSampleDriverInfo);
  };
  return (
    <>
      <Stack gap={4} py={4} px={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1}>
            <Typography variant="h4">Quản lý tài xế</Typography>
            <Typography variant="body2" color="text.secondary">
              Quản lý dữ liệu tất cả tài xế
            </Typography>
          </Stack>
          <div>
            <Button
              startIcon={<PiPlus />}
              variant="contained"
              className=" text-white bg-[#0284c7]"
              onClick={() => editDrawer.handleOpen()}
            >
              Thêm tài xế
            </Button>
          </div>
        </Stack>
        <CardTable
          rows={pagedRows}
          configs={driverInfoTableConfigs}
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
          onClickEdit={(data: any) => editDrawer.handleOpen(data)}
          onClickDelete={(data: any) => deleteDialog.handleOpen(data)}
        >
          <Stack gap={2} p={3} pb={2}>
            <Typography variant="h6">
              {"Danh sách tài xế: " + pagedRows.length}
            </Typography>
            <CustomFilter
              configs={driverInfoFilterConfigs}
              filter={filter}
              onChange={setFilter}
            />
          </Stack>
        </CardTable>
      </Stack>
      <DriverInfoEditDrawer
        driver={editDrawer.data}
        open={editDrawer.open}
        onClose={editDrawer.handleClose}
      />
      <TitleConfirmRemoveDialog
        open={deleteDialog.open}
        titleText="Xóa tài xế"
        content="Xác nhận xóa tài xế này?"
        onClose={deleteDialog.handleClose}
        onConfirm={async () => {
          if (deleteDialog.data) {
            // await deleteSaleShift([Number(deleteDialog.data?.id)]);
            const updatedSampleDriverInfo = sampleDriverInfo.filter(
              (driver) => driver.id !== deleteDialog.data?.id
            );
            setSampleDriverInfo(updatedSampleDriverInfo);
            select.handleDeselectOne(deleteDialog.data);
          } else {
            // await deleteSaleShift(select.selected.map((s) => s.id));
            // console.log(select.selected);
            deleteSelectedDrivers(select.selected);

            select.handleDeselectAll();
          }
        }}
      />
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
