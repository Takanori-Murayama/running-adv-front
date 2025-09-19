import { Icon } from "@iconify/react";
import { Box, Card, Chip, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { JSX } from "react";

const runner = { 
  name: "村山尊紀",
  nickname: "始祖のランナー",
  type: ["ランナー"],
  fullMarathon: "1時間18分", 
  informations: [
    { head: "所在地", detail: "大阪府" },
    { head: "ランニングコース", detail: "大阪市鶴見区周辺" },
    { head: "時間帯", detail: "早朝" },
    { head: "目的", detail: "ダイエット、体づくり" },
    { head: "職業", detail: "Webエンジニア" },
  ]
};

const Rows = () => {
  const result: JSX.Element[] = [];
  runner.informations.forEach(info => {
    result.push(
      <Grid container spacing={2} key={info.head}>
        <Grid size={2}>
          <Typography>{info.head}</Typography>
        </Grid>
        <Grid size={1}>
          <Typography>：</Typography>
        </Grid>
        <Grid size={9}>
          <Typography>{info.detail}</Typography>
        </Grid>
      </Grid>
    );
  });
  return result;
}

export default function Runners() {


  return (
    <>
      <Box
        id="runners"
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
          <Typography variant="h2">ランナー</Typography>
          <Divider sx={{ marginTop: "1rem", marginBottom: "6rem" }} />
          <div className="flex flex-col gap-8">
            <Card sx={{ borderRadius: "16px", boxShadow: 3, display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, direction: 'row', justifyContent: 'space-between', maxHeight: 500 }}>
              <Image src="/sns-posted.png" alt="SNS投稿" width={300} height={300} style={{ width: "30%", height: "auto", maxWidth: "500px", maxHeight: "300px", objectFit: "cover" }} />
              <Stack spacing={1} sx={{ padding: "2rem", flex: 1 }}>
                <Chip label="始祖のランナー" color="primary" sx={{ width: "fit-content", fontWeight: "bold" }} />
                <Typography variant="h3" >村山尊紀</Typography>
                <Rows />
              </Stack>
            </Card>
          </div>
        </Container>
      </Box>
    </>
  );
}
