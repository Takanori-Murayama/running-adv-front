import useSWR from 'swr';
import { apiFetch, ApiResponse } from '@/lib/fetch';
import { isUnauthorizedError } from '@/types/error';
import { useRouter } from 'next/navigation';

export type UserDto = {
  id: string;
  email?: string | null;
  displayName?: string | null;
  photoUrl?: string | null;
} | null;

export function useMe() {
  const router = useRouter();
  
  // 型安全なfetcher関数
  const fetcher = async (): Promise<UserDto> => {
    try {
      // API型定義にcontentが含まれていないため、明示的に型を指定
      const result = await apiFetch('/api/users/me', { 
        method: 'get', 
        includeResponseDetails: true 
      }) as ApiResponse<UserDto>;
      
      // ログイン確認できない場合は/loginにリダイレクト
      if (result.status === 401) {
        if (typeof window !== 'undefined') {
          router.push('/login');
        }
        return null;
      }
      
      // 成功時はデータを返す
      return result.data;
    } catch (error) {
      // 認証エラーの場合はnullを返す
      if (isUnauthorizedError(error)) {
        if (typeof window !== 'undefined') {
          router.push('/login');
        }
        return null;
      }
      throw error;
    }
  };

  const { data, error, isLoading, mutate } = useSWR<UserDto>(
    '/api/users/me',
    fetcher,
    { revalidateOnFocus: false }
  );
  
  return { user: data ?? null, error, isLoading, refresh: () => mutate() };
}