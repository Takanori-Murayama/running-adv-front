import { Icon } from "@iconify/react";
import { Box, Card, Container, Divider, Typography } from "@mui/material";
import Image from "next/image";

export default function WhatIs() {
  return (
    <>
      <Box
        id="what"
        sx={{
          paddingTop: "8rem",
          paddingBottom: "8rem",
          position: "relative",
          backgroundColor: "primary.main",
          width: "100%",
        }}
      >
        <Icon icon="carbon:running" width="300" height="300" style={{ display: "block", position: "absolute", top: "5%", left: 0, color: "white", zIndex: 0 }} />
        <Container sx={{ zIndex: 1, position: "relative" }} maxWidth="lg">
          <Typography variant="h2">走る広告とは？</Typography>
          <Divider sx={{ marginTop: "1rem", marginBottom: "6rem" }} />
          <div className="flex flex-col gap-8">
            <Card sx={{ borderRadius: "16px", boxShadow: 3, display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, direction: 'row', justifyContent: 'space-between', maxHeight: 500 }}>
              <Box sx={{ padding: "2rem", flex: 1 }}>
                <Typography sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" }, marginBottom: "1rem" }}>市民ランナーが広告をつけて走ります。<br />ランナーが走るところに宣伝できるので、今までにない新しい形の広告です。</Typography>
                <Typography sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, fontWeight: "bold", color: "primary.main" }}>今までにない顧客にあなたの事業を届けましょう！</Typography>
              </Box>
              <Image src="/what-is.png" alt="広告をつけたランナー" width={300} height={300} style={{ width: "30%", height: "auto", maxWidth: "500px", maxHeight: "300px", objectFit: "cover" }} />
            </Card>
            <Card sx={{ borderRadius: "16px", boxShadow: 3, display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, direction: 'row', justifyContent: 'space-between', maxHeight: 500 }}>
              <Image src="/sns-posted.png" alt="SNS投稿" width={300} height={300} style={{ width: "30%", height: "auto", maxWidth: "500px", maxHeight: "300px", objectFit: "cover" }} />
              <Box sx={{ padding: "2rem", flex: 1 }}>
                <Typography sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" }, marginBottom: "1rem" }}>ランナーが走った報告をSNSで行います。</Typography>
                <Typography sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, fontWeight: "bold", color: "primary.main" }}>オフライン広告にオンラインでの拡散の可能性のおまけつき！</Typography>
              </Box>
            </Card>
          </div>
        </Container>
      </Box>
    </>
  );
}
