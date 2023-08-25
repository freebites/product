
import React from 'react';
import { useState, } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native'; // views are divs and text a p tags
import { COLORS, icons, images, SIZES } from '../constants';
import { Welcome } from '../components'
import { ScrollView } from 'react-native-gesture-handler';
import { Stack, Link, useRouter, useSegments, useFocusEffect, router } from 'expo-router';

const Home = () => {
    //const = logout();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text> HIHIHI </Text>

            <ScrollView>
                <Welcome />
                <Link href="profile/login">Login</Link>
                <Link href="profile/signup">Signup</Link>
            </ScrollView>
        </SafeAreaView>
    )

}

export function logout() {
    router.replace('profile/landing');
}


export default Home;