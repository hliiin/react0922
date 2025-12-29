// 这个是购物车的数据小仓库， 里面存放需要添加到购物车中的商品
// 第一个小仓库， 里面存放count数据， 可以被很多页面直接引用， 还可以存放修改数据的方法
import { createSlice } from '@reduxjs/toolkit'

//  创建slice
const cartSlice = createSlice({
  // 定义一个name
  name:'cart',
  // 定义小仓库都有什么数据，并且初始化， 这些数据都是属于state的
  initialState: {
    items:[], //这里面存放购物车的商品数据。

    // 3、 添加一个total总价， 表示购物车所有商品的价格总和
    total:0,
  },
  reducers: {
    // -----------1.1 因为点击 add to card的时候， 需要将携带的数据传递给仓库， 仓库存到items里面
    // 定义： 添加到购物车的方法, 并且cart.jsx调用了
    addItem: (state,action) => {
      // console.log(action.payload); // 点击加入的product
      // 1.2 因为cart.jsx传递了数据，所以这边需要将数据添加到items
      // state.items.push(action.payload)

      // 1.3 由于同样商品， 多次被加入的时候，应该有一个筛选功能，如果是第一次加入，那就给product 新增一个key值---quantity:1 如果当前加入的product已经存在，则数量+1， 
      // 定义一个变量： 用来判断当前加入的product--action.payload是否已经存在
      // find()  根据条件查询，返回符合条件的数据信息
      const addProduct = state.items.find((item) => item.id === action.payload.id )
      // 1.4 如果addProduct不存在，就表示该商品是第一次加入items,那么就再push的时候，额外添加一个新属性quantity:1 
      if(!addProduct) {
        state.items.push({...action.payload, quantity:1})
      } else {
        // 1.5 如果addProduct存在, 那么它身上就已经有quantity属性， 直接让addProduct.quantity + 1 就好
        addProduct.quantity += 1
      }

      // 3.1 因为再加入购物车的时候，就需要将商品的价格计算一下给total
      // state.total = state.total + action.payload.price
      state.total += action.payload.price
    },


    // ----------2 移出购物车， 移方法被page使用， 并且需要接收页面传递商品的id
    // action.payload 接收到的就是page传递的item.id
    removeItem: (state,action) => {
      // 2.1 根据 action.payload 接收的id再items里面查找一下, findIndex() 根据条件找到的话返回第一个找到的数据的下标index, 没找到就返回-1
      const productIndex = state.items.findIndex((item) => item.id === action.payload  )
      // 2.2  根据productIndex 是否为-1来判断，商品再items中存不存在, 
      if(productIndex > -1) {
        // 如果productIndex>-1 就表示该商品存在，就可以先用变量保存该数据， 因为计算总价要用到
        const removeProduct = state.items[productIndex]
        // 3.2 因为移出商品的时候， 需要先获取到该商品，然后计算该商品数量和总价格， 并且用total相减, 计算完价格之后再去移出该商品
        state.total = state.total - removeProduct.quantity * removeProduct.price

        // 2.3 splice(a,b)从下标为a的数开始， 删除b个
        state.items.splice(productIndex,1)

        
      } 

    },


    // -----4. 能够修改input中的quantity值， page页调用的时候，需要传递当前修改的数据的id和修改后的数量
    updateValue:(state,action) => {
      // 4.1 假设传递的是1  数量是10:  action.payload  = {id：1， quantity:10}  解构一下就可以用了
      const {id, quantity} = action.payload
      // 4.2 根据id 找一找items中有没有该商品，有的话再去修改数量
      const updateProduct = state.items.find((item) => item.id === id )
      // 4.3 如果找到了，就去修改updateProduct的quantity, 并且修改total
      if(updateProduct) {
        // 修改数量之前，需要先计算一下 原本的quantity 和 修改完之后的差值
        const quantityDiff = quantity - updateProduct.quantity
        state.total += quantityDiff * updateProduct.price

        // 总价都计算完了再去修改购物车商品的数量值
        updateProduct.quantity = quantity
      }
    }
  }
})


//  解构一下reducers里面写的方法, 方便外部的page可以使用仓库中的方法
const {addItem, removeItem, updateValue } = cartSlice.actions

// 获取reducer
const cartReducer = cartSlice.reducer

//  把2  3步骤的内容都导出 供外部页面使用
export {addItem,removeItem,updateValue}

// 这个是去大仓库 store,js集中管理
export default cartReducer