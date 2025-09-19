// lib/openapiFetch.ts
import type { paths } from '@/types/api';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!; // 例: http://localhost:3030

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

// 汎用のメソッドバインダ（any 不使用）
function bindMethod<M extends HttpMethod>(method: M) {
  return function <P extends keyof paths & string>(
    path: P,
    opts?: OptionsNoMethod<P, M>
  ) {
    const withMethod = ({ Headers: { 'Content-Type': 'application/json' }, method, ...(opts ?? {}) }) as unknown as Options<P, M>;
    return _apiFetch<P, M>(path, withMethod);
  };
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
    Array.isArray(v) ? v.forEach(x => sp.append(k, String(x))) : sp.append(k, String(v));
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
function pickErrorMessage(detail: unknown): string | undefined {
  if (typeof detail !== 'object' || detail === null || Array.isArray(detail)) return undefined;
  const rec = detail as Record<string, unknown>;
  if (typeof rec.message === 'string') return rec.message;
  if (typeof rec.error === 'string') return rec.error;
  return undefined;
}

/** 本体：fetch風に1関数で使える OpenAPI 型付き fetch */
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
): Promise<JsonRespOf<Operation<P, M>>> {

  type Op = Operation<P, M>;
  type Q = QueryOf<Op>;
  type B = JsonBodyOf<Op>;
  type R = JsonRespOf<Op>;

  let url = API_BASE + fillPath(path, opts.pathParams);
  url = withQuery(url, (opts as { query?: Q }).query as unknown as Record<string, unknown> | undefined);

  const rawBody = (opts as unknown as { body?: B }).body;
  const hasJsonBody = rawBody !== undefined;

  const init: RequestInit = {
    method: String(opts.method).toUpperCase(),
    credentials: 'include',
    headers: {
      ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...(opts.headers ?? {}),
    },
    body: hasJsonBody ? JSON.stringify(rawBody as B) : undefined,
    signal: opts.signal,
    cache: opts.cache,
    keepalive: opts.keepalive,
  };

  const res = await fetch(url, init);

  if (!res.ok) {
    let detail: unknown;
    const ct = res.headers.get('content-type') || '';
    try {
      detail = ct.includes('application/json') ? await res.json() : await res.text();
    } catch { /* ignore */ }
    throw new HttpError(res.status, detail, pickErrorMessage(detail));
  }

  if (res.status === 204) return undefined as R;

  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return (await res.json()) as R;
  return (await res.text()) as unknown as R;
}

/** メソッド別のショートハンドも用意（fetchライクに使える） */
export const apiFetch = Object.assign(_apiFetch, {
  get:    bindMethod('get'),
  post:   bindMethod('post'),
  put:    bindMethod('put'),
  patch:  bindMethod('patch'),
  delete: bindMethod('delete'),
});

/** 便利：レスポンス型/ボディ型を取り出すユーティリティ */
export type InferResp<P extends keyof paths & string, M extends HttpMethod> =
  JsonRespOf<Operation<P, M>>;
export type InferBody<P extends keyof paths & string, M extends HttpMethod> =
  JsonBodyOf<Operation<P, M>>;
export type InferQuery<P extends keyof paths & string, M extends HttpMethod> =
  QueryOf<Operation<P, M>>;