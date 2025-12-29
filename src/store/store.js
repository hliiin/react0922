// 这个是大仓库， 可以存放很多相关的小仓库的数据： 每一个小仓库都是一个单独的 Slice.js , 然后统一放在大仓库里面就可以，抛出去
// 使用redux 需要先安装：  npm install @reduxjs/toolkit react-redux redux-thunk
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import counterReducer from './modules/countSlice'

import cartReducer from './modules/cartSlice'

import authReducer from './modules/authSlice'

// -------以下是 持久化相关的引入
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'





// -------------------------------------------------------------------------
// 大仓库的结构： 
// const store = configureStore({
//     // 统一存放注册小仓库
//     reducer: {
//       // 注意： 前面的key 最好和小仓库Slice的name一致
//       counter:counterReducer,
//       cart:cartReducer,  // cart小仓库
//       auth:authReducer  // auth小仓库
//     }
// })

// // 需要将大仓库也抛出， 去index.js 入口文件中，注册为全局
// export default store
// -------------------------------------------------------------------------------

// ----------------------------------------------------------------------以下是持久化存储的处理
// npm install redux-persist   需要先安装依赖
// 1. 持久化存储的配置
const persistConfig = {
  key:'react_demo',  // 每个项目的唯一标识,可以为项目名字
  storage,  // 每个小仓库中数据的存储位置默认为localStorage,  需要引入一下
}

// 2. 组合所有的小仓库
const rootReducer  = combineReducers({
  counter:counterReducer,
  cart:cartReducer,  // cart小仓库
  auth:authReducer  // auth小仓库
})

// 3. 创建持久化的reducer, 连接持久化存储地址以及 所有小仓库数据
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 4. 创建store
const store = configureStore({
  reducer: persistedReducer
})

// 5. 需要使用持久化中的 persistStore方法， 将store抛出
const persistor = persistStore(store)
export {store, persistor}
// 所有的持久化配置完之后,需要去index.js 中注册一下