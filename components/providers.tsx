'use client';

import { ThemeProvider } from './theme-provider';
import { Toaster } from './ui/toaster';
import { FusionAuthProviderConfig, FusionAuthProvider } from '@fusionauth/react-sdk';
import { useCookies } from 'next-client-cookies';

const config: FusionAuthProviderConfig = {
  clientId: process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID!,
  redirectUri: process.env.NEXT_PUBLIC_SERVER!,
  serverUrl: process.env.NEXT_PUBLIC_FUSIONAUTH_URL!,
  shouldAutoFetchUserInfo: true,
  shouldAutoRefresh: true,
  scope: 'openid email profile offline_access',
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FusionAuthProvider {...config} nextCookieAdapter={useCookies}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </FusionAuthProvider>
  );
}