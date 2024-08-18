'use client';
import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/components/AuthProvider';
import { ItemComponent } from '@/components/Item';
import { ItemSkeleton } from '@/components/itemSkeleton';
import { Collection, Item } from '@/types';
import {
  Skeleton,
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
import axios from 'axios';
import { ClockIcon, TableIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'tags', label: 'Tags' },
  { key: 'image_url', label: 'Image' },
  { key: 'customFields', label: 'Custom Fields' },
];

export const CollectionComponent = () => {
  const { user } = useAuth();
  const jwt = user?.jwt;
  const params = useParams<{ collectionId: string }>();
  const collectionId = parseInt(params.collectionId);

  const [collection, setCollection] = useState<Collection | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState({ collection: true, items: true });

  const fetchData = async (
    url: string,
    setData: React.Dispatch<any>,
    dataType: 'collection' | 'items',
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.get(url, config);
      setData(data);
      console.log(`Fetched ${dataType}:`, data);
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [dataType]: false }));
    }
  };

  useEffect(() => {
    console.log('Fetching collection:', collectionId);
    const fetchCollections = async () => {
      await fetchData(`${backendUrl}collections/${collectionId}`, setCollection, 'collection');
      fetchItems();
    };

    const fetchItems = async () => {
      await fetchData(`${backendUrl}collections/${collectionId}/items`, setItems, 'items');
    };

    fetchCollections();
  }, []);

  const rows = items.map((item) => ({
    key: item.id,
    name: item.name,
    tags: item.tags.map((tag) => tag.name).join(', '),
    image_url: item.imageUrl,
    customFields: JSON.stringify(item.customFields),
  }));
  return (
    <div className="my-8 flex w-full flex-col gap-8 text-pretty">
      {isLoading.collection ? (
        <>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-14 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-8 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-6 rounded-lg bg-default-300"></div>
          </Skeleton>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">{collection?.name}</h1>
          <p className="text-lg font-semibold opacity-70 md:text-xl">{collection?.description}</p>
          <p className="text-lg font-semibold opacity-40 md:text-xl">
            Created by {collection?.creatorName}
          </p>
        </>
      )}
      <div className="relative">
        <p className="absolute left-32 top-2 font-semibold opacity-80">
          {collection?.itemCount} items
        </p>
        <Tabs aria-label="Options">
          <Tab key="Items" title={<ClockIcon />}>
            <div className="flex flex-wrap gap-8">
              {isLoading.items
                ? Array.from({ length: 15 }).map((_, index) => <ItemSkeleton key={index} />)
                : items.map((item, index) => <ItemComponent key={index} {...item} />)}
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
      </div>
    </div>
  );
};
