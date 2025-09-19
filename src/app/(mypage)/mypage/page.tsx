'use client';
import { useMe } from "@/hooks/useMe";
import { apiFetch } from "@/lib/fetch";
import { Button, Container, Divider, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function MyPage () {

  const { user, refresh } = useMe();
  const router = useRouter();

  const handleLogout = async () => {
    await apiFetch('/api/auth/logout', { method: 'post' });
    await refresh();
    router.push('/login');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={2} direction="column" justifyContent="flex-end">
        <h2>マイページ</h2>
        <Divider />
        <dl>
          <dt>名前</dt>
          <dd>{user?.displayName}</dd>
        </dl>
        <dl>
          <dt>メールアドレス</dt>
          <dd>{user?.email}</dd>
        </dl>
        <Button onClick={handleLogout} variant="contained">ログアウト</Button>
      </Stack>
    </Container>
  );
};