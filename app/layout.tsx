import { Providers } from '@/components/providers';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import UserRoles from '@/components/user-roles';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FusionAuth Admin',
  description: 'FusionAuth Administration Dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <UserRoles />
        </Providers>
      </body>
    </html>
  );
}