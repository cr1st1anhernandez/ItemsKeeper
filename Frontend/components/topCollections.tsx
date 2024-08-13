'use client';
import { CollectionComponent } from '@/components/collection';
import { Collection } from '@/types';
import { ChevronLeftIcon, ChevronRightIcon, LayersIcon, TableIcon, TrophyIcon } from 'lucide-react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
      const { data } = await axios.get('http://localhost:8080/api/v1/collections/top');
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

  const skeletonSlides = Array.from({ length: 5 }).map((_, index) => (
    <SwiperSlide key={index} className="p-4">
      <Card className="flex w-full max-w-[20rem] flex-col items-start justify-start p-4 text-left">
        <CardHeader className="flex-col items-start">
          <Skeleton className="w-full rounded-lg">
            <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </CardHeader>
        <CardBody className="w-full overflow-visible">
          <Skeleton className="rounded-lg">
            <div className="h-[12rem] w-[20rem] rounded-xl bg-default-300"></div>
          </Skeleton>
        </CardBody>
        <CardFooter className="flex flex-col items-start justify-start gap-2 text-left">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-14 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </CardFooter>
      </Card>
    </SwiperSlide>
  ));

  const rows = collections.map((collection) => ({
    key: collection.id,
    name: collection.name,
    category: collection.category.name,
    description: collection.description,
    image_url: collection.imageUrl,
  }));

  return (
    <section className="flex flex-col gap-6">
      <header className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold md:text-4xl lg:text-3xl">Top collections</h2>
        <TrophyIcon className="text-orange-400" />
      </header>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="Collections" title={<LayersIcon />}>
            <div className="relative flex max-w-screen-2xl gap-4">
              <ChevronLeftIcon
                className="absolute -left-12 top-1/2 z-20 -translate-y-1/2 animate-fade-left opacity-20 animate-duration-[2000ms] animate-infinite"
                size={40}
              />
              <ChevronRightIcon
                className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 animate-fade-right opacity-20 animate-duration-[2000ms] animate-infinite"
                size={40}
              />
              <Swiper
                spaceBetween={5}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1440: {
                    slidesPerView: 3,
                  },
                  1500: {
                    slidesPerView: 4,
                  },
                }}
              >
                {isLoading
                  ? skeletonSlides
                  : collections.map((collection) => (
                      <SwiperSlide key={collection.id} className="p-4">
                        <CollectionComponent {...collection} />
                      </SwiperSlide>
                    ))}
              </Swiper>
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
