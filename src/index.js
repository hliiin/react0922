import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 1.1 引入路由
import { BrowserRouter } from 'react-router-dom';

// 2.1 引入大仓库store, 需要放在Provider组件里面
import {store, persistor} from './store/store';
import {Provider} from 'react-redux';


// 持久化需要引入的
import {PersistGate} from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// 2.2 使用Provider组件注册store
  <Provider store={store}>
    {/* 持久化之后, 需要在配置一组tag PersistGate */}
    <PersistGate loading={null} persistor = {persistor}>
      {/* // 1.2 使用路由tag */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
    
    
  </Provider>

  
);



 