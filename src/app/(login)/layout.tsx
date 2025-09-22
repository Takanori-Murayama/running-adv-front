import { getCurrentUser } from "@/lib/auth-ssr";
import { Box, Container, Grid } from "@mui/material";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // 認証済みユーザーは/mypageにリダイレクト
  const user = await getCurrentUser();
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 (login)/layout.tsx - Auth check:', {
      hasUser: !!user,
      userId: user?.id,
      timestamp: new Date().toISOString()
    });
  }
  
  if (user && user.id) {
    console.log('✅ User authenticated, redirecting to /mypage');
    redirect('/mypage');
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ width: '100%', minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Box sx={{ p: 4, border: '1px solid #ccc', borderRadius: 2, boxShadow: 3 }}>
          {children}
        </Box>
      </Container>
    </Grid>
  );
}
