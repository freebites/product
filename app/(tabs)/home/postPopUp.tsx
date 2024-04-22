import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
	Link,
	router,
	useLocalSearchParams,
	useNavigation,
	useRouter,
} from "expo-router";
import React, { useContext } from "react";
import BackButton from "../../../components/common/BackButton";
import PostCard from "../../../components/home/PostCard";
import { globalStyles } from "../../../components/global";


export const postPopUp = (props, state) => {

	const params = useLocalSearchParams();


	return (
		<SafeAreaView style={globalStyles.container}>
			<View style={styles.cardbox}>
				<PostCard id={params.id} />
			</View>
			<BackButton />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	cardbox: {
		height: 650,
		marginTop: 50,
		width: 345,
	},
});

export default postPopUp;
