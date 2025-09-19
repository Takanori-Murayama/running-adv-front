import { Box, Container, Grid } from "@mui/material";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
