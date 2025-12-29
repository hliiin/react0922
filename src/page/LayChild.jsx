import React from 'react'
import { useLocation } from 'react-router-dom'
// useLocation()：  获取路径中拼接的参数： 例如 http://localhost:3000/son2?name=mike&age=11
//    /path?key=value&key=value&key=value...
//--- ?name=mike&age=11这个是拼接的参数， 那么拼接的参数是不影响页面访问的， 我们要获取到URL中拼接的参数再页面展示

export default function LayChild() {
  // 1.1 使用useLocation() 获取路径中拼接的参数
  const location = useLocation()
  console.log(location); // {pathname: '/son2', search: '?name=mike&age=11', hash: '', state: null, key: 'default'}

  // 获取location得到的参数值
  const pathname = location.pathname  //  是页面path /son2
  const search = location.search  //  是拼接的参数 ?name=mike&age=11

  // 1.2 获取search 具体的参数值 例如： mike  11  --- new URLSearchParams(拼接参数)
  const query = new URLSearchParams(search)
  console.log(query); // URLSearchParams {size: 2}  size:2表示拼接了两个key：value
  
  // 1.3 使用 get('key') 获取具体的value
  const keyWords = query.get('name')
  console.log(keyWords); // mike
  
  
  return (
    <div>
      <h3>我是layout的第二个子页面</h3>
      <p>当前的页面path:{pathname}</p>
      <p>当前的查询参数：{search}</p>
      <p>获取具体的参数值：{keyWords} </p>
    </div>
  )
}
