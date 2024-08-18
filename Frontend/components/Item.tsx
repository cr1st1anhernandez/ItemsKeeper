'use client';
import { Item } from '@/types';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip, Image } from '@nextui-org/react';
import { BoxIcon } from 'lucide-react';

export const ItemComponent = (item: Item) => {
  return (
    <Card
      className="flex w-full max-w-[20rem] transform flex-col items-start justify-start p-4 text-left shadow-none outline-2 outline-zinc-300 transition hover:scale-105 dark:shadow-lg dark:outline-none"
      isPressable
      onPress={() => console.log('item pressed')}
    >
      <CardHeader className="flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <p className="text-md inline-block bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text font-bold uppercase text-transparent">
            {item.collectionName}
          </p>
          <BoxIcon className="text-zinc-700 dark:text-zinc-400" />
        </div>
      </CardHeader>
      <CardBody className="w-full overflow-visible">
        <Image
          alt="Card background"
          className="h-[12rem] w-[20rem] rounded-xl object-cover"
          src={item.imageUrl}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start justify-start gap-2 text-left">
        <div className="flex w-full items-center justify-between">
          <h4 className="text-3xl font-bold">{item.name}</h4>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {item.tags.map((tag, index) => (
            <Chip key={index} color="primary" variant="dot">
              {tag.name}
            </Chip>
          ))}
        </div>
        {Object.entries(item.customFields).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <p className="text-sm font-semibold">{key}:</p>
            <p className="text-sm text-zinc-700 dark:text-zinc-400">{String(value)}</p>
          </div>
        ))}
        <div className="flex w-full flex-col items-end">
          <h4 className="text-sm font-semibold uppercase text-orange-400">Created by</h4>
          <p className="text-sm font-semibold opacity-90">{item.creatorName}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
