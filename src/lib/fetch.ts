import type { paths } from '@/types/api';

// 環境に応じたAPI_BASEの取得
function getApiBase(): string {
  // サーバーサイドの場合
  if (typeof window === 'undefined') {
    // 将来的にAPI_BASE_URLで内部ネットワーク最適化が可能
    return process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3030';
  }
  // クライアントサイドの場合
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3030';
}

const API_BASE = getApiBase();

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type Operation<P extends string, M extends string> =
  P extends keyof paths ? (M extends keyof paths[P] ? paths[P][M] : never) : never;

type QueryOf<Op> =
  Op extends { parameters: { query: infer Q } } ? Q : undefined;

type JsonBodyOf<Op> =
  Op extends { requestBody: { content: { 'application/json': infer B } } } ? B : undefined;

type JsonRespOf<Op> =
  Op extends { responses: { 200: { content: { 'application/json': infer R } } } } ? R :
  Op extends { responses: { 201: { content: { 'application/json': infer R } } } } ? R :
  Op extends { responses: { default: { content: { 'application/json': infer R } } } } ? R :
  unknown;

type BaseOpts = {
  pathParams?: Record<string, string | number>;
  headers?: Record<string, string>;
  // 追加で native fetch のオプションを許す（credentials は固定で include）
  signal?: AbortSignal;
  cache?: RequestCache;
  keepalive?: boolean;
  // サーバーサイド対応のオプション
  cookies?: string; // サーバーサイドでCookieを手動設定する場合
  forwardHeaders?: Record<string, string>; // クライアントからのヘッダーを転送する場合
  // レスポンス詳細を取得するオプション
  includeResponseDetails?: boolean; // trueにするとstatusやheadersも返す
};

// レスポンス詳細を含む型
export type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  ok: boolean;
};

type WithQuery<Q> = Q extends undefined ? { query?: undefined } : { query?: Q };
type WithBody<B>  = B extends undefined ? { body?: undefined }  : { body?: B };

// _apiFetch の第2引数と同一のオプション型（method を含む）
type Options<P extends keyof paths & string, M extends HttpMethod> =
  { method: M } &
  BaseOpts &
  WithQuery<QueryOf<Operation<P, M>>> &
  WithBody<JsonBodyOf<Operation<P, M>>>;

// method を除いた型（ショートハンド用）
type OptionsNoMethod<P extends keyof paths & string, M extends HttpMethod> =
  Omit<Options<P, M>, 'method'>;

type OptionsNoMethodWithDetails<P extends keyof paths & string, M extends HttpMethod> =
  Omit<Options<P, M>, 'method'> & { includeResponseDetails: true };

// 汎用のメソッドバインダ（any 不使用）
function bindMethod<M extends HttpMethod>(method: M) {
  // オーバーロード：includeResponseDetailsがtrueの場合
  function boundMethod<P extends keyof paths & string>(
    path: P,
    opts: OptionsNoMethodWithDetails<P, M>
  ): Promise<ApiResponse<JsonRespOf<Operation<P, M>>>>;
  
  // オーバーロード：includeResponseDetailsがfalse/undefinedの場合
  function boundMethod<P extends keyof paths & string>(
    path: P,
    opts?: OptionsNoMethod<P, M>
  ): Promise<JsonRespOf<Operation<P, M>>>;
  
  // 実装
  function boundMethod<P extends keyof paths & string>(
    path: P,
    opts?: OptionsNoMethod<P, M> | OptionsNoMethodWithDetails<P, M>
  ): Promise<JsonRespOf<Operation<P, M>> | ApiResponse<JsonRespOf<Operation<P, M>>>> {
    const withMethod = { method, ...(opts ?? {}) } as unknown as Options<P, M>;
    return _apiFetch<P, M>(path, withMethod);
  }
  
  return boundMethod;
}

function fillPath(path: string, params?: Record<string, string | number>) {
  if (!params) return path;
  return path.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(String(params[k])));
}
function withQuery(url: string, query?: Record<string, unknown>) {
  if (!query) return url;
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      v.forEach(x => sp.append(k, String(x)));
    } else {
      sp.append(k, String(v));
    }
  }
  const qs = sp.toString();
  return qs ? `${url}${url.includes('?') ? '&' : '?'}${qs}` : url;
}

