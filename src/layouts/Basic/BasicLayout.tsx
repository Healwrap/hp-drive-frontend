import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ILayout from './components/ILayout'
import BasicLayoutContext, {
  BasicLayoutContextProps,
  SideBarState,
} from './context/BasicLayoutContext.ts'
import { CssBaseline } from '@mui/material'

/**
 * TODO
 * @author pepedd864
 * @date 2024/7/6
 */
export default function BasicLayout() {
  const [sideBarState, setSideBarState] = React.useState<SideBarState>('expanded')

  const [isMobile, setIsMobile] = React.useState(false)

  const toggleSideBar = () => {
    sideBarState === 'expanded' ? setSideBarState('collapsed') : setSideBarState('expanded')
  }

  const layoutContext: BasicLayoutContextProps = {
    isMobile,
    drawerWidth: 240,
    sideBarState,
    toggleSideBar,
    setIsMobile,
    setSideBarState,
  }

  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home')
    }
  }, [navigate])
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    // 在组件挂载时检查一次
    checkMobile()
    // 添加事件监听器
    window.addEventListener('resize', checkMobile)
    // 在组件卸载时移除事件监听器
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return (
    <BasicLayoutContext.Provider value={layoutContext}>
      <CssBaseline />
      <ILayout>
        <Outlet />
      </ILayout>
    </BasicLayoutContext.Provider>
  )
}
