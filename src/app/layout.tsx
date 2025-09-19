import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import React from 'react';
import Provider from './Provider';
import { CssBaseline } from '@mui/material';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '走る広告',
  description: 'ランナーがあなたの広告を背負って走ります。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <Provider>
            <CssBaseline />
            <main className="w-full flex flex-col items-center sm:items-start">
              {children}
            </main>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
