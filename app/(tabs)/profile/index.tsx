
import React, {useState, useEffect} from "react"
import { Link, Redirect, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { View, Text, SafeAreaView, Image, StyleSheet} from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../../components/global";
import ProfileCard from "../../../components/common/cards/ProfileCard";
import PlainButton from "../../../components/common/PlainButton";
import PlainButtonTop from "../../../components/common/PlainButtonTop";
import { useAuth, validateRoutePerms } from "../../../context/auth";
import { getOne } from "../../../api/user/usercrud";
import { emptyUser, userType } from "../../../context/userContext";
// import PlainButtonTop from "../../../components/common/PlainButtonTop";
import ButtonMenu from "../../../components/common/ButtonMenu";
import PlainButtonBottom from "../../../components/common/PlainButtonBottom";

const Profile = () => {
	const { user } = useAuth();
	const routeParams = useLocalSearchParams();
	
	validateRoutePerms(user, routeParams);

	if (user == undefined || user.uid != routeParams.id) {
		return <Redirect href = "/login"/> 
	}
	
	const [currUser, setCurrUser] = useState(emptyUser);
	const fetchData = async () => {
		const userData = await getOne(user.uid);
		setCurrUser(userData);
	};

	/*
		TODO (Johnny and Jack): useEffect should change based on screen or 
		on editing screen. Variable to tell us when switching screens
			- make dummy user data in Mongo
			- Inner profile pages need validate check if globalparams is
			accessible in nested pages, 
				router.push params
	*/
	
	useEffect(() => {
		fetchData();
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
				name = {currUser.firstName} email = {currUser.emailAddress} 
				bio = {currUser.bio}
			/>
			<View style = {styles.tabMenu}>
			<Link href = {{pathname: `/profile/history`,
							params: { id: user.uid },
		 					}} asChild>
				<PlainButtonTop width="87%" height={60} text="History" />
			</Link>

			<Link href = {{pathname: `/profile/drafts`,
							params: { id: user.uid },
		 					}} asChild>
				<PlainButton width="87%" height={60} text="Drafts" />
			</Link>

			<Link href = {{pathname: `/profile/settings`,
							params: { id: user.uid },
		 					}} asChild>
				<PlainButton width="87%" height={60} text="Settings" />
			</Link>

			<Link href="/(tabs)/profile/FAQ" asChild>
				<PlainButtonBottom width="87%" height={60} text="FAQ" />
			</Link>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	tabMenu: {
		flex: 1,
		marginBottom: 30,

	},
})
export default Profile;
