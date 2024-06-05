import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBusInfoContext } from "src/contexts/bus-info/bus-info-context";
import { useAuth } from "src/hooks/use-auth";
import { useDialog } from "src/hooks/use-dialog";
import { useDrawer } from "src/hooks/use-drawer";
import usePagination from "src/hooks/use-pagination";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import busInfoFilterConfigs, {
  BusInfoFilter,
} from "src/sections/giam-sat-chuyen-xe/bus-info-filter";
import type { Page as PageType } from "src/types/page";
import { BusInfoDetail } from "src/types/bus-info";
import { applyFilter } from "src/utils/apply-filter";
import { PiPlus } from "react-icons/pi";
import busInfoTableConfigs from "src/sections/giam-sat-chuyen-xe/bus-info-configs";
import CustomFilter from "src/components/custom-filter";
import { CardTable } from "src/components/card-table";
import TitleConfirmRemoveDialog from "src/sections/title-confirm-remove-dialog";
import { Delete } from "@mui/icons-material";
import { BusInfoEditDrawer } from "src/sections/giam-sat-chuyen-xe/bus-info-edit-drawer";
import { Loader } from "@googlemaps/js-api-loader";
import getBusInfoFilterConfigs from "src/sections/giam-sat-chuyen-xe/bus-info-filter";

const Page: PageType = () => {
  const editDrawer = useDrawer<BusInfoDetail>();
  const [filter, setFilter] = useState<Partial<BusInfoFilter>>({});
  const { deleteBusInfo, getBusInfoApi } = useBusInfoContext();
  const sampleBusInfo: BusInfoDetail[] = [
    {
      id: "0001",
      bus: "1",
      locate: "10.952648_106.816997",
      name: "Nguyen Dang Mai Thy",
      status: "Có mặt trên xe",
      updated_time: "16:30",
    },
    {
      id: "0002",
      bus: "1",
      locate: "10.855654_106.631087",
      name: "Bui Thi Thanh Ngan",
      status: "Chưa lên xe",
      updated_time: "none",
    },
    {
      id: "0003",
      bus: "1",
      locate: "10.850570_106.772055",
      name: "Nguyen Quoc Viet",
      status: "Đã xuống trạm",
      updated_time: "17:05",
    },
    {
      id: "0004",
      bus: "2",
      locate: "10.840788_106.808897",
      name: "Huynh Thien Nhan",
      status: "Chưa lên xe",
      updated_time: "none",
    },
    {
      id: "0005",
      bus: "2",
      locate: "10.770358_106.679110",
      name: "Tran Ninh Hoang",
      status: "Có mặt trên xe",
      updated_time: "16:25",
    },
  ];
  const busInfoFilterConfigs = useMemo(
    () => getBusInfoFilterConfigs(sampleBusInfo),
    []
  );
  // const busInfo = useMemo(() => sampleBusInfo, []);
  const busInfo = useMemo(() => {
    return applyFilter(sampleBusInfo, filter, busInfoFilterConfigs);
  }, [busInfoFilterConfigs, filter]);
  const pagination = usePagination({ count: busInfo.length });
  const pagedRows = useMemo(
    () =>
      busInfo.slice(
        pagination.rowsPerPage * pagination.page,
        pagination.rowsPerPage * (pagination.page + 1)
      ),
    [pagination.page, pagination.rowsPerPage, busInfo]
  );

  const select = useSelection<BusInfoDetail>(pagedRows);
  const deleteDialog = useDialog<BusInfoDetail>();

  const router = useRouter();

  const mapRef = useRef(null);
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: `${process.env.NEXT_PUBLIC_MAPS_API_KEY}` as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;
      const position = {
        lat: 10.874243,
        lng: 106.7948193,
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };
      const map = new Map(mapRef.current as any, mapOptions);

      const marker = new Marker({
        map: map,
        position: position,
      });
    };
    initMap();
  }, []);

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Stack direction={isMobile ? "column-reverse" : "row"} height="100%">
      <Stack flex={isMobile ? 1 : 0.5} gap={4} py={4} px={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1}>
            <Typography variant="h4">Giám sát chuyến xe</Typography>
            <Typography variant="body2" color="text.secondary">
              Quản lý tất cả các chuyến xe
            </Typography>
          </Stack>
          <div>
            <Button
              startIcon={<PiPlus />}
              variant="contained"
              className="text-white bg-[#0284c7]"
              onClick={() => editDrawer.handleOpen()}
            >
              Thêm chuyến xe
            </Button>
          </div>
        </Stack>
        <CardTable
          rows={pagedRows}
          configs={busInfoTableConfigs}
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
          // onClickDelete={(data) => deleteDialog.handleOpen(data)}
        >
          <Stack gap={2} p={3} pb={2}>
            <Typography variant="h6">
              {"Danh sách chuyến: " + pagedRows.length}
            </Typography>
            <CustomFilter
              configs={busInfoFilterConfigs}
              filter={filter}
              onChange={setFilter}
            />
          </Stack>
        </CardTable>
      </Stack>
      <div
        ref={mapRef}
        style={{ flex: isMobile ? 1 : 0.5, height: "100%" }}
      ></div>
      <BusInfoEditDrawer
        busInfo={editDrawer.data}
        open={editDrawer.open}
        onClose={editDrawer.handleClose}
      />
      <TitleConfirmRemoveDialog
        open={deleteDialog.open}
        titleText="Xóa chuyến này"
        content="Xác nhận xóa chuyến xe này?"
        onClose={deleteDialog.handleClose}
      />
    </Stack>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
