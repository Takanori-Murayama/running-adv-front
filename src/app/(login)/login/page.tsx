import { Stack, Typography } from '@mui/material';
import LoginForm from './_components/form';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!; // 例: http://localhost:3030

export default async function LoginPage() {

  const headerObj = await headers();
  const cookie = headerObj.get('cookie') || '';
    // 認証確認（キャッシュさせない）
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    method: 'GET',
    headers: { cookie },
    // サーバfetchなので credentials は不要。Cookieは明示的に渡す。
    cache: 'no-store',
  });

  if (res.ok) {
    // 既ログインなら /mypage へ
    redirect('/mypage');
  }

  return (
    <Stack spacing={4} sx={{ p: 6 }}>
      <Typography variant="h2">Login</Typography>
      <LoginForm />
    </Stack>
  );
}