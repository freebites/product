 import React from 'react'
 import { View, Text, Image } from 'react-native'

 const icon = require('../../../assets/icons/rabbit.png')

 // import styles from './welcome-style'

 const Welcome = () => {
    return (
        <View>
            
            <Image source={icon} />
            <Text> FreeBites </Text>
            
        </View>
        )
 }

 export default Welcome