import { Image, View, StyleSheet, Pressable, Text } from "react-native";
import React, { forwardRef } from "react";
import styled from "styled-components/native";

const leftArrow = require("../../assets/icons/chevron-right.png");

// const PlainButtonUI = styled.Pressable`
//   background: #fffbf9;
//   border: 0.5px solid #d3d3d3;
//   flex: 1;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   min-height: 60px;
// `;

// const ButtonText = styled.Text`
//   font-size: 18px;
//   font-weight: bold;
//   color: #505a4e;
//   margin-left: 30px;
//   flex: 1;
// `;

const styles = StyleSheet.create({
  button: {
    border: 0.5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    minHeight: 100,
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

const PlainButton = (props, ref) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgba(209, 204, 182, 0.3)" : "#FFFCFA",
        },
        styles.button,
        { width: props.width, height: props.height },
        {
          borderBottomRightRadius: props.section == "bottom" ? 20 : 0,
          borderBottomLeftRadius: props.section == "bottom" ? 20 : 0,
          borderTopRightRadius: props.section == "top" ? 20 : 0,
          borderTopLeftRadius: props.section == "top" ? 20 : 0,
        },
        ,
      ]}
      ref={ref}
    >
      <View style={styles.textArrowView}>
        <Text style={styles.buttonText}>{props.text}</Text>
        <Image source={leftArrow} style={{ marginRight: 18 }}></Image>
      </View>
    </Pressable>
  );
};

// need to add forward ref if you want to wrap button in <Link>
export default forwardRef(PlainButton);
