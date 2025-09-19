'use client';
import { Box, Container, Tab, Typography, Tabs } from "@mui/material";
import React from "react";
import ProductMdx from './template/product.mdx';
import PortfolioMdx from './template/portfolio.mdx';

function CustomTabPanel(props: { children?: React.ReactNode; index: string; value: string }) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        className="mdx"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }} className="mdx">
            {children}
          </Box>
        )}
      </div>
      <style jsx global>
        {`
          .mdx {
            h1, h2, h3, h4, h5, h6 {
              margin: 1.5rem 0 1rem 0;
              line-height: 1.4;
            }

            h1 {
              font-size: 2.5rem;
              font-weight: bold;
            }
            h2 {
              font-size: 2rem;
              font-weight: bold;
            }
            h3 {
              font-size: 1.8rem;
              font-weight: bold;
            }
  
            ul {
              padding-left: 1.5rem;
              margin: 1rem 0;
            }
  
            li {
              margin: 0.5rem 0;
              line-height: 1.6;
            }
  
            p {
              font-size: 1.125rem;
              line-height: 1.8;
            }
          }
          
        `}
      </style>
    </>
  );
}

export default function DetailPage() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ p: 4, width: '100%' }}>
      <Container maxWidth="md" sx={{ mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h2">事業サイトの詳細</Typography>
        <Typography variant="body1">このサイトは村山尊紀が運営しています。個人事業のサイトであるとともに、ポートフォリオとしての側面を持たせていますので両方の面での活用を考えています。</Typography>
        <Typography variant="body1">下記でそれぞれの面からの詳細を説明しています。</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="事業計画" value="1" />
            <Tab label="技術的詳細(ポートフォリオ)" value="2" />
          </Tabs>
          <CustomTabPanel value={value} index="1">
            <ProductMdx />
          </CustomTabPanel>
          <CustomTabPanel value={value} index="2">
            <PortfolioMdx />
          </CustomTabPanel>
        </Box>
      </Container>
    </Box>
  );
};
