//  引入的react中 App.js组件页面的 style
import './App.css';

// 路由第二种写法： 使用路由表， 将所有的路由和组件页面 统一管理

// 1.1 创建完路由表之后， 需要在App。js引入，并且渲染
// import router from './router/router'

// import {useRoutes} from 'react-router-dom'

// 12.04 因为对路由表进行了优化, 所以引入优化之后的
import RouteList from './router/router';





function App() {

  // /1.2 使用路由自带的方法，解析router
  // const routes = useRoutes(router)

  return (
    <div className="App">
      {/* 1.3 渲染解析完的路由表 , 记得去index.js  注册一下路由*/}
      {/* {routes} */}

      <RouteList></RouteList>
    </div>
  );
}


export default App;
