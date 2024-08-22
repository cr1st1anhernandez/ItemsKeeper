'use client';

import { useAuth } from '@/contexts/authContext';
import { Button, Link, Tooltip } from '@nextui-org/react';
import { FolderIcon, HomeIcon, KeySquare, UserRound } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Dock = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const isAdministator = user?.role === 'ADMIN';

  const links = [
    { href: '/', icon: <HomeIcon className="text-2xl" />, tooltip: 'Home' },
    {
      href: '/my-collections',
      icon: <FolderIcon className="text-2xl" />,
      tooltip: 'My collections',
      show: isAuthenticated,
    },
    {
      href: '/profile',
      icon: <UserRound className="text-2xl" />,
      tooltip: 'Profile',
      show: isAuthenticated,
    },
    {
      href: '/admin-panel',
      icon: <KeySquare className="text-2xl" />,
      tooltip: 'Admin panel',
      show: isAdministator,
    },
  ];
  return (
    <div className="sticky bottom-4 left-0 right-0 z-50 mx-auto flex h-16 w-64 items-center justify-between rounded-md border-2 border-neutral-400 bg-neutral-100 px-4 shadow-md dark:border-neutral-500 dark:bg-zinc-800 dark:shadow-zinc-900 md:hidden">
      {links
        .filter((link) => link.show !== false)
        .map((link, index) => (
          <Tooltip key={index} placement="right" closeDelay={0} content={link.tooltip || null}>
            <Button
              className={`bg-transparent hover:bg-default ${
                pathname === link.href ? 'bg-orange-400 text-white hover:bg-orange-400' : ''
              }`}
              as={Link}
              href={link.href}
              isIconOnly
            >
              {link.icon}
            </Button>
          </Tooltip>
        ))}
    </div>
  );
};
