
import { useState } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native'; // views are divs and text a p tags
import { COLORS, icons, images, SIZES } from '../constants';
import { Welcome } from '../components'
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text> HIHIHI </Text>

            <ScrollView>
                <Welcome />
            </ScrollView>
        </SafeAreaView>
    )

}




export default Home;