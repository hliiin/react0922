// 存放login的登陆状态, 以及登陆和退出的方法
import { createSlice } from '@reduxjs/toolkit'

//  创建slice
const authSlice = createSlice({
  // 定义一个name
  name:'auth',
  // 定义小仓库都有什么数据，并且初始化， 这些数据都是属于state的
  initialState: {
    isLogin: false,
  },
  reducers: {
    // 登陆
    login: (state) => {
      state.isLogin = true
    },
    // 退出
    logout: (state) => {
      state.isLogin = false
    }


    
    
  }
})


//  解构一下reducers里面写的方法, 方便外部的page可以使用仓库中的方法
const {login,logout} = authSlice.actions

// 获取reducer
const authReducer = authSlice.reducer

//  把2  3步骤的内容都导出 供外部页面使用
export {login,logout}

// 这个是去大仓库 store,js集中管理
export default authReducer