
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addItem, removeItem, updateValue} from '../store/modules/cartSlice'

// 展示所有的商品信息， 暂时作为组件渲染
function ProductList() {
  // 1.1 先自己创建一个商品列表
  const products = [
    {id:1, name:'phone', price:100},
    {id:2, name:'car', price:1000},
    {id:3, name:'shoes', price:50},
    {id:4, name:'dog', price:90},
    {id:5, name:'cat', price:80},
  ]

  // 2.1 因为cartSlice里面有添加购物车的方法， 所以需要引用，使用useDispatch()
  const dispatch = useDispatch()
  return (
    <div>
      <h1>所有的商品展示</h1>
      {/* 1.2 渲染列表数据 */}
      {products.map((product) => (
        <div key={product.id} style={{border:'1px solid red',width:'200px', height:'80px', display:'inline-block', margin:'10px'}}>
          <p>product Name: {product.name}</p>
          <p>price: {product.price}</p>
          {/* 2.2 使用仓库中的方法， 并且需要将当前的商品传递给仓库*/}
          <button onClick = {() => dispatch(addItem(product))}>add to cart</button>
        </div>
      ))}
    </div>
  )
}



export default function Cart() {

  // 3.1 cart页面需要引入 仓库中的items, 并且渲染
  // 4.1 将仓库中的 total变量也获取渲染
  const {items, total} = useSelector((store) => store.cart )

  // cart需要引入仓库中的removeItem移出商品方法 
  const dispatch = useDispatch()
  
  return (
    <div>
      {/* 1.3 将商品列表和cart一起展示 */}
      <ProductList></ProductList>
      <p>-------------------------------------------------------------------------------</p>
      <h1>我是购物车的所有数据</h1>
      {/* 3.2 将items进行循环遍历 */}
      {items.map((item) => (
        <div key={item.id}>
          <span>商品：{item.name}</span>----<span>price: {item.price}</span>
          {/* 3.3 因为再小仓库，已经给每个商品加过quantity了， 表示数量，可以直接和input绑定*/}
          <span>---商品数量：</span>
          {/* 5. 实现input修改value数量值， 并且要给仓库传递 item的id 以及修改的数值 */}
          <input type="number" value={item.quantity} onChange={(e) => dispatch(updateValue({id:item.id, quantity:e.target.value})) } />
          {/* 4.1 每个商品应该也可以移出购物车, cart需要引入仓库中的removeItem移出商品方法 */}
          {/* 注意： 需要告知仓库， 删除的是哪个商品， 所以需要携带 item的id */}
          <button onClick = {() => dispatch(removeItem(item.id))}>move to cart</button>
        </div>
      ))}
      
      <h2>总价total:{total}</h2>
    </div>
  )
}