class HttpError extends Error {
  readonly status: number;
  readonly detail: unknown;
  constructor(status: number, detail: unknown, message?: string) {
    super(message ?? `HTTP ${status}`);
    this.status = status;
    this.detail = detail;
  }
}

export { HttpError };
function pickErrorMessage(detail: unknown): string | undefined {
  if (typeof detail !== 'object' || detail === null || Array.isArray(detail)) return undefined;
  const rec = detail as Record<string, unknown>;
  if (typeof rec.message === 'string') return rec.message;
  if (typeof rec.error === 'string') return rec.error;
  return undefined;
}

/** 本体：fetch風に1関数で使える OpenAPI 型付き fetch */
// オーバーロード：includeResponseDetailsがtrueの場合
async function _apiFetch<
  P extends keyof paths & string,
  M extends keyof paths[P] & HttpMethod
>(
  path: P,
  opts: (
    { method: M; includeResponseDetails: true } &
    BaseOpts &
    WithQuery<QueryOf<Operation<P, M>>> &
    WithBody<JsonBodyOf<Operation<P, M>>>
  )
): Promise<ApiResponse<JsonRespOf<Operation<P, M>>>>;

// オーバーロード：includeResponseDetailsがfalse/undefinedの場合
async function _apiFetch<
  P extends keyof paths & string,
  M extends keyof paths[P] & HttpMethod
>(
  path: P,
  opts: (
    { method: M } &
    BaseOpts &
    WithQuery<QueryOf<Operation<P, M>>> &
    WithBody<JsonBodyOf<Operation<P, M>>>
  )
): Promise<JsonRespOf<Operation<P, M>>>;

// 実装
async function _apiFetch<
  P extends keyof paths & string,
  M extends keyof paths[P] & HttpMethod
>(
  path: P,
  opts: (
    { method: M } &
    BaseOpts &
    WithQuery<QueryOf<Operation<P, M>>> &
    WithBody<JsonBodyOf<Operation<P, M>>>
  )
): Promise<JsonRespOf<Operation<P, M>> | ApiResponse<JsonRespOf<Operation<P, M>>>> {

  type Op = Operation<P, M>;
  type Q = QueryOf<Op>;
  type B = JsonBodyOf<Op>;
  type R = JsonRespOf<Op>;

  let url = API_BASE + fillPath(path, opts.pathParams);
  url = withQuery(url, (opts as { query?: Q }).query as unknown as Record<string, unknown> | undefined);

  const rawBody = (opts as unknown as { body?: B }).body;
  const hasJsonBody = rawBody !== undefined;

  // サーバーサイドかクライアントサイドかを判定
  const isServer = typeof window === 'undefined';

  // ヘッダーの構築
  const headers: Record<string, string> = {
    ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
    ...(opts.headers ?? {}),
  };

  // サーバーサイドの場合の追加ヘッダー処理
  if (isServer) {
    // Cookieがある場合は設定
    if (opts.cookies) {
      headers.Cookie = opts.cookies;
    }
    // 転送ヘッダーがある場合は追加
    if (opts.forwardHeaders) {
      Object.assign(headers, opts.forwardHeaders);
    }
  }

  const init: RequestInit = {
    method: String(opts.method).toUpperCase(),
    // サーバーサイドではcredentialsを設定しない
    ...(isServer ? {} : { credentials: 'include' as RequestCredentials }),
    headers,
    body: hasJsonBody ? JSON.stringify(rawBody as B) : undefined,
    signal: opts.signal,
    cache: opts.cache,
    keepalive: opts.keepalive,
  };

  // デバッグ: サーバーサイドでの認証情報を確認
  if (isServer && process.env.NODE_ENV === 'development') {
    console.log('🔍 Server-side fetch debug:', {
      url: url,
      method: init.method,
      hasCookies: !!headers.Cookie,
      hasAuth: !!headers.authorization,
      headers: Object.keys(headers)
    });
  }

  const res = await fetch(url, init);

  if (!res.ok) {
    let detail: unknown;
    const ct = res.headers.get('content-type') || '';
    try {
      detail = ct.includes('application/json') ? await res.json() : await res.text();
    } catch (parseError) { 
      // レスポンス解析に失敗した場合
      detail = { 
        error: 'Failed to parse response body',
        originalError: parseError instanceof Error ? parseError.message : 'Unknown error'
      };
    }
    
    const errorMessage = pickErrorMessage(detail) || `HTTP ${res.status} ${res.statusText}`;
    throw new HttpError(res.status, detail, errorMessage);
  }

  // レスポンスヘッダーを Record<string, string> に変換
  const responseHeaders: Record<string, string> = {};
  res.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  // レスポンスボディを取得
  let responseData: R;
  if (res.status === 204) {
    responseData = undefined as R;
  } else {
    const ct = res.headers.get('content-type') || '';
    responseData = ct.includes('application/json') 
      ? (await res.json()) as R
      : (await res.text()) as unknown as R;
  }

  // includeResponseDetailsオプションがtrueの場合、詳細情報を含むオブジェクトを返す
  if (opts.includeResponseDetails) {
    return {
      data: responseData,
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
      ok: res.ok
    } as ApiResponse<R>;
  }

  // デフォルトではボディのみを返す（従来の動作）
  return responseData;
}

