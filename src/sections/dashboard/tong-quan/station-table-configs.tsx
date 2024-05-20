import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { CardTableConfig } from "src/components/card-table";
import { StationDetail } from "src/types/station";

const stationTableConfigs: CardTableConfig<
  StationDetail["id"],
  StationDetail
>[] = [
  {
    key: "name",
    headerLabel: "Tên trạm",
    type: "string",
    renderCell: (station) => {
      return (
        <Stack sx={{ my: -0.5 }}>
          <Typography>{station.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {station.address}
          </Typography>
        </Stack>
      );
    },
  },
  {
    key: "station_head_name",
    headerLabel: "Trưởng trạm",
    type: "string",
  },
  {
    key: "num_staff",
    headerLabel: "Nhân viên",
    type: "string",
  },
  {
    key: "type",
    headerLabel: "Trạm",
    type: "string",
    renderCell: (data) =>
      data.type == "brick" ? "Trạm cân gạch" : "Trạm cân đá",
  },
];

export default stationTableConfigs;
