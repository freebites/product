import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { Provider } from '../context/auth';

const Layout = () => {
    return (
        
        <Provider>
            <Stack />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0E1D2',
    }
});

export default Layout;