/** メソッド別のショートハンドも用意（fetchライクに使える） */
export const apiFetch = Object.assign(_apiFetch, {
  get:    bindMethod('get'),
  post:   bindMethod('post'),
  put:    bindMethod('put'),
  patch:  bindMethod('patch'),
  delete: bindMethod('delete'),
});

/**
 * 使用例:
 * 
 * // 従来通り（ボディのみ）
 * const user = await apiFetch('/api/users/me', { method: 'get' });
 * 
 * // ステータスコードやヘッダーも取得
 * const response = await apiFetch('/api/users/me', { 
 *   method: 'get', 
 *   includeResponseDetails: true 
 * });
 * console.log(response.status);     // 200
 * console.log(response.data);       // ユーザーデータ
 * console.log(response.headers);    // レスポンスヘッダー
 */

/** 便利：レスポンス型/ボディ型を取り出すユーティリティ */
export type InferResp<P extends keyof paths & string, M extends HttpMethod> =
  JsonRespOf<Operation<P, M>>;
export type InferBody<P extends keyof paths & string, M extends HttpMethod> =
  JsonBodyOf<Operation<P, M>>;
export type InferQuery<P extends keyof paths & string, M extends HttpMethod> =
  QueryOf<Operation<P, M>>;

/**
 * サーバーサイド用のヘルパー関数
 * Next.jsのServer ActionsやAPI Routesで使用する際の便利関数
 */

/**
 * Next.jsのrequestからCookieヘッダーを取得
 * @param request - Next.jsのRequest オブジェクト
 * @returns Cookie文字列
 */
export function getCookiesFromRequest(request: Request): string | undefined {
  if (!request || !request.headers) return undefined;
  return request.headers.get('cookie') || undefined;
}

/**
 * 認証が必要なリクエストをサーバーサイドで実行するためのヘルパー
 * @param request - クライアントからのRequest
 * @returns サーバーサイド用のオプション
 */
export function createServerSideOptions(request: Request): Pick<BaseOpts, 'cookies' | 'forwardHeaders'> {
  const cookies = getCookiesFromRequest(request);
  const forwardHeaders: Record<string, string> = {};
  
  // 認証に関連するヘッダーを転送
  const authHeaders = ['authorization', 'x-api-key', 'x-csrf-token'];
  authHeaders.forEach(headerName => {
    if (!request || !request.headers) return;
    const value = request.headers.get(headerName);
    if (value) {
      forwardHeaders[headerName] = value;
    }
  });

  return {
    cookies,
    forwardHeaders: Object.keys(forwardHeaders).length > 0 ? forwardHeaders : undefined,
  };
}