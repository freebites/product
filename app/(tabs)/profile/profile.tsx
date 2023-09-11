import React from "react";
import { Link } from "expo-router";
import { View, Text, SafeAreaView, Image } from "react-native"; // views are divs and text a p tags
import { useAuth } from "../../../context/auth";
import { globalStyles } from "../../../components/global";
import ProfileCard from "../../../components/common/cards/ProfileCard";
import PlainButton from "../../../components/common/PlainButton";

const Profile = () => {
	const { signOut } = useAuth();
	return (
		<SafeAreaView
			style={[
				globalStyles.container,
				{ alignItems: "center", width: "100%" },
			]}
		>
			<Text
				style={{
					paddingTop: "8.7%",
					fontSize: 34,
					color: "#505A4E",
					fontWeight: "bold",
				}}
			>
				My Profile
			</Text>
			<View
				style={{
					height: "7%",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "flex-end",
				}}
			>
				<Text
					style={{
						fontSize: 16,
						height: 20,
						justifyContent: "flex-end",
						fontWeight: "bold",
						color: "#505A4E",
					}}
				>
					Personal details
				</Text>
				<Text
					style={{
						fontSize: 16,
						color: "#FA4A0C",
						height: 20,
						justifyContent: "flex-end",
					}}
				>
					Edit
				</Text>
			</View>
			<ProfileCard />

			<PlainButton width="87%" height="60px" text="History" />
			<PlainButton width="87%" height="60px" text="Drafts" />
			<PlainButton width="87%" height="60px" text="Settings" />
			<PlainButton width="87%" height="60px" text="FAQ" />
			<Text onPress={() => signOut()}>Sign Out</Text>
		</SafeAreaView>
	);
};

export default Profile;
