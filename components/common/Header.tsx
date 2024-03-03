import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { globalStyles } from "../global";

const leftArrow = require("../../assets/icons/chevron-left.png");

function goBack() {
  router.back();
}

const Header = (props) => {
  return (
    <View
      style={{
        width: "100%",
        alignContent: "center",
        flexDirection: "row",
        // flex: 1,
        // justifyContent: "space-between",
        marginBottom: "10%",
      }}
    >
      <Pressable
        onPress={() => goBack()}
        style={{ marginLeft: "10%", width: "24%" }}
      >
        <Image source={leftArrow} style={{}} />
      </Pressable>

      <Text style={globalStyles.headerText}>{props.text}</Text>
    </View>
  );
};

export default Header;
