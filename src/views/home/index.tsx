import { Outlet } from 'react-router-dom'
import React from 'react'
/**
 * TODO
 * @author pepedd864
 * @date 2024/7/7
 */
export default function HomeView() {
  return (
    <>
      <div>
        home
        <Outlet />
      </div>
    </>
  )
}
