import React from "react";
import { useState, useEffect } from "react"
import { Link, Redirect, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { View, Text, SafeAreaView, Image } from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../../components/global";
import ProfileCard from "../../../components/common/cards/ProfileCard";
import PlainButton from "../../../components/common/PlainButton";
import { useAuth } from "../../../context/auth";
import { getOne } from "../../../api/user/usercrud"


const Profile = () => {
	const { user } = useAuth();
	console.log("userid:" + user.uid);
	// const
	// We can get parameters of the route
		//See if it matches that of the userAuthContext
	
	const routeParams = useLocalSearchParams();
	// const currUser2 = useGlobalSearchParams();
	if (user.uid != routeParams.id) {
		return <Redirect href = "/home"/> 
	}
	
	const [currUser, setCurrUser] = useState([]);
	const fetchData = async () => {
		const userData = await getOne(user.uid);
		setCurrUser(userData);
		// setRefreshing(false);
		//console.log(postData);
	};

	useEffect(() => {
		// async function
		fetchData();
		console.log("in useeffect");
	}, []);

	console.log(currUser);
	
	return (
		<SafeAreaView style={globalStyles.container}>
			<Text style={[globalStyles.headerText, { marginTop: "8.7%" }]}>
				My Profile
			</Text>

			<View
				style={{
					height: "7%",
					flexDirection: "row",
					alignItems: "center",
					width: "100%",
				}}
			>
				<Text
					style={[
						globalStyles.text,
						{
							height: 20,
							fontWeight: "bold",
							width: "45%",
							margin: "15%",
							textAlign: "right",
						},
					]}
				>
					Personal details
				</Text>
				<Link href="/profile/edit">
					<Text
						style={{
							fontSize: 16,
							color: "#FA4A0C",
							height: 20,
							width: "40%",
						}}
					>
						Edit
					</Text>
				</Link>
			</View>
			<ProfileCard 
				name = "Joe" email = "joemama@gmail.com" bio = "woohoo"
			/>
			<Link href="/(tabs)/profile/history" asChild>
				<PlainButton width="87%" height={60} text="History" />
			</Link>

			<Link href="/(tabs)/profile/drafts" asChild>
				<PlainButton width="87%" height={60} text="Drafts" />
			</Link>

			<Link href="/(tabs)/profile/settings" asChild>
				<PlainButton width="87%" height={60} text="Settings" />
			</Link>

			<Link href="/(tabs)/profile/FAQ" asChild>
				<PlainButton width="87%" height={60} text="FAQ" />
			</Link>
		</SafeAreaView>
	);
};

export default Profile;
