'use client';

import { Button } from "@mui/material";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export function LoginButton() {
  const start = () => {
    const returnTo = window.location.pathname + window.location.search; // 例: /dashboard?tab=me
    const url = new URL('/api/auth/google', API_BASE);
    url.searchParams.set('returnTo', returnTo || '/'); // ← encode しない
    window.location.href = url.toString();
  };
  return <Button variant="contained" onClick={start}>Sign in with Google</Button>;
}

export function LogoutButton() {
  const logout = () => {
    window.location.href = `${API_BASE}/api/auth/logout`;
  };
  return <button onClick={logout}>Logout</button>;
}