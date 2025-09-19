import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";

function Step({ title, content, num }: { title: string; content: string; num: number }) {
  return (
    <Grid container spacing={3} width="100%" bgcolor="primary.main" p={2} borderRadius="16px" alignItems="center">
      <Grid size={1}><Box fontSize={40} sx={{ borderRadius: "3px", bgcolor: "white", p: 1, color: "primary.main" }}>{num + 1}</Box></Grid>
      <Grid size={11}>
        <Box display="flex" flexDirection="column" textAlign="left" mr={8}>
          <Typography variant="h3" component="h3">
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: "16px" }}
          >
            {content}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

const steps = [
  {
    title: "お問い合わせ",
    content: "まずはお問い合わせフォームからご連絡ください。担当者より折り返しご連絡いたします。",
  },
  {
    title: "広告内容の確認と決定、ご契約",
    content: "広告のデザインはお客様でご用意いただくか、弊社でのデザイン作成も可能です。契約内容と広告内容を確認し、最終決定します。",
  },
  {
    title: "広告ランニング開始",
    content: "準備が整い次第、ランナーが広告を背負って走り始めます。定期的にSNSでの報告も行います。",
  },
  {
    title: "効果測定・フィードバック",
    content: "広告の効果を測定し、必要に応じて改善点をフィードバックいたします。継続的なサポートも提供します。",
  },
];

export default function Flow() {
  return (
    <>
      <Box
        id="flow"
        sx={{
          paddingTop: "8rem",
          paddingBottom: "8rem",
          position: "relative",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Box sx={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "primary.main", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.5, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        <Container sx={{ zIndex: 1, position: "relative", textAlign: "center" }} maxWidth="lg">
          <Typography variant="h2">ご利用の流れ</Typography>
          <Divider sx={{ marginTop: "1rem", marginBottom: "6rem" }} />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <Step num={index} title={step.title} content={step.content} />
                {(steps.length - 1) !== index && <Icon icon="lsicon:triangle-down-filled" width="50" height="16" />}
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
