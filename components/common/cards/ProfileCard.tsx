import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import { useGlobalSearchParams, Link, router } from "expo-router";
import { Image } from "react-native-elements";

const placeholder = require("../../../assets/icons/placeholder.png");
const editbutton = require("../../../assets/icons/editbutton.png");

const style = StyleSheet.create({
  picture: {
    height: 161,
    width: 143,
    borderRadius: 10,
    marginBottom: 10,
  },
  nameText: {
    color: "#58565D",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
  },
  emailText: {
    color: "#58565D",
    fontSize: 14,
    alignSelf: "center",
  },
});

const ProfileCard = (props) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Image source={placeholder} style={style.picture}></Image>
      {/* <Link href={{ pathname: `/profile/edit` }}> */}
      <Pressable
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          paddingTop: 140,
        }}
        onPress={() => {
          router.push({
            pathname: "/profile/edit",
            params: { id: "user.uid" },
          });
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={editbutton}
        ></Image>
      </Pressable>

      <View>
        <Text style={style.nameText}>{props.name}</Text>
        <Text style={style.emailText}>{props.email}</Text>
      </View>
    </View>
  );
};

export default ProfileCard;
