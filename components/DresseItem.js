import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementQty, decrementQty } from '../ProductReducer'
import {addToCart, incrementQuantity, decrementQuantity } from '../CartReducer'

const DresseItem = ({ item }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state)=>state.cart.cart)
  const addItemToCart = () => {
    dispatch(addToCart(item))
    dispatch(incrementQty(item))
  }

  return (
    <View>
      <Pressable
        style={{
          backgroundColor: '#F8F8F8',
          padding: 10,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 14,
        }}
      >
        <View>
          <Image source={{ uri: item.image }} width={70} height={70} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 400,
              width: 83,
              color: '#777575',
            }}
          >
            {item.name}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: '300', color: 'gray' }}>
            ${item.price}
          </Text>
        </View>
       

        {cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); // cart
                dispatch(decrementQty(item)); // product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                console.log('Aqui');
                dispatch(incrementQuantity(item)); // cart
                dispatch(incrementQty(item)); //product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: "gray",
                borderRadius: 4,
                borderWidth: 0.8,
                marginVertical: 10,
                color: "#088F8F",
                textAlign: "center",
                padding: 5,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
        </View>
  )
}

export default DresseItem
