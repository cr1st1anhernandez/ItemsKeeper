'use client';
import { useAdmin } from '@/hooks/useAdmin';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';

const columns = [
  {
    key: 'name',
    label: 'NAME',
  },
  {
    key: 'role',
    label: 'ROLE',
  },
  {
    key: 'status',
    label: 'STATUS',
  },
];

export const Admin = () => {
  const { users } = useAdmin();
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Users</h3>
      <Table aria-label="Users">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={users}>
          {(user) => (
            <TableRow key={user.id}>
              {(columnKey) => <TableCell>{getKeyValue(user, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};
