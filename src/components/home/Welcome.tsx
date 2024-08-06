import React from "react";
import { View, Text, Image } from "react-native";

const icon = require("../../assets/icons/freebites/freebites_logo.png");
const image = require("../../assets/images/freebites_title.png");
// import styles from './welcome-style'

const Welcome = () => {
  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: "17.7%",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <Image source={icon} />
      {/* <SvgXml xml={icon} width="100" height="100" /> */}
      <Image source={image} />
      {/* <Text style={{ color: "#FFFCFA", fontSize: 45, opacity: 0.7 }}>
        FreeBites
      </Text> */}
      <Text style={{ color: "#6E6E6E", fontSize: 15 }}>
        Food tastes better when it's free.{" "}
      </Text>
    </View>
  );
};

export default Welcome;
