import CtaButtons from '@/components/parts/CtaButtons';
import { Box, Container } from '@mui/material';
import Image from 'next/image';

export default function Hero() {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Image
        src="/runner-mv.png"
        alt="ランナー"
        fill
        style={{ objectFit: 'cover', zIndex: -1 }}
        priority
      />

      <Container className="h-full w-full flex flex-col items-start justify-center z-99">
        <p className="text-[80px] font-bold">あなたの広告を<br />背負って走ります。</p>
        <CtaButtons />
      </Container>
    </Box>
  );
}
