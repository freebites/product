import React, { useState, forwardRef, useEffect, useContext } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableHighlight,
	StyleSheet,
	ScrollView,
} from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../../components/global";
import SearchBar from "../../../components/home/SearchBar";
import HomePost from "../../../components/home/HomePost";
import { Link, router, useLocalSearchParams } from "expo-router";
import { getAllPosts, getWithFilter } from "../../../api/posts/read";
import {
	PostContext,
	PostProvider,
	postType,
} from "../../../context/postContext";
import Post from "../post";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { RefreshControl } from "react-native-gesture-handler";
import FilterList from "../../../components/home/FilterList";
import { AppContext } from "../../../context/appContext";
import PlacesSearchBar from "../../../components/common/PlacesSearchBar";
import HomeSearchBar from "../../../components/home/HomeSearchBar";
import { useAuth } from "../../../context/auth";

library.add(fab, fas);

const Home = () => {
	const [AllPosts, setPosts] = useState([]);
	const { filters, location, setLocation, userToFilter, setUserToFilter } =
		useContext(AppContext);
	const { user } = useAuth();
	const fetchData = async () => {
		// convert dictionary of strings to an array
		let dietArray = [];

		Object.keys(filters).forEach((option) => {
			if (filters[option]) {
				dietArray.push(filters[option]);
			}
		});

		// let query = dietArray.join(" ");
		let postData;

		postData = await getWithFilter({
			diet: dietArray,
			latitude: location.latitude,
			longitude: location.longitude,
			userID: userToFilter,
		});
		console.log(filters);
		setPosts(postData);
		setRefreshing(false);
		//console.log(postData);
	};

	const { postData, updatePostData } = useContext(PostContext);
	const [refreshing, setRefreshing] = useState(true);
	const handleUpdate = (eachPostData: postType) => {
		updatePostData(eachPostData);
	};

	// const fetchPost = async (props) => {
	// 	const postData = await getOne(props._id);
	// 	setSinglePost(postData);
	// }

	const [yourPostsFilter, setYourPostsFilter] = useState(false);

	useEffect(() => {
		// async function

		setUserToFilter(yourPostsFilter ? "" : user.uid);
		fetchData();
		setRefreshing(true);
	}, [yourPostsFilter]);
	return (
		<SafeAreaView style={[globalStyles.container]}>
			<HomeSearchBar
				onPress={(details) => {
					setLocation({
						latitude: details.lat,
						longitude: details.lng,
					});
					console.log(location);
				}}
			/>
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-end",
					justifyContent: "space-evenly",
					width: "100%",
					paddingTop: "3%",
					paddingBottom: "3%",
				}}
			>
				<View style={{ width: "30%" }}>
					<TouchableHighlight
						style={{
							borderBottomWidth: 1,
							borderColor: !yourPostsFilter
								? "#EDA76E"
								: "transparent",
							alignItems: "center",
						}}
						underlayColor="transparent"
						onPress={() => setYourPostsFilter(false)}
					>
						<Text> All </Text>
					</TouchableHighlight>
				</View>

				{/* sets a border width that's normally transparent, 
						and then is tied to the 'loginSelected' boolean 
						TODO: figure out how to animate it, might need 
						a different component for this. Also make more 
						readable  */}
				<View style={{ width: "30%" }}>
					<TouchableHighlight
						style={{
							borderBottomWidth: 1,
							borderColor: yourPostsFilter
								? "#EDA76E"
								: "transparent",
							alignItems: "center",
						}}
						underlayColor="transparent"
						onPress={() => setYourPostsFilter(true)}
					>
						<Text> Bookmark </Text>
					</TouchableHighlight>
				</View>
			</View>

			<ScrollView
				contentContainerStyle={styles.postContainer}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={fetchData}
					/>
				}
			>
				{AllPosts.map((eachPost: postType) => {
					// {handleUpdate(eachPost)}
					// console.log(eachPost)
					return (
						// <Link
						// 	href = {{
						// 		pathname: "/home/postPopUp",
						// 		params: {eachPost}
						// 	}} asChild
						// 	key = {eachPost._id}

						// >
						<HomePost
							style={styles.postCard}
							key={eachPost._id}
							post={eachPost}
							onPress={() =>
								router.push({
									pathname: "/home/postPopUp",
									params: { id: eachPost._id },
								})
							}
						/>
						//<Text>{JSON.stringify(eachPost)}</Text>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	postContainer: {
		rowGap: 15,
		width: 345,
	},
	postCard: {
		marginBottom: 30,
	},
});

export default Home;
