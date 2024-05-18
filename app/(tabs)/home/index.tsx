import React, { useState, forwardRef, useEffect, useContext } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableHighlight,
	StyleSheet,
	ScrollView,
	Keyboard,
	Pressable,
} from "react-native"; // views are divs and text a p tags
import { globalStyles } from "../../../components/global";
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
import {
	AppContext,
	locationInfo,
	noLocation,
} from "../../../context/appContext";
import HomeSearchBar from "../../../components/home/HomeSearchBar";
import { useAuth } from "../../../context/auth";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import GrowToggle from "../../../components/home/GrowToggle";

library.add(fab, fas);

const Home = () => {
	const [AllPosts, setPosts] = useState([]);
	const {
		filters,
		location,
		setLocation,
		userToFilter,
		setUserToFilter,
		sort,
	} = useContext(AppContext);
	const { user } = useAuth();
	const fetchData = async (query?) => {
		// convert dictionary of strings to an array
		let dietArray = [];

		Object.keys(filters).forEach((option) => {
			if (filters[option]) {
				dietArray.push(filters[option]);
			}
		});

		// let query = dietArray.join(" ");
		let postData;

		// include custom query to deal with state update changes
		if (query) {
			postData = await getWithFilter({
				diet: query.diet ? query.diet : dietArray,
				latitude: query.latitude ? query.latitude : location.latitude,
				longitude: query.longitude
					? query.longitude
					: location.longitude,
				userID: userToFilter,
				sort: query.sort ? query.sort : sort,
			});
		} else {
			// usually just do this
			postData = await getWithFilter({
				diet: dietArray,
				latitude: location.latitude,
				longitude: location.longitude,
				userID: userToFilter,
				sort: sort,
			});
		}
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

	useEffect(() => {
		// async function
		fetchData();
		setRefreshing(true);
	}, [userToFilter, filters]);
	return (
		<View style={[globalStyles.container]}>
			<HomeSearchBar
				// if nothing is in the search bar, then clear location
				onPress={(details) => {
					const newCoords =
						details != null
							? {
									latitude: details.lat,
									longitude: details.lng,
							  }
							: noLocation;
					setLocation(newCoords);
					fetchData(newCoords);
					setRefreshing(true);
					console.log(location);
				}}
			/>

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					gap: 8,
					width: "60%",
					marginTop: "2%",
					marginBottom: "3%",
				}}
			>
				<GrowToggle
					selected={userToFilter == ""}
					text={"All Posts"}
					onPress={() => setUserToFilter("")}
				/>
				<GrowToggle
					selected={userToFilter != ""}
					text={"Your Posts"}
					onPress={() => setUserToFilter(user.uid)}
				/>
				{/* sets a border width that's normally transparent, 
						and then is tied to the 'loginSelected' boolean 
						TODO: figure out how to animate it, might need 
						a different component for this. Also make more 
						readable  */}
			</View>

			<ScrollView
				contentContainerStyle={styles.postContainer}
				showsVerticalScrollIndicator={false}
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
		</View>
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
