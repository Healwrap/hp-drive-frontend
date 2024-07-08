import React from 'react'
import IHeader from '@/layouts/Basic/components/IHeader.tsx'
import { Box, Toolbar } from '@mui/material'
import ISide from '@/layouts/Basic/components/ISide.tsx'

/**
 * TODO
 * @author pepedd864
 * @date 2024/7/6
 */
interface ILayoutProps {
  children: React.ReactNode
}
export default function ILayout({ children }: ILayoutProps) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <IHeader />
        <Box>
          <Toolbar />
          <Box sx={{ display: 'flex' }}>
            <ISide />
            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}
