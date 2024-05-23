import React from "react";
import { Redirect } from "expo-router";
import { PostProvider } from "../context/postContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <PostProvider>
      <Redirect href="/(tabs)/home" />
    </PostProvider>
  );
};

export default App;
