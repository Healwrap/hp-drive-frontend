import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import React, { useContext } from 'react'
import BasicLayoutContext from '@/layouts/Basic/context/BasicLayoutContext.ts'
import { BasicLayoutChildrenRoutes } from '@/router/index.tsx'
import { useNavigate } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'

/**
 * TODO
 * @author pepedd864
 * @date 2024/7/6
 */
export default function ISide() {
  const sideBarState = useContext(BasicLayoutContext)?.sideBarState
  const setSideBarState = useContext(BasicLayoutContext)?.setSideBarState
  const isMobile = useContext(BasicLayoutContext)?.isMobile
  const navigate = useNavigate()
  const drawerWidth = useContext(BasicLayoutContext)?.drawerWidth
  // const drawerWidth = sideBarState === 'expanded' ? 240 : 60

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={sideBarState === 'expanded'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      onClose={() => setSideBarState?.('collapsed')}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {BasicLayoutChildrenRoutes.map((route, index) => (
            <ListItem key={route.path} disablePadding>
              <ListItemButton onClick={() => navigate(`${route.path}`)}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <SettingsIcon />}</ListItemIcon>
                <ListItemText primary={route.meta?.title || route.path} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/*<Divider />*/}
      </Box>
    </Drawer>
  )
}
