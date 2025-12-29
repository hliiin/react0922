import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment,changeCount } from '../store/modules/countSlice';
// 使用count小仓库的数据和方法

export default function Count() {
  // 1. 使用数据count:  需要用useSelector(), 形参store会默认指向大仓库， counter指大仓库中的小仓库
  const {count} = useSelector((store) => store.counter )
  console.log(count);

  // 2. 页面中想要改变仓库的变量， 需要使用仓库准备的修改方法, 也是需要通过hooks使用useDispatch()
  const dispatch = useDispatch()
  
  return (
    <div>
      <h1>使用小仓库counter中的变量和方法</h1>
      {/* 使用仓库中的count变量包括修改方法 */}
      <h3>仓库的count: {count}</h3>

      {/* 2.2 使用小仓库中抛出的increment decrement, 注意需要引入一下方法，再用dispatch调用 */}
      <button onClick={() => dispatch(increment())}>count++</button>
      <button onClick={() => dispatch(decrement())}>count--</button>

      {/* 12.02:  再之前的基础上， 新增一个changeCount(20)， 并且传递一个参数，可以让count的值变成20 */}
      <button onClick={() => dispatch(changeCount(20))}>点击count=20</button>
    </div>
  )
}
