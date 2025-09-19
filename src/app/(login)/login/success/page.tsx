'use client';
import { useMe } from "@/hooks/useMe";

export default function SuccessPage() {
  const me = useMe();
  return (
    <div>
      <h1>ログイン成功</h1>
      <p>ようこそ！{me.user?.displayName}さん、ログインが成功しました。</p>
    </div>
  );
}