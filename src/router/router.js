//  路由第二种写法：  创建路由表

// 1. 先将所有的页面组件引入
import Home from '../page/Home'
import About from '../page/About'
import Login from '../page/Login'
import Layout from '../page/Layout'

// 引入layout的子页面
import LaySon from '../page/LaySon'
import LayChild from '../page/LayChild'


import NotFound from '../page/NotFound'

import Count from '../page/Count'

import Cart from '../page/Cart'

import {Routes,Route} from 'react-router-dom'
import ProtectedRoutes from '../components/ProtectedRoutes'

import APIServer from '../page/APIServer'


// 2. 创建路由表, 一个页面路由就是一个对象
const router= [
  // 第一层一般称为一级路由
  {
    // 一般 项目运行的时候默认展示的路径就是  /  而且在浏览器中 URL栏也是  /, 还可以省略
    path:'/',
    element:<Layout></Layout>,

    // 4. 假设Layout有子页面，那么路由的配置就是二级路由， 在当前一级路由页面内部去书写
    children:[
      // 可以书写子页面了， 需要去一级页面给留个出口
      {
        // path:'son1',
        element:<LaySon />,

        // 5. 假设 Layout展示的时候， 直接也默认展示第一个儿子的内容，那么就可以将要默认展示的子页面path去除, 并且添加index:true,
        // 表示默认跟随父级页面一起展示
        index:true,
      },

      {
        path:'son2',
        element:<LayChild />
      },
    ]

  },
  {
    path:'/home',
    element:<Home />
  },
  {
    // 实现about页面作为商品详情页， 那么其他页面到about页面必须携带的有具体的商品id
    path:'/about/:id',
    element:<About></About>
  },
  {
    path:'/login',
    element:<Login></Login>
  },

  // 6, 防止别人乱输出URL path路径， 只要是路由表以外的路径，都跳转到NotFound页面
  {
    //  使用  *  表示路由表中自己定义之外的path
    path:'*',
    element:<NotFound></NotFound>
  },

  // 12/04 : 因为要实现某些路由只有再登陆之后才能访问的情况,将下列路由设为 需登录才可访问的队列

  {
    path:'/count',
    element:<Count></Count>,
    // requersAuth(自己命名):true--值一般为boolean,  表示当前路由是需要登陆后才能访问的, 逻辑需要自己写
    requersAuth:true,
  },
  {
    path:'/cart',
    element:<Cart></Cart>,
    requersAuth:true,
  },
  {
    path:'/apiserver',
    element:<APIServer></APIServer>,
  },
]

// 3， 抛出路由表，  需要去index.js 以及app.js中配置一些和路由表相关的内容
// export default router

// 4. 写一个路由表抛出前的,一个判断, 判断哪些路由身上 有登陆标识--- 先去自己创建一个保护路由的组件--ProtectedRoutes.js
// 对router路由表进行遍历, 如果当前路由身上有requersAuth:true, 那么就给当前路由添加一个ProtectedRoute组件, 用来保护路由
const RouteList = () => {
  return (
    <Routes>
      {router.map((route,index) => {
        // 再遍历路由表的时候判断: 当前被遍历的一级路由route,有没有子路由
        // 4.1 当前的一级路由, 是有二级子路由的
        if(route.children) {
          return (
            // 4.1.1 先查看当前的一级路由 是否有唯一标识requersAuth
            <Route key={index} path={route.path} element={<ProtectedRoutes element={route.element} requersAuth={route.requersAuth} />}>
              {/* 4.1.2 : 遍历当前一级路由的 子路由列表 */}
              {route.children.map((childRoute,index) => (
                <Route key = {index} path={childRoute.path} element={<ProtectedRoutes element={childRoute.element} requersAuth={childRoute.requersAuth} />}></Route>
              ))}
            </Route>
          )
        }

        // 4.2 第二种情况: 一级路由没有任何的子路由
        return( 
          <Route key={index} path={route.path} element={<ProtectedRoutes element={route.element} requersAuth={route.requersAuth} />}></Route>
        )
      })}
    </Routes>
  )
}

// 5. 抛出已经使用过保护路由组件的路由列表, 到 App.js中修改以下路由的渲染方式
export default RouteList

