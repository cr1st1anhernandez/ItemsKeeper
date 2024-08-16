'use client';
import { signup } from '@/app/auth/signup/actions';
import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input';
import { UserIcon, MailIcon, EyeOffIcon, EyeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

function Submit(): JSX.Element {
  const status = useFormStatus();

  return (
    <Button
      className="mt-6"
      color="primary"
      size="lg"
      isLoading={status.pending}
      disabled={status.pending}
      type="submit"
    >
      {status.pending ? 'Submitting...' : 'Sign Up'}
    </Button>
  );
}

export function SignUpForm() {
  const [state, action] = useFormState(signup, undefined);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="w-full p-4 md:w-96 md:p-8">
      <CardHeader className="flex items-center justify-center">
        <h2 className="text-xl font-semibold md:text-2xl lg:text-4xl">Sign Up</h2>
      </CardHeader>
      <CardBody>
        <form action={action} className="flex flex-col gap-2">
          <Input
            endContent={
              <UserIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            isInvalid={state?.errors?.name && state.errors.name.length > 0}
            labelPlacement="outside"
            size="lg"
            type="text"
            variant="bordered"
            name="name"
            label="Name"
          />
          {state?.errors?.name && <p className="text-rose-500">{state.errors.name}</p>}
          <Input
            endContent={
              <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
            labelPlacement="outside"
            size="lg"
            isInvalid={state?.errors?.email && state.errors.email.length > 0}
            type="email"
            variant="bordered"
            name="email"
            label="Email"
          />
          {state?.errors?.email && <p className="text-rose-500">{state.errors.email}</p>}
          <Input
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOffIcon className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <EyeIcon className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            labelPlacement="outside"
            size="lg"
            isInvalid={state?.errors?.password && state.errors.password.length > 0}
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
            name="password"
            label="Password"
          />
          {state?.errors?.password && <p className="text-rose-500">{state.errors.password}</p>}
          {state?.message && <p className="text-rose-500">{state.message}</p>}
          <Submit />
        </form>
      </CardBody>
      <CardFooter>
        <p>
          Don&apos;t have an account?{' '}
          <Link className="font-semibold" href="/auth/login" underline="always">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
