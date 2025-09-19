'use client';
import { LoginButton } from '@/components/parts/AuthButtons';
import { apiFetch } from '@/lib/fetch';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function LoginPage() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    alert(`メール: ${mail}\nパスワード: ${password}`);
    try {
      await apiFetch('/api/auth/login', {
        method: 'post',
        body: { email: mail, password: password },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Stack spacing={4} sx={{ p: 6 }}>
      <Typography variant="h2">Login</Typography>
      <Stack spacing={6} direction="column">
        <Stack spacing={2} direction="column">
          <TextField value={mail} onChange={(e) => setMail(e.target.value)} type="email" label="Email" />
          <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Password" />
          <Button variant="contained" onClick={submit}>ログイン</Button>
        </Stack>
        <Box border={1} sx={{ p:2, mt: 2, width: '100%' }}>
          <Typography variant="body1" gutterBottom>SNSログイン</Typography>
          <LoginButton />
        </Box>
      </Stack>
      <Link href="/mypage">マイページ</Link>
    </Stack>
  );
}