import { Stack } from "expo-router";
import { PostProvider } from "../../../context/postContext";

export default function ProfileLayout() {
	return (
		<PostProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</PostProvider>
	);
}
