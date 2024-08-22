'use client';
import { ItemCard } from '@/components/cards/itemCard';
import { ItemSkeleton } from '@/components/skeletons/itemSkeleton';
import { useItems } from '@/hooks/useItems';
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
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, TableIcon } from 'lucide-react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'tags', label: 'Tags' },
  { key: 'image_url', label: 'Image' },
  { key: 'customFields', label: 'Custom Fields' },
];

export const RecentItems = () => {
  const { recentItems, isLoading } = useItems();

  const rows = recentItems.map((item) => ({
    key: item.id,
    name: item.name,
    tags: item.tags.map((tag) => tag.name).join(', '),
    image_url: item.imageUrl,
    customFields: JSON.stringify(item.customFields),
  }));

  const skeletonSlides = Array.from({ length: 5 }).map((_, index) => (
    <SwiperSlide key={index} className="p-4">
      <ItemSkeleton />
    </SwiperSlide>
  ));

  return (
    <section className="flex flex-col gap-6">
      <header className="flex items-center gap-6 pl-6">
        <h2 className="text-2xl font-semibold md:text-4xl lg:text-3xl">Recent Items</h2>
        <ClockIcon className="text-orange-400" />
      </header>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="Items" title={<ClockIcon />}>
            <div className="relative flex max-w-screen-2xl gap-4">
              <ChevronLeftIcon
                className="absolute -left-12 top-1/2 z-20 -translate-y-1/2 animate-fade-left opacity-20 animate-duration-[1500ms] animate-infinite"
                size={40}
              />
              <ChevronRightIcon
                className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 animate-fade-right opacity-20 animate-duration-[1500ms] animate-infinite"
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
                  : recentItems.map((item, index) => (
                      <SwiperSlide key={index} className="p-4">
                        <ItemCard {...item} />
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>
          </Tab>
          <Tab key="TableRecentItems" title={<TableIcon />}>
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
    </section>
  );
};
