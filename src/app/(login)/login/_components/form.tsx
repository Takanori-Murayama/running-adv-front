'use client';
import { LoginButton } from '@/components/parts/AuthButtons';
import { apiFetch } from '@/lib/fetch';
import { Box, Button, Stack, TextField, Typography} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async () => {
    alert(`メール: ${mail}\nパスワード: ${password}`);
    try {
      await apiFetch('/api/auth/login', {
        method: 'post',
        body: { email: mail, password: password },
      });
      // ログイン成功したら /mypage へ
      router.push('/mypage');
    } catch (error) {
      console.error(error);
    }
  }

  return (
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
  );
}