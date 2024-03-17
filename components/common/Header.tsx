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
        flexDirection: "row",
        // flex: 1,
        justifyContent: "center",
        marginBottom: "10%",
        // alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => goBack()}
        style={{ position: "absolute", left: 30, height: 30, width: 30 }}
      >
        <Image source={leftArrow} style={{}} />
      </Pressable>

      <View style={{}}>
        <Text style={[globalStyles.headerText, {}]}>{props.text}</Text>
      </View>
    </View>
  );
};

export default Header;
