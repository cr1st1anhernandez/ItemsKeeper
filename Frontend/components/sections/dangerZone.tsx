import { DeleteAccount } from '@/components/buttons/deleteAccount';
import { Card, CardBody } from '@nextui-org/card';

export const DangerZone = () => {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <h2 className="text-2xl">Danger Zone</h2>
      <Card className="flex flex-col gap-2 border-2 border-rose-600">
        <CardBody className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-xl">Delete Account</h3>
            <p className="text-md opacity-85">
              Deleting your account will permanently remove all your data from our servers.
            </p>
          </div>
          <DeleteAccount />
        </CardBody>
      </Card>
    </div>
  );
};
