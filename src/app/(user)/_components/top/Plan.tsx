import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Image from "next/image";

export default function Plan() {
  return (
    <>
      <Box
        id="plan"
        sx={{
          paddingTop: "8rem",
          paddingBottom: "8rem",
          position: "relative",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Container sx={{ zIndex: 1, position: "relative" }} maxWidth="lg">
          <Typography sx={{ textAlign: "center"}} variant="h2">プラン</Typography>
          <Typography sx={{ textAlign: "center"}} variant="body1">シンプルな１プランからはじめます</Typography>

          <Divider sx={{ marginY: "1rem" }} />
          <Grid container spacing={3} sx={{ marginTop: "4rem", justifyContent: "center" }} maxWidth="lg">
            <Grid size={6}>
              <Card sx={{ borderRadius: "1rem", boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h3" component="h3" sx={{ textAlign: "center", fontWeight: "bold" }}>
                    ベーシックプラン
                  </Typography>
                  <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold", marginTop: "1rem", textAlign: "center" }}>
                    50,000円（税込）
                  </Typography>
                </CardContent>
                <CardMedia>
                  <Image src="/adv-type.png" alt="広告タイプ" width={800} height={400} style={{ width: "100%", height: "auto", marginTop: "1rem", maxHeight: "400px", objectFit: "cover" }} />
                </CardMedia>
                <CardContent>
                  <List>
                    <ListItem><ListItemIcon><Icon icon="fa-solid:running" width="20" height="25" /></ListItemIcon><ListItemText primary="広告をつけて走るランナー1名"></ListItemText></ListItem>
                    <ListItem><ListItemIcon><Icon icon="streamline-logos:x-twitter-logo-block" width={24} /></ListItemIcon><ListItemText primary="走った報告をSNSで1回/週"></ListItemText></ListItem>
                    <ListItem><ListItemIcon><Icon icon="icon-park-twotone:one-key" width="25" height="25" /></ListItemIcon><ListItemText primary="走行時間約1時間"></ListItemText></ListItem>
                    <ListItem><ListItemIcon><Icon icon="material-symbols:assured-workload" width="24" height="24" /></ListItemIcon><ListItemText primary="週３回ランニング実施保証"></ListItemText></ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
