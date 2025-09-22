// hooks/useUsers.ts
import useSWR from 'swr';
import { apiFetch } from '@/lib/fetch';
import { UserDto } from './useMe';

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<UserDto[]>(
    '/api/users',
    async () => {
      const result = await apiFetch.get('/api/users');
      return result as UserDto[];
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    users: data ?? [],
    error,
    isLoading,
    refresh: () => mutate(),
  };
}