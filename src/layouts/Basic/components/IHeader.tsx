import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MoreIcon from '@mui/icons-material/MoreVert'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import React, { useContext, useState } from 'react'
import useAppStore from '@/stores/modules/app.ts'
import BasicLayoutContext from '@/layouts/Basic/context/BasicLayoutContext.ts'
import { useNavigate } from 'react-router-dom'
import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

/**
 * TODO
 * @author pepedd864
 * @date 2024/7/6
 */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '16ch',
      '&:focus': {
        width: '23ch',
      },
    },
  },
}))

export default function IHeader() {
  const navigate = useNavigate()
  const toggleSideBar = useContext(BasicLayoutContext)?.toggleSideBar

  const darkMode = useAppStore((state) => state.darkMode)
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode)

  const [anchorEl, setAnchorEl] = useState(null)
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => toggleSideBar?.()}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          HP Drive
        </Typography>
        <Box sx={{ marginLeft: { xs: 0, md: 10 } }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="搜索…" />
          </Search>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" color="inherit" onClick={() => toggleDarkMode()}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={() => navigate('/auth/login')}
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" color="inherit" onClick={handleMenuOpen}>
            <MoreIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => toggleDarkMode()}>
              {darkMode ? '亮色模式' : '暗色模式'}
            </MenuItem>
            <MenuItem onClick={() => navigate('/auth/login')}>我的账户</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
