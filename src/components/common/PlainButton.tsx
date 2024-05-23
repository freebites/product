import {
  Image,
  View,
  StyleSheet,
  Pressable,
  Text,
  PressableProps,
  DimensionValue,
} from "react-native";
import React, { forwardRef } from "react";

const leftArrow = require("../../assets/icons/chevron-right.png");
const styles = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    minHeight: 80,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
    flex: 1,
    alignSelf: "center",
    color: "#58565D",
  },
  arrow: {
    marginRight: 20,
  },
  textArrowView: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});

interface PlainButtonProps {
  text: string;
  onPress?: () => void;
  width: DimensionValue;
  height: number;
  section: "top" | "bottom" | "middle";
}
const PlainButton = React.forwardRef<View, PlainButtonProps>((props, ref) => {
  const { text, onPress, width, height, section } = props;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgba(209, 204, 182, 0.3)" : "#FFFCFA",
          width: width,
          height: height,
          borderBottomRightRadius: section == "bottom" ? 20 : 0,
          borderBottomLeftRadius: section == "bottom" ? 20 : 0,
          borderTopRightRadius: section == "top" ? 20 : 0,
          borderTopLeftRadius: section == "top" ? 20 : 0,
        },
        styles.button,
      ]}
      ref={ref}
    >
      <View style={styles.textArrowView}>
        <Text style={styles.buttonText}>{text}</Text>
        <Image source={leftArrow} style={{ marginRight: 18 }}></Image>
      </View>
    </Pressable>
  );
});

// need to add forward ref if you want to wrap button in <Link>
export default PlainButton;
