import React from 'react'
import { View,Text } from 'react-native'

const Toaster = ({text}) => {
  return (
    <View>
          <View>
               <Text>{text}</Text>
          </View>
    </View>
  )
}

export default Toaster