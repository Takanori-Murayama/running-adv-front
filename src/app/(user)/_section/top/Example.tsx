import { Box, Card, Container, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function Example() {
  return (
    <>
      <Box
        sx={{
          paddingTop: "8rem",
          paddingBottom: "8rem",
          position: "relative",
          backgroundColor: "white",
          width: "100%",
        }}
        id="example"
      >
        <Container sx={{ zIndex: 1, position: "relative" }} maxWidth="lg">
          <Typography alignContent="center" variant="h2">例えばこんなことが！？</Typography>
          <Divider sx={{ marginY: "1rem" }} />
          <Grid container spacing={3} sx={{ marginTop: "4rem" }} maxWidth="lg">
            <Grid size={6}>
              <Card sx={{ padding: "2rem", borderRadius: "1rem", boxShadow: 3 }}>
                <Typography variant="h3" component="h3">
                  広告が動くので<br />目立つ！
                </Typography>
                <Typography variant="body1" component="p">
                  市民ランナーに広告がついているなんて、なかなか見かけないですよね？<br />そのため、街中広告よりも目立ちやすく、注目を集めやすい！
                </Typography>
              </Card>
            </Grid>
            <Grid size={6}>
              <Card sx={{ padding: "2rem", borderRadius: "1rem", boxShadow: 3 }}>
                <Typography variant="h3" component="h3">
                  街中広告よりも<br />低コスト！
                </Typography>
                <Typography variant="body1" component="p">
                  街中広告は設置費用や維持費用が高くつきますが、走る広告はランナーに直接依頼するため、低コストで始められます。
                </Typography>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card sx={{ padding: "2rem", borderRadius: "1rem", boxShadow: 3 }}>
                <Typography variant="h3" component="h3">
                  走行中はこんな感じ！
                </Typography><Image src="/runner-behind.png" alt="走行中のイメージ" width={800} height={400} style={{ width: "100%", height: "auto", marginTop: "1rem", borderRadius: "1rem", maxHeight: "400px", objectFit: "cover" }} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
