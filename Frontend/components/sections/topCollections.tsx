'use client';
import { backendUrl } from '@/app/_lib/definitions';
import { CollectionCard } from '@/components/cards/collectionCard';
import { CollectionCardSkeleton } from '@/components/skeletons/collectionCardSkeleton';
import { Collection } from '@/types';
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
import axios from 'axios';
import { LayersIcon, TableIcon, TrophyIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Description' },
  { key: 'image_url', label: 'Image' },
];

export const TopCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}collections/top`);
      setCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const rows = collections.map((collection) => ({
    key: collection.id,
    name: collection.name,
    category: collection.category,
    description: collection.description,
    image_url: collection.imageUrl,
  }));

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold md:text-4xl lg:text-3xl">Top collections</h2>
        <TrophyIcon className="text-orange-400" />
      </header>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="Collections" title={<LayersIcon />}>
            <div className="relative flex gap-4 md:hidden">
              <Swiper
                spaceBetween={5}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                }}
              >
                {isLoading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <SwiperSlide key={index} className="p-4">
                        <CollectionCardSkeleton />
                      </SwiperSlide>
                    ))
                  : collections.map((collection) => (
                      <SwiperSlide key={collection.id} className="p-4">
                        <CollectionCard {...collection} />
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>
            <div className="hidden grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8 md:grid">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CollectionCardSkeleton key={index} />
                  ))
                : collections.map((collection) => (
                    <CollectionCard key={collection.id} {...collection} />
                  ))}
            </div>
          </Tab>
          <Tab key="TableTopCollections" title={<TableIcon />}>
            <Table aria-label="Table of top collections">
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
                              alt="Collection Thumbnail"
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
    </section>
  );
};
