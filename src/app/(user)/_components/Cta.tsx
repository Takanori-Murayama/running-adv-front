import CtaButtons from "@/components/parts/CtaButtons";
import { Box, Container, } from "@mui/material";

export default function Cta() {
  return (
    <Box sx={{
      backgroundImage: 'url("/cta-bg.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      paddingTop: "4rem",
      paddingBottom: "4rem",
      width: "100%",
    }}>
      <Container maxWidth="md" sx={{
        paddingTop: "4rem",
        paddingBottom: "4rem",
        textAlign: "center",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}>
        <h2 className="text-[32px] font-bold mb-4">さあ、あなたも走る広告を始めてみませんか？</h2>
        <CtaButtons />
      </Container>
    </Box>
  );
}