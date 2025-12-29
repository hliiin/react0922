import React from 'react'
import { useParams } from 'react-router-dom'
// 实现path中有动态的参数， 需要到router中去稍微修改一下
// 这时候再about页面，路径中都会有一个动态的id参数， 例如： 从home到这里是：http://localhost:3000/about/123  在页面中获取到123这个参数
// 使用useParams() 获取路径中的动态参数   例如：'/about/:id'

  // 案例： 使用useParams(), 根据路径中的id 去筛选出符合条件的书籍，并展示
  // 1.1 引入所有的书籍信息
  import goods from '../api/goods';

export default function About() {
  const params = useParams()
  console.log(params);  // {id: '123'}, 注意： 获取到的动态参数都是string类型

  // 1.2 根据路径中的id , 去goods里面查找
  const product = goods.find((item) => item.id === Number(params.id) )
  console.log(product);
  





  
  return (
    <div>
      <h1>我是About页面--假设：商品详情页</h1>
      <h2>动态参数是：{params.id}</h2>

      {/* ---------------------------- 根据URL中的id， 去渲染指定书籍的所有信息*/}
      <h2>当前的书籍信息</h2>
      <p>书的标题：{product.name}</p>
      <p>书的价格：{product.price}</p>
      <img src={product.img} alt=""  width='200px' /> 
    </div>
  )
}
