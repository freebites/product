import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';

const Layout = () => {
    return (
        <View style={styles.container}>
            <Stack />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE1D5',
    }
});

export default Layout;
