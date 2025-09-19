'use client';
import useSWR from 'swr';
import { apiFetch } from '@/lib/fetch';

export type UserDto = {
  id: string;
  email?: string | null;
  displayName?: string | null;
  photoUrl?: string | null;
} | null;

export function useMe() {
  const { data, error, isLoading, mutate } = useSWR<UserDto>(
    '/api/auth/me',
    async () => await apiFetch('/api/auth/me', { method: 'get' }),
    { revalidateOnFocus: false }
  );
  return { user: data ?? null, error, isLoading, refresh: () => mutate() };
}