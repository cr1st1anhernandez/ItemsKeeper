import { Progress } from '@nextui-org/react';

export const LoadingPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold md:text-3xl">Loading...</h1>
      <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md" />
    </div>
  );
};
