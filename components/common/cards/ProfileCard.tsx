import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import { useGlobalSearchParams } from "expo-router";
import { Image } from "react-native-elements";
// import { placeholder } from "../../../assets/icons/freebites/placeholder";

const placeholder = require("../../../assets/icons/placeholder.png");
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

// const ProfileCardUI = styled.View`
// 	width: 87%;
// 	height: 21.3%;
// 	border-radius: 20px;
// 	background: #fffbf9;
// 	display: "flex";
// 	flex-direction: row;
// 	margin: 12px;
// `;

// const ProfileCardTextUI = styled.View`
// 	justify-content: center;
// 	display: flex;
// 	width: 62%;
// `;

// const ProfileImageUI = styled.View`
// 	width: 35%;
// `;

// const CardText = styled.Text`
// 	color: #505a4e;
// `;

const ProfileCard = (props) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Pressable>
        <Image source={placeholder} style={style.picture}></Image>
      </Pressable>
      <View>
        <Text style={style.nameText}>{props.name}</Text>
        <Text style={style.emailText}>{props.email}</Text>
      </View>
    </View>
  );
};

// <ProfileCardUI>
// 	<ProfileImageUI></ProfileImageUI>
// 	<ProfileCardTextUI>
// 		<CardText style={{ fontSize: 18, fontWeight: "bold" }}>
// 			<Text>{props.name}</Text>
// 		</CardText>

// 		<CardText style={{ fontSize: 15 }}>{props.email}</CardText>

// 		<CardText style={{ fontSize: 15, height: "33%" }}>
// 			<Text>{props.bio}</Text>
// 		</CardText>
// 	</ProfileCardTextUI>
// </ProfileCardUI>
export default ProfileCard;
