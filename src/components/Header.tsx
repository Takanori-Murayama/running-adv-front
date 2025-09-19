'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import { MenuItem } from '@/app/type';

export default function Header(
  { mainMenuItems }: { mainMenuItems: MenuItem[] }
) {
  const { slug } = useParams();
  const isTopPage = slug === undefined; // トップページかどうかの判定（必要に応じて変更）
  return (
    <AppBar position="absolute" sx={{ top: 0, left: 0, right: 0, zIndex: 100 }} color="primary">
      <Toolbar color="primary">
        <Typography
          variant={isTopPage ? 'h1' : 'body1'}
          component={Link}
          href="/"
          sx={{
            fontSize: 24,
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          走る広告
        </Typography>

        {/* 右側：ナビゲーション */}
        {
          mainMenuItems.map((item) => {
            return (
              <React.Fragment key={item.label}>
                {!item.actionButton ? (
                  <Button color="inherit" component={Link} href={item.href}>
                    {item.label}
                </Button>
              ) : (
                <Button color="warning" variant="contained" component={Link} href={item.href}>
                  <Icon icon="streamline-logos:x-twitter-logo-block" width={24} />&nbsp;{item.label}
                </Button>
              )}
            </React.Fragment>
          );
        })}
      </Toolbar>
    </AppBar>
  );
}
