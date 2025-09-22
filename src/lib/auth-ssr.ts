// lib/auth-ssr.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiFetch } from '@/lib/fetch';
import { isUnauthorizedError } from '@/types/error';

export type AuthenticatedUser = {
  id: string;
  email?: string | null;
  displayName?: string | null;
  photoUrl?: string | null;
};

/**
 * SSRで認証が必要なページ用のユーザー情報取得関数
 * 認証されていない場合は自動的に/loginにリダイレクト
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser> {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    
    // デバッグ情報を追加
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 SSR Auth Check:', {
        hasCookies: cookieString.length > 0,
        cookieKeys: Array.from(cookieStore.getAll()).map(c => c.name)
      });
    }
    
    const user = await apiFetch('/api/users/me', {
      method: 'get',
      cookies: cookieString
    }) as AuthenticatedUser;
    
    return user;
  } catch (error) {
    if (isUnauthorizedError(error)) {
      redirect('/login');
    }
    // その他のエラーはページエラーとして表示
    throw error;
  }
}

/**
 * 認証をチェックするが、未認証でもnullを返す（リダイレクトしない）
 */
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    
    const user = await apiFetch('/api/users/me', {
      method: 'get',
      cookies: cookieString
    }) as AuthenticatedUser;
    
    return user;
  } catch (error) {
    if (isUnauthorizedError(error)) {
      return null;
    }
    throw error;
  }
}