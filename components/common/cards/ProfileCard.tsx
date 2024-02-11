import { View, Text } from "react-native";
import React from "react";
import { styled } from "styled-components/native";
import { useGlobalSearchParams } from "expo-router";

const ProfileCardUI = styled.View`
	width: 87%;
	height: 21.3%;
	border-radius: 20px;
	background: #fffbf9;
	display: "flex";
	flex-direction: row;
	margin: 12px;
`;

const ProfileCardTextUI = styled.View`
	justify-content: center;
	display: flex;
	width: 62%;
`;

const ProfileImageUI = styled.View`
	width: 35%;
`;

const CardText = styled.Text`
	color: #505a4e;
`;

const CardTextBox = styled.Text``;

const ProfileCard = (props) => {

	return (
		<ProfileCardUI>
			<ProfileImageUI></ProfileImageUI>
			<ProfileCardTextUI>
				<CardText style={{ fontSize: 18, fontWeight: "bold" }}>
					<Text>{props.name}</Text>
				</CardText>

				<CardText style={{ fontSize: 15 }}>{props.email}</CardText>

				<CardText style={{ fontSize: 15, height: "33%" }}>
					<Text>{props.bio}</Text>
				</CardText>
			</ProfileCardTextUI>
		</ProfileCardUI>
	);
};

export default ProfileCard;
