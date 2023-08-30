
import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native'; // views are divs and text a p tags
import { ScrollView } from 'react-native-gesture-handler';
import { Stack, Link, useRouter, useSegments, useFocusEffect, router } from 'expo-router';
import { useAuth } from '../context/auth'
import { globalStyles } from '../components/global';
const App = () => {
    const { signOut } = useAuth();
    
    return (

        <SafeAreaView style={[globalStyles.container, {alignItems:'center'}]}>
            <Text> HIHIHI </Text>

            <ScrollView>
                
                <Text onPress={() => signOut()}>Sign Out</Text>
            </ScrollView>
        </SafeAreaView>
        
    )

}

export function logout() {
    router.replace('profile/landing');
}


export default App;