import { getAuthenticatedUser } from "@/lib/auth-ssr";

export default async function MyPageLayout({ children }: { children: React.ReactNode }) {
  await getAuthenticatedUser();
  
  return (
    <>{children}</>
  );
}
