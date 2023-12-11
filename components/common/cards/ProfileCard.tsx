import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { getUser } from "../../../server/read";

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

type userSchema = { 
	firstName: String,
  lastName: String,
  pronouns: String,
  email: String,
  profilePic: String,
};


// Get user information from backend 
// Display accoridingly for Profile header, cannot type user of userSchema 
// and access properties of user {user.firstName}
const ProfileCard = () => {
	
	const [user, setUser] = useState<userSchema>();
  	const fetchUserData = async () => {
		const johnnyUser = await getUser("johnny.tan@tufts.edu");
		setUser(johnnyUser);
		console.log(user);
  	};

	useEffect(() => {
		// async function
		fetchUserData();
	}, []);

	// const userId = user.email;

	return (
		<ProfileCardUI>
			<ProfileImageUI></ProfileImageUI>
			<ProfileCardTextUI>
				<CardText style={{ fontSize: 18, fontWeight: "bold" }}>
					<Text>Name</Text>
				</CardText>

				<CardText style={{ fontSize: 15 }}>email address</CardText>

				<CardText style={{ fontSize: 15, height: "33%" }}>
					<Text>Lorem ipsum dolor sit amet,</Text>
				</CardText>
			</ProfileCardTextUI>
		</ProfileCardUI>
	);
};

export default ProfileCard;
