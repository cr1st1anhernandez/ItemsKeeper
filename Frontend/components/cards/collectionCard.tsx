'use client';
import { Collection } from '@/types';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Image, Tooltip } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export const CollectionCard = (collection: Collection) => {
  const router = useRouter();
  return (
    <Card
      className="flex max-w-[25rem] transform cursor-pointer items-start justify-start p-4 text-left transition hover:scale-105"
      isPressable
      onPress={() => router.push(`/collections/${collection.id}`)}
    >
      <CardHeader className="flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <p className="text-md inline-block bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text font-bold uppercase text-transparent">
            {collection.category}
          </p>
          <Tooltip content="Number of Items" closeDelay={0}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-600">
              <span className="text-xs font-semibold">{collection.itemCount}</span>
            </div>
          </Tooltip>
        </div>
      </CardHeader>
      <CardBody className="w-full overflow-visible">
        <Image
          alt="Card background"
          className="h-[12rem] w-[20rem] rounded-xl object-cover"
          src={collection.imageUrl}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start justify-start gap-2 text-pretty text-left">
        <h4 className="text-3xl font-bold">{collection.name}</h4>
        <p className="text-sm font-semibold opacity-70">{collection.description}</p>
        <div className="flex w-full flex-col items-end text-pretty">
          <h4 className="text-sm font-semibold uppercase text-orange-400">Created by</h4>
          <p className="text-sm font-semibold opacity-90">{collection.creatorName}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
