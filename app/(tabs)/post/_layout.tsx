import { Stack } from "expo-router";
import { PostProvider } from "../../../context/postContext";
import { Button, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "../../../components/common/BackButton";
import ProgressBar from "../../../components/post/ProgressBar";

// don't really know why it's called profile, it's just post (breaks when i rename it)

const OpenOptions = () => {
	return (
		<Pressable style={{ marginRight: "8.7%" }}>
			<MaterialCommunityIcons
				name="dots-horizontal"
				size={24}
				color="black"
			/>
		</Pressable>
	);
};
export default function ProfileLayout() {
	// includes the postProvider to use the PostContext
	// OKAY SO UPDATE FOR THE FUTURE:
	// IT IS POSSIBLE TO BUILD THE PROGRESS BAR INTO THE HEADER, BUT WE WOULD
	// NEED TO BUILD THE HEADER COMPLETELY FROM SCRATCH. DON'T HAVE TIME FOR
	// THAT RIGHT NOW
	return (
		<PostProvider>
			<Stack
				screenOptions={{
					headerShown: true,
					headerBackTitleVisible: false,
					headerBackVisible: false,
					headerLeft: () => <BackButton marginLeft={"8.7%"} />,
					headerStyle: { backgroundColor: "#FFFCFA" },
					// import the options component here
					headerRight: () => <OpenOptions />,
				}}
			>
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
		</PostProvider>
	);
}
