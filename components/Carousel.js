import { View, Text } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box"
import images from '../assets/data/imagenes.js'

const Carousel = () => {
  
  return (
    <View>
        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={'#13274F'}
          inactiveDotColor={'#90A4AE'}
          imageComponentStyle={{
            borderRadius:6,
            width:'94%'

          }}
        />
    </View>
  )
}

export default Carousel