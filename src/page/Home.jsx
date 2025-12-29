import React from 'react'

import { Link } from 'react-router-dom'

// 案例： 动态参数案例， 该页面为商品列表  当点击某本书籍的时候，能够带着书的id去about页面
// 1.1 先引入所有的数据
import goods from '../api/goods'


export default function Home() {
  // 
  return (
    <div>
      <h1>我是home</h1>
      {/* 因为about页面需要携带动态参数才可以到--home页面有个按钮点击去about */}
      <Link to='/about/123'><button>点击去about</button></Link>

      <hr />
      {/* 1.2 直接渲染所有的书籍信息--- */}
      {goods.map((item) => (
        
          <div key={item.id} style={{width:'200px',height:'80px', border: '1px solid red', margin:'10px'}}>
            {/* 1.3 当点击里面的文本的时候， 就会携带当前item的id去到about页面 */}
            <Link to={`/about/${item.id}`}>
              <p>bookName:{item.name}</p>
              <p>bookPrice:{item.price}</p>
            </Link>
            
          </div>
        
      ))}

      
    </div>
  )
}
