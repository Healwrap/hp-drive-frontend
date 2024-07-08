import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import React from 'react'

/**
 * TODO
 * @author pepedd864
 * @date 2024/7/7
 */
export default function LoginView() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        登录
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="邮箱"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="密码"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="记住我" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          登录
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              忘记密码?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {'没有账号? 注册'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
