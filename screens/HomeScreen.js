import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { SliderBox } from 'react-native-image-slider-box'
import Carousel from '../components/Carousel'
import Services from '../components/Services'
import productos from '../assets/data/productos.js'
import DresseItem from '../components/DresseItem'
import { useDispatch, useSelector } from 'react-redux'
import servicios from '../assets/data/servicios'
import { getProducts } from '../ProductReducer'


const HomeScreen = () => {
  const cart = useSelector((state)=>state.cart.cart)
  const product = useSelector((state)=>state.product.product)
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Estamos buscando su localización',
  )
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)

  useEffect(() => {
    checkIfLocationEnabled()
    getCurrentLocation()
  }, [])

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync()
    if (!enabled) {
      Alert.alert(
        'Servicio de localización no activado',
        'Active servicio de localización',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      )
    } else {
      setLocationServiceEnabled(enabled)
    }
  }

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Active permisos', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ])
    }
    const { coords } = await Location.getCurrentPositionAsync()

    
    if (coords) {
      const { latitude, longitude } = coords

      let response = await Location.reverseGeocodeAsync({ latitude, longitude })

      
      for (let item of response) {
        let address = `${item.city} ${item.postalCode} ${item.street}`
        setDisplayCurrentAddress(address)
      }
    }
  }

  const dispach = useDispatch()
  useEffect(()=>{
    if(product.length>0) return
    const fetchProducts = ()=>{productos.map((producto)=>dispach(getProducts(producto)))}

    fetchProducts()
  },[])

  return (
    <ScrollView style={{ backgroundColor: '#e7e3e3', flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItem: 'center', padding: 10 }}>
        <MaterialIcons name='location-on' size={24} color='#D2122E' />
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Home</Text>
          <Text style={{ fontSize: 12, fontWeight: '300' }}>
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable style={{ marginLeft: 'auto', marginRight: 7 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: 'https://lh3.googleusercontent.com/ogw/AOLn63F014798lzpGhIKWPtbYtQypbnkmZtqHjpPXTpw=s32-c-mo',
            }}
          />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          margin: 10,
          alignItem: 'center',
          justifyContent: 'space-between',
          borderWidth: 0.8,
          borderColor: '#C0C0C0',
          borderRadius: 10,
        }}
      >
        <TextInput placeholder='Buscar.' />
        <Feather name='search' size={24} color='#D2122E' />
      </View>
      <Carousel />
      <Services />
      {
        product.map((product) =>(<DresseItem key={product.id} item={product}/>))
      }
    </ScrollView>
  )
}

export default HomeScreen
