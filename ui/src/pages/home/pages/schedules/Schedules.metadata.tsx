import { CaretSortIcon } from '@radix-ui/react-icons';
import { IMetadataField } from '@/utils/metadata';
import { Button } from '@/components/ui/button';

export interface ISchedule {
  _id: string;
  id: string;
  name: string
  start: Date;
  end: Date;
  desc: string;
}

export const schedulesFields: IMetadataField<ISchedule>[] = [
  {
    accessorKey: 'name',
    label: 'Name',
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          className="text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('name')}</div>
    ),
    type: {
      value: 'STRING',
      required: true
    }
  },
  {
    accessorKey: 'start',
    label: 'Start date',
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          className="text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const startDate = new Date(row.getValue('start'));
      return (
        <div className="text-center font-medium">
          {startDate.toDateString()}
        </div>
      );
    },
    type: {
      value: 'DATETIME',
      required: true
    }
  },
  {
    accessorKey: 'end',
    label: 'End date',
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          className="text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          End date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const endDate = new Date(row.getValue('end'));
      return (
        <div className="text-center font-medium">
          {endDate.toDateString()}
        </div>
      );
    },
    type: {
      value: 'DATETIME',
      required: true
    }
  },
  {
    accessorKey: 'desc',
    label: 'Description',
    header: () => <div className="text-center">Description</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('desc')}</div>,
    type: {
      value: 'STRING'
    }
  }
];
