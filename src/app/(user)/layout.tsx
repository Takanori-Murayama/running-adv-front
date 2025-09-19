import type { Metadata } from 'next';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MenuItem } from './../type';


const mainMenuItems: MenuItem[] = [
    { label: "走る広告とは？", href: "/#what" },
    { label: "こんなことができる", href: "/#example" },
    { label: "ランナー", href: "/#runners" },
    { label: "プラン", href: "/#plan" },
    { label: "ご依頼の流れ", href: "/#flow" },
    { label: "DMでご相談", href: "https://x.com/bcm_fr_pgrmer", actionButton: { label: "DMでご相談", href: "https://x.com/bcm_fr_pgrmer", sns: 'X' } },
  ]

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
    <>
      <Header mainMenuItems={mainMenuItems} />
        {children}
      <Footer mainMenuItems={mainMenuItems} />
    </>
  );
}
