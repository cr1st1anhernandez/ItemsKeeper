import '@/styles/globals.css';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';

import { Providers } from './providers';

import { Dock } from '@/components/Dock';
import Navbar from '@/components/navbar';
import { SideBar } from '@/components/sidebar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'relative min-h-[100dvh] bg-background antialiased orange-light dark:orange-dark',
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex min-h-[100dvh] w-full">
            <SideBar />
            <div className="flex min-h-[100dvh] w-full flex-col">
              <Navbar />
              <main className="min-h-[100dvh] w-full px-6">{children}</main>
            </div>
          </div>
          <Dock />
        </Providers>
      </body>
    </html>
  );
}
