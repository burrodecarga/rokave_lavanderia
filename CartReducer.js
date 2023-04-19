import {createSlice} from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name:'Cart',
  initialState:{
    cart: [],    
  },
  reducers:{
  addToCart:(state,action)=>{
    const itemPresent = state.cart.find(item => item.id === action.payload.id)
    if(itemPresent){
      itemPresent.quantity++
    }else{
      state.cart.push({...action.payload,quantity:1} )
    }
  }
  },
  removeFromCart:(state,action)=>{
    const removeitem = state.cart.filter(item => item.id !== action.payload.id)
    state.cart = removeitem
  },
  incrementQuantity:(state,action)=>{
    console.log('first')
    const itemPresent = state.cart.find(item => item.id === action.payload.id)
    itemPresent.quantity++    
  },
  decrementQuantity:(state,action)=>{
    const itemPresent = state.cart.find(item => item.id === action.payload.id)
    if(itemPresent.quantity===1){
      itemPresent.quantity =0
      const removeitem = state.cart.filter(item => item.id !== action.payload.id)
    state.cart = removeitem
    }else{
      itemPresent.quantity--    
    }
  },


})


export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity} = cartSlice.actions
export default cartSlice.reducer