'use client';
import { Button } from "@mui/material";
import { apiFetch } from "@/lib/fetch";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export function LoginButton() {
  const start = () => {
    const url = new URL('/api/auth/google', API_BASE);
    window.location.href = url.toString();
  };
  return <Button variant="contained" onClick={start}>Sign in with Google</Button>;
}

export function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    try {
      await apiFetch('/api/auth/logout', {
        method: 'post',
      });
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };
  return <Button variant="contained" onClick={logout}>Logout</Button>;
}