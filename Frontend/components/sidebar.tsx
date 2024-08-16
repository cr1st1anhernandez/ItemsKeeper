'use client';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Tooltip } from '@nextui-org/react';
import { useAuth } from '@/components/AuthProvider';
import { FolderIcon, HeartIcon, HomeIcon, KeySquare, PlusIcon, SettingsIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function SideBar() {
  const pathname = usePathname();
  const user = useAuth().user;
  const isAuthenticated = !!user;
  const isAdministator = user?.role === 'ADMIN';

  const links = [
    { href: '/', icon: <HomeIcon className="text-2xl" />, tooltip: 'Home' },
    {
      href: '/collections',
      icon: <FolderIcon className="text-2xl" />,
      tooltip: 'My collections',
      show: isAuthenticated,
    },
    {
      href: '/add-new',
      icon: <PlusIcon className="text-2xl" />,
      tooltip: 'Add new',
      show: isAuthenticated,
    },
    {
      href: '/favorites',
      icon: <HeartIcon className="text-2xl" />,
      tooltip: 'Favorites',
      show: isAuthenticated,
    },
    {
      href: '/settings',
      icon: <SettingsIcon className="text-2xl" />,
      tooltip: 'Settings',
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
    <aside className="hidden w-24 flex-col items-center gap-4 pt-4 md:flex">
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
    </aside>
  );
}
