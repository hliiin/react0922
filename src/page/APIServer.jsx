import React, { useState, useEffect } from "react";
// react访问服务器的API接口，需要使用axios : npm i axios
import axios from "axios";
// 服务器接口地址是： http://127.0.0.1/api/路由接口
import "./APIServer.css";

export default function APIServer() {
  // 1.-----------------------------------------------/getBooks  获取数据
  // 点击按钮的时候 能够获取到所有的书籍信息
  // 1.2 定义一个变量，接收获取到的所有书籍信息
  const [books, setBooks] = useState([]);

  // 1.3 定义获取接口数据的方法
  const getBooks = async () => {
    // 使用axios 访问接口数据， 再用async await接收数据
    const res = await axios.get("http://127.0.0.1/api/getBooks");
    // console.log(res,'getBooks');
    console.log(res.data, "getBooks");
    setBooks(res.data); // 将获取到的书籍给books,去渲染
  };

  // 1.5 因为一般获取数据都是项目运行的时候就会自动触发获取方法,使用useEffect
  useEffect(() => {
    getBooks();
  }, []);

  // 2--------------------------------------------------------------/deleteBook/:id 删除数据
  // 2.1 定义删除方法
  const deleteBook = async (id) => {
    const res = await axios.delete(`http://127.0.0.1/api/deleteBook/${id}`);
    // console.log(res.data);
    alert(res.data);
    // 记得重新获取一下所有的书籍信息
    getBooks();
  };

  // 3---------------------------------------------------------------------------/addBook  添加数据
  // 3.2 定义一个变量isShow 为true的时候 新增窗口出现， fasle就隐藏
  const [isShow, setIsShow] = useState(false);

  // 3.3 定义一个变量 用来接收u输入框中存储的数据
  const [form, setForm] = useState({ name: "", author: "", price: "" });

  // 3.4 定义添加数据肚饿方法， 调用后端接口， 并且将form传递给后端，并且刷新页面的数据
  const addBook = async () => {
    const res = await axios.post("http://127.0.0.1/api/addBook", form);
    alert(res.data);
    // 关闭弹窗
    setIsShow(false);
    // 同时清空input
    setForm({ name: "", author: "", price: "" });
    // 重新获取所有的数据
    getBooks();
  };
  // 给取消按钮也定义一个方法， 用来关闭弹窗和清空input
  const clearShowModal = () => {
    setIsShow(false);
    setForm({ name: "", author: "", price: "" });
  };

  // 4. -------------------------------------------------------'/getBookByname'  查询书籍
  // 4.2 定义一个变量接收 input中输入的书名,定义存储查到的书籍的信息
  const [searchName, setSearchName] = useState("");
  const [serchRes, setSearchRes] = useState({
    name: "",
    author: "",
    price: "",
  });

  // 4.3 定义查询书籍的方法
  const searchBook = async () => {
    // 查询之前，判断一下如果输入框为空就提示一下，并且不去访问API
    if (!searchName.trim()) {
      alert("请输入书名");
      return;
    }
    try {
      // 携带的书籍名字 使用params 传递，并且带上属性名
      const res = await axios.get(`http://127.0.0.1/api/getBookByname`, {
        params: { name: searchName },
      });
      // 判断如果res.data 里面没有书籍也就是[] 就表示没有找到对应书籍
      if (!res.data.length) {
        alert("没有找到该书籍");
        return;
      }
      console.log(res);
      // 有书籍的话 就会在res.data中出现一个对象数据
      setSearchRes(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  // 4.4 定义清空按钮的方法
  const clearBtn = () => {
    setSearchName("");
    setSearchRes({ name: "", author: "", price: "" });
  };


  // 5.-----------------------------------------------------/updateBook/:id 修改书籍信息
  // 5.2 准备变量 存储当前要修改的书籍的信息， 以及控制页面出现的变量
  const [editData,setEditData] = useState()
  const [isChange,setIsChange] = useState(false)

  // 5.3 定义一个方法， 和修改书籍 按钮绑定， 获取当前的item的所有信息 并且给editData存储， 然后去和input关联
  const handleEditData = (book) => {
    setEditData(book)
    setIsChange(true)
  }
  // 5.4 定义一个 输入框和editData双向的方法
  const handleInput = (e) => {
    // 调用方法时候，根据input的name属性的值 和editData中的key关联
    setEditData({...editData,[e.target.name]:e.target.value})
  }
  // 5.5 当修改完之后，点击确认修改按钮时候， 需要将editData传递给后端API, 并且记得带上editData的_id
  const changeBook = async () => {
    const res = await axios.put(`http://127.0.0.1/api/updateBook/${editData._id}`, editData)
    alert(res.data)
    // 修改完之后记得关闭弹窗，并且重新加载页面数据
    setIsChange(false)
    getBooks()
    
  }

  return (
    <div>
      <h1>实现API的调用</h1>
      {/* 1.1 准备展示所有书籍的框架结构 */}
      <h3>ALL Books</h3>
      {/* 1.4 开始遍历books */}
      {books.map((item) => (
        <div key={item._id} className="books">
          <p>bookname:{item.name}</p>
          <p>author:{item.author}</p>
          <p>price:{item.price}</p>
          {/* 2.2 使用删除方法，并且将当前的书籍_id传递过去 */}
          <button onClick={() => deleteBook(item._id)}>点击删除</button>
          {/* 5.3 每本书添加一个修改按钮 */}
          <button onClick={() => handleEditData(item)}>修改书籍</button>
        </div>
      ))}
      <hr />

      {/* 3.1 定义一个新增的按钮，点击的时候 会出现一个弹窗，用来输入信息 */}
      <button onClick={() => setIsShow(true)}>点击add Book</button> <hr />
      {isShow && (
        <div className="bgModal">
          <div className="addModal">
            <h2>新增书籍</h2>
            {/* 3.3 将input的value 和 form变量绑定:  {...form}=== {name:'',author:'',price:''} */}
            <input
              type="text"
              placeholder="请输入bookname"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="请输入author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <input
              type="text"
              placeholder="请输入price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <div className="btns">
              {/* 3.5 点击确认时候调用addBook */}
              <button onClick={addBook}>确认添加</button>
              <button onClick={clearShowModal}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. 查询书籍的结构准备 */}
      <h3>查询书籍</h3>
      {/* 4.2 将searchName和输入框的value绑定 */}
      <input
        type="text"
        placeholder="请输入要查询的书的名字"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={searchBook}>Search</button>
      <button onClick={clearBtn}>清空搜索结果</button>
      <div className="searchBook">
        <p>书名：{serchRes.name}</p>
        <p>作者名：{serchRes.author}</p>
        <p>价格：{serchRes.price}</p>
      </div>
      {/* 5. 准备修改数据的框架---大致沿用新增的css */}
      {isChange && (
        <div className="bgModal">
          <div className="addModal">
            <h2>修改书籍</h2>
            {/* 5.4 editData和input 关联 */}
            {/* 注意： 可以给input取一个name属性值， 刚好和数据中的key保持一致 */}
            <input
              type="text"
              value={editData.name}
              name='name'
              onChange={handleInput}
            />
            <input
              type="text"
              value={editData.author}
              name='author'
              onChange={handleInput}
            />
            <input
              type="text"
              value={editData.price}
              name='price'
              onChange={handleInput}
            />
            <div className="btns">
              <button onClick={changeBook}>确认修改</button>
              <button onClick={() => setIsChange(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
