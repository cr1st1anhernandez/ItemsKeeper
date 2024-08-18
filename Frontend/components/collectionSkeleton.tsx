import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/react';

export const CollectionSkeleton = () => {
  return (
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
  );
};
