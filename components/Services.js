import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import services from '../assets/data/servicios.js'

const Services = () => {
 
  return (
    <View style={{padding:10  }}>
      <Text style={{ fontSize:16, fontWeight:'500', marginTop:7 }}>Servicios disponibles</Text>
      <ScrollView 
      showScrollHorizontaiIndicator={false}
      horizontal>
        {services.map((service, index)=>(
<Pressable key={index} style={{margin:10, backgroundColor:'white', padding:20, borderRadius:10}}>
  <Image source={{ uri:service.image }} style={{ width:70,height:70}}/>
  <Text style={{ fontSize:14, textAlign:'center', marginTop:10 }}>{service.name}</Text>
</Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Services