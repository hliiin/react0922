// 第一个小仓库， 里面存放count数据， 可以被很多页面直接引用， 还可以存放修改数据的方法
import { createSlice } from '@reduxjs/toolkit'

// 1. 创建slice
const countSlice = createSlice({
  // 定义一个name
  name:'counter',
  // 定义小仓库都有什么数据，并且初始化， 这些数据都是属于state的
  initialState: {
    count: 10,  // 存放通用的数据，并且初始化变量值
  },
  reducers: {
    // 定义修改变量count的方法
    // 方法1： count + 1
    increment(state) {
      state.count ++ 
    },
    // 方法2： count - 1
    decrement:(state) => {
      state.count --
    },

    // 定义一个changeCount方法， page页面调用，可以传递参数，修改count
    // 注意： 如果page页面调用方法，并且需要传递参数， 那么小仓库需要通过action接收, action.payload 接收到的就是page传递的参数
    changeCount:(state,action) => {
      state.count = action.payload  
      console.log(action); // {type: 'counter/changeCount', payload: 20}
    }
  }
})


// 2. 解构一下reducers里面写的方法, 方便外部的page可以使用仓库中的方法
const { increment, decrement,changeCount } = countSlice.actions

// 3. 获取reducer
const counterReducer = countSlice.reducer

// 4. 把2  3步骤的内容都导出 供外部页面使用
export {increment, decrement,changeCount}

// 这个是去大仓库 store,js集中管理
export default counterReducer