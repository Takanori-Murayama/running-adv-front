import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Grid } from "@mui/material";
import Link from 'next/link';

export default function CtaButtons() {
  return (
    <Grid container spacing={3} sx={{ justifyContent: "center" }}>
      <Button size="large" color="warning" variant="contained" component={Link} href="https://x.com/bcm_fr_pgrmer">
        <Icon icon="streamline-logos:x-twitter-logo-block" width={24} />&nbsp;DMでご相談
      </Button>
      <Button size="large" color="secondary" variant="contained" component={Link} href="mailto:running-adv@gmail.com">
        <Icon icon="material-symbols:mail" width="24" height="24" />&nbsp;メールでご相談
      </Button>
    </Grid>
  );
}