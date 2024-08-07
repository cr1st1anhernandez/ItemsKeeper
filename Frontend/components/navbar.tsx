import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import { VaultIcon } from 'lucide-react';
import NextLink from 'next/link';

import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit md:pl-2">
          <NextLink className="flex items-center justify-start gap-2 md:gap-8" href="/">
            <VaultIcon size={32} className="text-2xl text-orange-400" />
            <p className="font-bold text-inherit">ITEMS KEEPER</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
        <NavbarItem className="hidden gap-2 sm:flex">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden gap-2 sm:flex">
          <Button as={Link} color="primary" href="/auth/login">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden gap-2 sm:flex">
          <Button as={Link} color="primary" href="/auth/register" variant="flat">
            Register
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <ThemeSwitch />
        <Button as={Link} color="primary" href="/auth/login">
          Login
        </Button>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
