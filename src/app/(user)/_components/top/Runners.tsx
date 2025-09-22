'use client';
import { apiFetch } from "@/lib/fetch";
import { Icon } from "@iconify/react";
import { Box, Card, Chip, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { JSX, useState, useEffect } from "react";
import { UserDto } from "@/hooks/useMe";

const runner = { 
  name: "村山尊紀",
  nickname: "始祖のランナー",
  type: ["ランナー"],
  fullMarathon: "1時間18分", 
  informations: [
    { head: "所在地", detail: "大阪府" },
    { head: "ランニングコース", detail: "大阪市鶴見区周辺" },
    { head: "時間帯", detail: "早朝(調整可能)" },
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
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(false);
  
  // useEffectを使用してコンポーネントマウント時に一度だけ実行
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // 型システムを一時的に回避してクエリパラメータ付きでAPIを呼び出し
        const res = await apiFetch('/api/users', {
          method: 'get', 
          // @ts-expect-error // TODO: swagger/openAPIの型定義のqueryが効かないため一時的に無視
          query: { 
            role: "ADMIN", // 管理者のみ取得
            category: "RUNNER" // 必要に応じてランナーのみに絞り込み
          } 
        });
        // @ts-expect-error // TODO: swagger/openAPIの型定義のレスポンスが効かないため一時的に無視
        setUsers(res);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []); // 空の依存配列で初回のみ実行

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
          
          {loading ? (
            <Typography>ランナー情報を読み込み中...</Typography>
          ) : (
            <div className="flex flex-col gap-8">
              <Card sx={{ borderRadius: "16px", boxShadow: 3, display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, direction: 'row', justifyContent: 'space-between', maxHeight: 500 }}>
                <Image src="/sns-posted.png" alt="SNS投稿" width={300} height={300} style={{ width: "30%", height: "auto", maxWidth: "500px", maxHeight: "300px", objectFit: "cover" }} />
                <Stack spacing={1} sx={{ padding: "2rem", flex: 1 }}>
                  <Chip label="一人目のランナー" color="primary" sx={{ width: "fit-content", fontWeight: "bold" }} />
                  {users[0] && <Typography variant="h3" >{users[0].displayName}</Typography>}
                  <Rows />
                </Stack>
              </Card>
            </div>
          )}
        </Container>
      </Box>
    </>
  );
}
