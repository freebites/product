import { Tabs, Link, Stack } from "expo-router";

export default () => {
	return (
		<Tabs>
			<Tabs.Screen name="home" options={{ headerShown: false }} />
			<Tabs.Screen name="post" options={{ headerShown: false }} />
			<Tabs.Screen name="profile" options={{ headerShown: false }} />
		</Tabs>
	);
};
