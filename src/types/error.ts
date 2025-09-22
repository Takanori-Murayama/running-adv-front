/**
 * HTTP関連のエラー型定義とユーティリティ関数
 */

// 実際のHttpErrorクラスを再エクスポート
export { HttpError } from '@/lib/fetch';
import { HttpError } from '@/lib/fetch';

/**
 * オブジェクトがHttpErrorかどうかを判定する型ガード関数
 * @param error - 判定対象のオブジェクト
 * @returns HttpErrorの場合はtrue
 */
export function isHttpError(error: unknown): error is HttpError {
  return (
    error instanceof Error &&
    'status' in error &&
    typeof (error as HttpError).status === 'number'
  );
}

/**
 * 特定のHTTPステータスコードかどうかを判定する関数
 * @param error - 判定対象のエラー
 * @param status - 判定したいHTTPステータスコード
 * @returns 指定されたステータスコードの場合はtrue
 */
export function isHttpStatus(error: unknown, status: number): boolean {
  return isHttpError(error) && error.status === status;
}

/**
 * 認証エラー（401）かどうかを判定する関数
 * @param error - 判定対象のエラー
 * @returns 401エラーの場合はtrue
 */
export function isUnauthorizedError(error: unknown): boolean {
  return isHttpStatus(error, 401);
}

/**
 * 禁止エラー（403）かどうかを判定する関数
 * @param error - 判定対象のエラー
 * @returns 403エラーの場合はtrue
 */
export function isForbiddenError(error: unknown): boolean {
  return isHttpStatus(error, 403);
}

/**
 * 見つからないエラー（404）かどうかを判定する関数
 * @param error - 判定対象のエラー
 * @returns 404エラーの場合はtrue
 */
export function isNotFoundError(error: unknown): boolean {
  return isHttpStatus(error, 404);
}