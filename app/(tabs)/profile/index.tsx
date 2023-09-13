import React from "react";
import { Link } from "expo-router";
import { View, Text, SafeAreaView, Image } from "react-native"; // views are divs and text a p tags
import { useAuth } from "../../../context/auth";
import { globalStyles } from "../../../components/global";
import ProfileCard from "../../../components/common/cards/ProfileCard";
import PlainButton from "../../../components/common/PlainButton";
import Header from "../../../components/common/Header";
const Profile = () => {
	const { signOut } = useAuth();
	return (
		<SafeAreaView style={globalStyles.container}>
			<Header text="My Profile" />

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
			<Link href="/(tabs)/profile/history" asChild>
				<PlainButton width="87%" height="60px" text="History" />
			</Link>

			<Link href="/(tabs)/profile/drafts" asChild>
				<PlainButton width="87%" height="60px" text="Drafts" />
			</Link>

			<Link href="/(tabs)/profile/settings" asChild>
				<PlainButton width="87%" height="60px" text="Settings" />
			</Link>

			<Link href="/(tabs)/profile/FAQ" asChild>
				<PlainButton width="87%" height="60px" text="FAQ" />
			</Link>

			<Text onPress={() => signOut()}>Sign Out</Text>
		</SafeAreaView>
	);
};

export default Profile;
