
import React from 'react';
import { Redirect } from 'expo-router';
import { PostProvider } from '../context/postContext';

const App = () => {
    return (
    <PostProvider>
        <Redirect href="/(tabs)/home" />
    </PostProvider>

    );

}


export default App;