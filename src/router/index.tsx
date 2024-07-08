import { createBrowserRouter, RouteObject } from 'react-router-dom'
import BasicLayout from '@/layouts/Basic/BasicLayout.tsx'
import AuthLayout from '@/layouts/Auth/AuthLayout.tsx'
import NotFound from '@/views/exceptions/NotFound'
import React, { lazy, Suspense } from 'react'

export type IRoute = {
  meta?: {
    title: string
    icon?: string
  }
} & RouteObject

export const BasicLayoutChildrenRoutes: IRoute[] = []
export const AuthLayoutChildrenRoutes: IRoute[] = []

function isView(pathArr: string[]) {
  return pathArr[pathArr.length - 1] === 'index'
}

function getPathAndPathArr(files: any, exceptDirs: string[]) {
  const res: {
    path: string
    pathArr: string[]
    ViewComponent: React.LazyExoticComponent<React.ComponentType<any>>
  }[] = []
  for (const file in files) {
    const path = file.replace('/src/views/', '').replace(/\.(tsx|ts)/, '')
    if (exceptDirs.some((item) => path.includes(item))) {
      continue
    }
    const pathArr = path.split('/')
    if (!isView(pathArr)) {
      continue
    }
    // 获取页面实例 懒加载
    const ViewComponent = lazy(() => files[file]())
    // console.log(path, pathArr)
    res.push({ path, pathArr, ViewComponent })
  }
  return res
}

function getRoutes(paths: any, routes: any) {
  // 第一遍处理一级路由
  for (const item of paths) {
    const ViewComponent = item.ViewComponent
    if (item.pathArr.length === 2) {
      routes.push({
        meta: {
          title: item.pathArr[0],
        },
        path: item.pathArr[0],
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ViewComponent />
          </Suspense>
        ),
      })
    }
  }
  // 第二遍处理二级路由
  for (const item of paths) {
    // 二级路由，目前最多支持二级路由
    const ViewComponent = item.ViewComponent
    if (item.pathArr.length === 3) {
      const pushRoute = {
        meta: {
          title: item.pathArr[0],
        },
        path: item.pathArr[1],
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ViewComponent />
          </Suspense>
        ),
      } as IRoute
      // 如果是子路由
      routes.forEach((it: any) => {
        if (it.path === item.pathArr[0]) {
          it.children = it.children || []
          it.children.push(pushRoute)
        }
      })
      // 不是子路由
      if (!routes.some((it: any) => it.path === item.pathArr[0])) {
        routes.push(pushRoute)
      }
    }
  }
}

function getBasicRoutes() {
  const exceptDirs = ['auth', 'exceptions']
  // 获取@/views下的所有文件
  const files = import.meta.glob('@/views/**/*')
  const paths = getPathAndPathArr(files, exceptDirs)
  getRoutes(paths, BasicLayoutChildrenRoutes)
}

function getAuthRoutes() {
  const files = import.meta.glob('@/views/auth/**/*')
  const paths = getPathAndPathArr(files, [])
  getRoutes(paths, AuthLayoutChildrenRoutes)
}

getBasicRoutes()
getAuthRoutes()

/**
 * 路由配置
 * @author pepedd864
 * @date 2024/7/6
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: BasicLayoutChildrenRoutes,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: AuthLayoutChildrenRoutes,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
