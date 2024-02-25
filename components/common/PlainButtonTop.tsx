import { Image, Pressable, StyleSheet, Text } from "react-native";
import React, { forwardRef } from "react";
import styled from "styled-components/native";

const leftArrow = require("../../assets/icons/chevron-right.png");

const styles = StyleSheet.create({
  button: {
    border: 0.5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    minHeight: 60,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
    flex: 1,
  },
  arrow: {
    marginRight: 20,
  },
});

const PlainButtonTop = (props, ref) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgba(209, 204, 182, 0.3)" : "#FFFCFA",
        },
        { width: props.width, height: props.height },
        styles.button,
      ]}
      ref={ref}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
      <Image source={leftArrow} style={{ marginRight: 18 }}></Image>
    </Pressable>
  );
};

// need to add forward ref if you want to wrap button in <Link>
export default forwardRef(PlainButtonTop);
