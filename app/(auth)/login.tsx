import { View, Text, SafeAreaView, Image } from 'react-native';
import { useAuth } from '../../context/auth'
import { router } from 'expo-router';
import React from 'react';
import LoginButton from '../../components/common/Button';
import { Welcome } from '../../components';
import { globalStyles } from '../../components/global';
export default function SignIn() {
  const { signIn } = useAuth();
  return (
    
    <SafeAreaView style={[globalStyles.container, {alignItems:'center'}]}>
        <Welcome  />
        <View style={{gap:23, flex:1, width:"100%", alignItems:"center"}}>
            <LoginButton  onPress={() => signIn()} text="login"/>
            <LoginButton onPress={() => {router.push("/signup")}} text="sign up"/>

        </View>

    </SafeAreaView>
      
  );
}