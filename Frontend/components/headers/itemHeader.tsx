import { ItemHeaderSkeleton } from '@/components/skeletons/itemHeaderSkeleton';
import { useItem } from '@/hooks/useItem';
import { Chip, Image } from '@nextui-org/react';

export const ItemHeader = () => {
  const { item, isLoading } = useItem();

  if (isLoading || !item) {
    return <ItemHeaderSkeleton />;
  }

  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold md:text-5xl lg:text-6xl">{item?.name}</h1>
      <Image
        alt="Card background"
        className="h-[12rem] w-[20rem] rounded-xl object-cover"
        src={item?.imageUrl}
      />
      <p className="text-lg font-semibold opacity-40 md:text-xl">Created by {item?.creatorName}</p>
      {item?.tags && (
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <Chip key={index} color="primary" variant="dot">
              {tag.name}
            </Chip>
          ))}
        </div>
      )}
    </header>
  );
};
