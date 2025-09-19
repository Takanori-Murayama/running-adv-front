import { Box, Container, Divider, List, ListItem } from "@mui/material";

const listTexts = [
  "今の広告では求めているところに出せていない",
  "広告を出そうと思うが初期費用が高い",
  "看板広告かSNS広告かどちらに出そうか迷っている",
  "小さく広告を始めてみたい",
];

export default function YourConcern() {
  return (
    <>
      <Container maxWidth="md" sx={{
        marginTop: "10rem",
        marginBottom: "10rem",
      }}>
        <Box sx={{
          backgroundColor: "secondary.main",
          padding: "4rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}>
          <h2 className="text-[32px] text-center font-bold">こんなお悩みありませんか？</h2>
          <Divider sx={{ marginY: "1rem" }} />
          <List sx={{ paddingLeft: "1.5rem" }}>
            {listTexts.map((text, index) => (
              <ListItem key={index} sx={{ fontSize: { xs: "1.5rem", sm: "1.5rem" } }}>●&nbsp;{text}</ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
}
