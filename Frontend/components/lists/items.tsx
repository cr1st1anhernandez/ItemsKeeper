'use client';

import { ItemCard } from '@/components/cards/itemCard';
import { Item } from '@/types';
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  getKeyValue,
} from '@nextui-org/react';
import { ClockIcon, TableIcon } from 'lucide-react';

interface ItemsProps {
  items?: Item[];
}

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'tags', label: 'Tags' },
  { key: 'image_url', label: 'Image' },
];

export const Items = ({ items }: ItemsProps) => {
  if (!items || items.length === 0) {
    return <p className="text-2xl">This collection dont have items yet</p>;
  }

  const rows = items.map((item) => ({
    key: item.id,
    name: item.name,
    tags: item.tags.map((tag) => tag.name).join(', '),
    image_url: item.imageUrl,
  }));

  return (
    <Tabs aria-label="Options">
      <Tab key="Items" title={<ClockIcon />}>
        <div className="flex flex-wrap gap-8">
          {items.map((item, index) => (
            <ItemCard key={index} {...item} />
          ))}
        </div>
      </Tab>
      <Tab key="TableItems" title={<TableIcon />}>
        <Table aria-label="Table of recent items">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => {
                  const value = getKeyValue(item, columnKey);
                  if (columnKey === 'image_url') {
                    return (
                      <TableCell>
                        <img
                          src={value}
                          alt="Item Thumbnail"
                          className="h-12 w-20 rounded-sm object-cover"
                        />
                      </TableCell>
                    );
                  }
                  return <TableCell>{value}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Tab>
    </Tabs>
  );
};
