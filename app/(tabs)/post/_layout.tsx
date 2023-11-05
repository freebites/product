import { Stack } from "expo-router";
import { PostProvider } from "../../../context/postContext";

export default function ProfileLayout() {
	// includes the postProvider to use the PostContext
	return (
		<PostProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</PostProvider>
	);
}
