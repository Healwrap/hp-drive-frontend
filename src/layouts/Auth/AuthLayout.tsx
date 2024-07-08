import { Outlet, useNavigate } from 'react-router-dom'
import React from 'react'
import { Box, Container, CssBaseline, Typography } from '@mui/material'
import Link from '@mui/material/Link'

/**
 * TODO
 * @author pepedd864
 * @date 2024/7/6
 */
export default function AuthLayout() {
  const navigate = useNavigate()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Outlet />
      </Box>
      <Typography sx={{ mt: 8, mb: 4 }} variant="body2" color="textSecondary" align="center">
        <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          通用模板
        </Link>{' '}
        Created by pepedd864
      </Typography>
    </Container>
  )
}
