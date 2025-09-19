'use client';

import Image from 'next/image';
import { Box, Container, List, ListItem, ListItemButton } from '@mui/material';
import { MenuItem } from '@/app/type';
import React from 'react';

export default function Footer({ mainMenuItems }: { mainMenuItems: MenuItem[] }) {
  return (
    <Box sx={{ width: '100%', padding: "2rem", backgroundColor: 'primary.main' }}>
      <Container maxWidth="lg" sx={{ margin: '0 auto', textAlign: 'center', color: 'white' }}>
        <Image src="/logo-white.png" alt="ロゴ" width={200} height={100} style={{ margin: '0 auto', width: 'auto', height: '50px' }} />
        <List component="ul" sx={{ display: 'flex', justifyContent: 'center', padding: 0, marginTop: '1rem' }}>
          {mainMenuItems.map((link) => (
            <React.Fragment key={link.label}>
              {link.actionButton ? (
                <ListItem sx={{ width: 'auto', padding: 0, margin: '0 1rem' }}>
                  <ListItemButton href={link.actionButton.href} sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    {link.actionButton.label}
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem sx={{ width: 'auto', padding: 0, margin: '0 1rem' }}>
                  <ListItemButton href={link.href} sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    {link.label}
                  </ListItemButton>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Running Ad. All rights reserved.
        </Box>
      </Container>
    </Box>
  );
}
