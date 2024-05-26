import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";
import { globalStyles } from "../global";
import { Icon } from "react-native-elements";

const leftArrow = require("../../assets/icons/chevron-left.png");

function goBack() {
  router.back();
}
interface HeaderProps {
  text: string;
  children?: React.ReactNode;
}
const Header = (props: HeaderProps) => {
  const { text, children } = props;
  return (
    <View style={styles.container}>
      <Pressable onPress={() => goBack()} style={styles.backButton}>
        <Icon type={"entypo"} name={"chevron-left"} style={styles.image} />
      </Pressable>

      <View style={styles.titleContainer}>
        <Text style={globalStyles.headerText}>{text}</Text>
      </View>

      <View style={styles.extraButtonContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10%",
  },
  image: {
    marginTop: 10,
  },
  backButton: {
    zIndex: 10,
    position: "absolute",
    left: 30,
    height: 40,
    width: 60,
    paddingLeft: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  extraButtonContainer: {
    position: "absolute",
    right: 30,
  },
});

export default Header;
