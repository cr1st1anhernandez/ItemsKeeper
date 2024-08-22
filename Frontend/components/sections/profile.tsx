'use client';
import { ChangePassword } from '@/components/buttons/changePassword';
import { DangerZone } from '@/components/sections/dangerZone';
import { useAuth } from '@/contexts/authContext';
import { Card, CardBody } from '@nextui-org/react';

export const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold xl:text-5xl">Profile</h1>
      <div className="flex max-w-2xl flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl">Profile Info</h2>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-emerald-500" />
            <span className="text-emerald-500">{user?.role}</span>
          </div>
        </div>
        <Card className="flex flex-col gap-2 border-2 border-orange-400">
          <CardBody className="flex flex-col gap-4">
            <div>
              <h3 className="text-xl">Name</h3>
              <p className="text-md opacity-85">{user?.name}</p>
            </div>
            <div>
              <h3 className="text-xl">Email</h3>
              <p className="text-md opacity-85">{user?.email}</p>
            </div>
            <div className="flex w-full justify-end">
              <ChangePassword />
            </div>
          </CardBody>
        </Card>
      </div>
      <DangerZone />
    </div>
  );
};
