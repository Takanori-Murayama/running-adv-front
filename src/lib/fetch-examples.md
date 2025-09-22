# apiFetch サーバーサイド対応 使用例

## クライアントサイドでの使用

```typescript
import { apiFetch } from '@/lib/fetch';

// 通常の使用方法（変更なし）
const user = await apiFetch('/api/users/me', { method: 'get' });
```

## サーバーサイドでの使用

### 1. Next.js API Routes

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { apiFetch, createServerSideOptions } from '@/lib/fetch';

export async function GET(request: NextRequest) {
  try {
    // クライアントからの認証情報を取得
    const serverOptions = createServerSideOptions(request);
    
    // バックエンドAPIを呼び出し
    const user = await apiFetch('/api/users/me', {
      method: 'get',
      ...serverOptions
    });
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
```

### 2. Server Actions

```typescript
// app/actions/user.ts
'use server';

import { cookies } from 'next/headers';
import { apiFetch } from '@/lib/fetch';

export async function getUserProfile() {
  try {
    // Next.jsのcookiesヘルパーからCookieを取得
    const cookieStore = cookies();
    const cookieString = cookieStore.toString();
    
    const user = await apiFetch('/api/users/me', {
      method: 'get',
      cookies: cookieString
    });
    
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
}
```

### 3. 手動でCookieを指定

```typescript
import { apiFetch } from '@/lib/fetch';

// 特定のCookieでAPI呼び出し
const user = await apiFetch('/api/users/me', {
  method: 'get',
  cookies: 'sessionId=abc123; token=xyz789',
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

### 4. 認証ヘッダーの転送

```typescript
import { apiFetch } from '@/lib/fetch';

const user = await apiFetch('/api/users/me', {
  method: 'get',
  forwardHeaders: {
    'authorization': 'Bearer token123',
    'x-api-key': 'key456'
  }
});
```

## 環境変数の設定

### .env.local (開発環境)
```bash
# クライアントサイド用（ブラウザからアクセス可能）
NEXT_PUBLIC_API_BASE_URL=http://localhost:3030

# サーバーサイド用（サーバーでのみアクセス可能）
API_BASE_URL=http://localhost:3030
```

### .env.production (本番環境)
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
API_BASE_URL=http://internal-api:3030  # 内部ネットワーク用URL
```

## 主な改善点

1. **環境判定**: `typeof window === 'undefined'` でサーバーサイドを判定
2. **環境変数**: サーバーサイドでは `API_BASE_URL`、クライアントサイドでは `NEXT_PUBLIC_API_BASE_URL` を使用
3. **Cookie処理**: サーバーサイドでは手動でCookieを設定
4. **認証ヘッダー**: クライアントからのヘッダーをサーバーサイドで転送可能
5. **credentials**: サーバーサイドでは `credentials: 'include'` を設定しない