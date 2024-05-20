import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";


interface Props {
  tableHeader: string[],
  dataRow: {
    voi: string,
    nhienLieu: string,
    tongLit: string,
    tongTien: string
  }[]

}

const SortableTable: React.FC<Props> = ({ tableHeader, dataRow }) => {
  return (
    <Card className="rounded-sm border border-stroke mt-6 bg-white px-5 pb-5 pt-7 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7" placeholder=''>
      <CardHeader floated={false} shadow={false} className="rounded-none" placeholder=''>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" placeholder=''>
              Giao ca
            </Typography>
          </div>

        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0" placeholder=''>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHeader.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70" placeholder=''                  >
                    {head}{" "}
                    {index !== tableHeader.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRow.map(
              ({ voi, nhienLieu, tongLit, tongTien }, index) => {
                const isLast = index === dataRow.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={voi}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal" placeholder=''                          >
                            {voi}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder=''                        >
                          {nhienLieu}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder=''                        >
                          {tongLit}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal" placeholder=''                      >
                        {tongTien}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text" placeholder=''>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder=''>
        <Typography variant="small" color="blue-gray" className="font-normal" placeholder=''>
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" placeholder=''>
            Previous
          </Button>
          <Button variant="outlined" size="sm" placeholder=''>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SortableTable;