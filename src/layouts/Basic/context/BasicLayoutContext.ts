/**
 * TODO
 * @author pepedd864
 * @date 2024/7/7
 */
import React from 'react'
export type SideBarState = 'collapsed' | 'expanded'
export interface BasicLayoutContextProps {
  isMobile: boolean
  drawerWidth: number
  sideBarState: SideBarState
  toggleSideBar: () => void
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
  setSideBarState: React.Dispatch<React.SetStateAction<SideBarState>>
}

const BasicLayoutContext = React.createContext<BasicLayoutContextProps | undefined>(undefined)

export default BasicLayoutContext
