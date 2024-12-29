'use client';
import { backendUrl } from '@/app/_lib/definitions';
import { useAuth } from '@/contexts/authContext';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { LockIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const PasswordValidationSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(32, 'Password must not exceed 32 characters')
  .regex(
    /^(?=.*[A-Z])(?=.*[0-9]).{8,32}$/,
    'Password must contain at least one uppercase letter and one number',
  );

export const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuth();
  const jwt = user?.jwt;

  interface PasswordChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const changePassword = async (newPassword: string) => {
    const promise = axios.put(
      `${backendUrl}users/change-password`,
      { newPassword },
      {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      },
    );

    toast.promise(promise, {
      loading: 'Changing password...',
      success: () => {
        setPassword('');
        return 'Password changed successfully!';
      },
      error: 'An error occurred while changing the password.',
    });
  };

  const handlePasswordChange = (e: PasswordChangeEvent) => {
    setPassword(e.target.value);
    const result = PasswordValidationSchema.safeParse(e.target.value);
    if (!result.success) {
      setErrors(result.error.errors.map((err) => err.message));
    } else {
      setErrors([]);
    }
  };

  const handleSubmit = () => {
    const validationResult = PasswordValidationSchema.safeParse(password);
    if (!validationResult.success) {
      setErrors(validationResult.error.errors.map((err) => err.message));
      return;
    }

    changePassword(password);
    setErrors([]);
    onOpenChange();
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" className="w-fit">
        Change Password
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Change Password</ModalHeader>
              <ModalBody>
                <Input
                  value={password}
                  onChange={handlePasswordChange}
                  endContent={
                    <LockIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                  }
                  label="New Password"
                  placeholder="Enter your new password"
                  variant="bordered"
                  errorMessage={() => (
                    <ul className="text-md font-semibold">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  )}
                  isInvalid={errors.length > 0}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isDisabled={errors.length > 0 || password === ''}
                >
                  Change
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
