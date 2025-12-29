import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// 创建保护路由的组件: 判断一些需要登陆的路由, 在访问的时候,需要先查看isLogin是否为true, 是的话可以访问该路由,不是的话就不能访问,就直接跳转到/login

export default function ProtectedRoutes({element,requersAuth}) {
  // 1.2 需要引入 isLogin 这个状态
  const {isLogin} = useSelector(state => state.auth)
  console.log(isLogin);
  
  // 1.3  开始根据传递参数判断{element,requersAuth}, 如果有requersAuth 并且现在是没有登陆的状态, 那么就跳转到首页去
  if(requersAuth && !isLogin) {
    // Navigate: react-router-dom中提供的组件,用于路由跳转
    return (<Navigate to={'/login'} />)
  } else {
    return element
  }
}

// 保护组件写完之后 去router,js中引用下
