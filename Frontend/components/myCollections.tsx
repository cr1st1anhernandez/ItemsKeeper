'use client';

import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/components/AuthProvider';
import { CollectionComponent } from '@/components/collection';
import { Collection } from '@/types';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const MyCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const jwt = useAuth().user?.jwt;

  const fetchCollections = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      };

      const { data } = await axios.get(`${backendUrl}users/2/collections`, config);
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

  return (
    <section className="h-fit w-full py-8 md:py-10">
      <div className="flex h-fit w-full flex-col gap-8">
        <div className="flex flex-wrap gap-8">
          {isLoading
            ? Array.from({ length: 16 }).map((_, index) => (
                <Card
                  key={index}
                  className="flex w-full max-w-[20rem] flex-col items-start justify-start p-4 text-left"
                >
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
              ))
            : collections.map((collection, index) => (
                <CollectionComponent key={index} {...collection} />
              ))}
        </div>
      </div>
    </section>
  );
};
