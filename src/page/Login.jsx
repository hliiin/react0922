import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { login,logout } from '../store/modules/authSlice'

// 有个小仓库存储 和登陆状态相关的数据
// 如果为true 表示已经登陆, 如果为false 表示用户没有登入


export default function Login() {

  // 1.1 使用useDispatch()  调用仓库的方法
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 测试引入登陆状态,看一下当前值
  const {isLogin} = useSelector(state => state.auth)
  console.log(isLogin);
  

  // 1.2 使用仓库的登陆方法的时候, 顺便登陆成功跳转到首页 '/'
  const handleLogin = () => {
    dispatch(login())  // 用仓库登陆方法
    navigate('/')// 并且跳转到首页
    
  }


  return (
    <div>
      <h1>我是login</h1>
      {/* 1.3 绑定方法 */}
      <button onClick = {handleLogin}>点击登陆</button>
      <button onClick = {() => dispatch(logout())}>退出</button>
    </div>
  )
}
