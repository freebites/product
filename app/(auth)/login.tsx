import { View, Text, SafeAreaView, Image } from 'react-native';
import { useAuth } from '../../context/auth'
import {Link, } from 'expo-router';
import React from 'react';
import LoginButton from '../../components/common/Button';
import { Welcome } from '../../components';

export default function SignIn() {
  const { signIn } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
        <Welcome />
        <Link href="(auth)/signup">Signup</Link>
        <LoginButton />
        <LoginButton />
        <Text onPress={() => signIn()}>Sign In</Text>
    </SafeAreaView>
  );
}