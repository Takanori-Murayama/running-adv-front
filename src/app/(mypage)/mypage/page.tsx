import PrivateInfomations from "@/app/(mypage)/mypage/_components/PrivateInformations";
import { Container, Divider, Stack } from "@mui/material";
export default function MyPage () {

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={2} direction="column" justifyContent="flex-end">
        <h2>マイページ</h2>
        <Divider />
        <PrivateInfomations />
      </Stack>
    </Container>
  );
};