import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Link } from "expo-router";
import PlainButton from "./PlainButton";




const ButtonMenu = (user) => {
    return (
			<View style = {styles.container}>

            <Link href = {{pathname: `/profile/history`,
							params: { id: user.uid },
		 					}} asChild>
				<PlainButton width="87%" height={60} text="History" />
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
				<PlainButton width="87%" height={60} text="FAQ" />
			</Link>
			</View>
			

    );


}



const styles = StyleSheet.create({
	container: {
    backgroundColor: "white",
    // borderRadius: 20,
	// padding: 20,
	flex: 1,
	}
})

export default ButtonMenu;