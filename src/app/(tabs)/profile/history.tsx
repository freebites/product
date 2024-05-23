import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../../../components/global";
import Header from "../../../../components/common/Header";
import { useAuth, validateRoutePerms } from "../../../context/auth";
import { useGlobalSearchParams } from "expo-router";

/*
	TODO: 
		- Currently the localParams in this page is the UID
		- For backend, each User should have a [postIDs] 
		- Pass in the user's postIDs instead of the whole user object
		- Display each Post
*/

const history = () => {
  validateRoutePerms();

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header text="History" />

      <View
        style={{
          margin: "5%",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: "#505A4E",
            textShadowRadius: 1,
            textShadowColor: "black",
            paddingBottom: 12,
          }}
        >
          No history yet
        </Text>
        <Text style={{ textAlign: "center", color: "#505A4E", opacity: 0.57 }}>
          Try making a post by clicking on the + button on the homepage!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default history;
