import { Tabs, Link, Stack } from "expo-router";
import { Image } from "react-native";
import React from "react";

const homeIcon = require("../../assets/icons/freebites/home-icon.png");
const postIcon = require("../../assets/icons/freebites/add-post.png");
const profIcon = require("../../assets/icons/freebites/profile.png");
export default () => {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					height: "10.4%",
					backgroundColor: "#EEE1D5",
					justifyContent: "center",
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarIcon: () => <Image source={homeIcon} />,
					tabBarShowLabel: false,
				}}
			/>
			<Tabs.Screen
				name="post"
				options={{
					headerShown: false,
					tabBarIcon: () => <Image source={postIcon} />,
					tabBarShowLabel: false,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					headerShown: false,
					tabBarIcon: () => <Image source={profIcon} />,
					tabBarShowLabel: false,
				}}
			/>
		</Tabs>
	);
};
