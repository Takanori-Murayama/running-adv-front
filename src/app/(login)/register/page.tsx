'use client';
import { apiFetch } from "@/lib/fetch";
import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function RegisterPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      displayName: name,
      email,
      password,
    };
    console.log(data);
    // ここでAPIにデータを送信する処理を追加
    const res = await apiFetch('/api/auth/register', {
      method: 'post',
      body: data,
    });
    if (res) {
      alert('登録が完了しました。ログインしてください。');
      setName('');
      setEmail('');
      setPassword('');
    } else {
      alert('登録に失敗しました。');
    }
  }

  return (
    <Box sx={{ p: 6, }}>
      <Grid container justifyContent="center" flexDirection={"column"} alignItems="center" spacing={4}>
        <Typography variant="h2">新規会員登録</Typography>
        <TextField placeholder="お名前" value={name} onChange={(e) => setName(e.target.value)} name="name" required sx={{ mb: 2, width: '100%' }} />
        <TextField placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required sx={{ mb: 2, width: '100%' }} />
        <TextField placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" required sx={{ mb: 2, width: '100%' }} />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          送信して登録
        </Button>
        <Box border={1} sx={{ p:2, mt: 4, textAlign: 'left', width: '100%' }}>
          <p>こちらで登録します。</p>
          <Divider sx={{ my: 2 }} />
          <ul>
            <li>お名前: {name}</li>
            <li>メールアドレス: {email}</li>
            <li>パスワード: {password}</li>
          </ul>
        </Box>
      </Grid>
    </Box>
  );
}