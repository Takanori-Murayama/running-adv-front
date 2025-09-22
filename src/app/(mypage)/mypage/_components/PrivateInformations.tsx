'use client';
import { LogoutButton } from "@/components/parts/AuthButtons";
import { useMe } from "@/hooks/useMe";

export default function PrivateInformations() {
  const { user } = useMe();
  return (
    <>
      <dl>
        <dt>名前</dt>
        <dd>{user?.displayName}</dd>
      </dl>
      <dl>
        <dt>メールアドレス</dt>
        <dd>{user?.email}</dd>
      </dl>
      <LogoutButton />
    </>
  );
}