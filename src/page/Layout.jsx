import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <h1>这是要渲染很多页面的</h1>

      {/* 页面有子页面的时候， 需要给二级路由页面留一个路由出口   Outlet tag */}
      <Outlet />
    </div>
  )
}
