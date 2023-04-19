import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.product.push({ ...action.payload })
    },
    incrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id,
      )
      itemPresent.quantity++
    },
    decrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id,
      )
      if (itemPresent.quantity === 1) {
        itemPresent.quantity = 0
        const removeitem = state.product.filter(
          (item) => item.id !== action.payload.id,
        )
        state.cart = removeitem
      } else {
        itemPresent.quantity--
      }
    },
  },
})

export const {getProducts, incrementQty, decrementQty} = productSlice.actions
export default productSlice.reducer