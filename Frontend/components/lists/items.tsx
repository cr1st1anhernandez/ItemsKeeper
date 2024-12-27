'use client';

import { ItemCard } from '@/components/cards/itemCard';
import { ItemCardSkeleton } from '@/components/skeletons/itemCardSkeleton';
import { useItems } from '@/hooks/useItems';
import { Item } from '@/types';
import {
  Input,
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
import { ClockIcon, Search, TableIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

interface ItemsProps {
  items?: Item[];
}

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'tags', label: 'Tags' },
  { key: 'image_url', label: 'Image' },
];

export const Items = ({ items = [] }: ItemsProps) => {
  const { isLoading } = useItems();
  const [filterValue, setFilterValue] = useState('');

  const filteredItems = useMemo(() => {
    if (!filterValue) return items;

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.tags.some((tag) => tag.name.toLowerCase().includes(filterValue.toLowerCase())),
    );
  }, [items, filterValue]);

  const rows = useMemo(
    () =>
      filteredItems.map((item) => ({
        key: item.id,
        name: item.name,
        tags: item.tags.map((tag) => tag.name).join(', '),
        image_url: item.imageUrl,
      })),
    [filteredItems],
  );

  return (
    <div className="flex flex-col gap-4">
      <Tabs aria-label="Options">
        <Tab className="flex flex-col gap-4" key="Items" title={<ClockIcon />}>
          <Input
            variant="bordered"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or tags..."
            startContent={<Search size={18} />}
            value={filterValue}
            onClear={() => setFilterValue('')}
            onValueChange={(value) => setFilterValue(value)}
          />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => <ItemCardSkeleton key={index} />)
              : filteredItems.map((item, index) => <ItemCard key={index} {...item} />)}
          </div>
        </Tab>
        <Tab key="TableItems" className="flex flex-col gap-4" title={<TableIcon />}>
          <Input
            variant="bordered"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or tags..."
            startContent={<Search size={18} />}
            value={filterValue}
            onClear={() => setFilterValue('')}
            onValueChange={(value) => setFilterValue(value)}
          />
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
    </div>
  );
};

export default Items;
