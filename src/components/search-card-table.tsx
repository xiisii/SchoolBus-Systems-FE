import { Search } from "@mui/icons-material";
import { CardTable, CardTableProps } from "./card-table";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";

export function SearchCardTable<P, T extends { id: P; [key: string]: any }>({
  searchValue,
  title,
  onChangeSearchValue,
  ...CardTableProps
}: {
  title: string;
  searchValue: string;
  onChangeSearchValue: (value: string) => void;
} & CardTableProps<P, T>) {
  return (
    <CardTable {...CardTableProps}>
      <Stack gap={2} p={3} pb={2}>
        <Typography variant="h6">{title}</Typography>
        <TextField
          variant="outlined"
          value={searchValue}
          placeholder="Tìm kiếm ..."
          onChange={(e) => onChangeSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Stack>
    </CardTable>
  );
}
