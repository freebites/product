import { View, Text } from "react-native";
import LoginButton from "./common/LoginButton";
import { useAuth } from "../context/auth";
import LoginInput from "./common/LoginInput";

const LoginSection = () => {
	const { signIn } = useAuth();

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				width: "100%",
				paddingTop: "7%",
			}}
		>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "space-around",
					width: "100%",
					maxHeight: "60%",
					paddingBottom: "3%",
				}}
			>
				{/* Your other components */}
				<LoginInput title="Username" />
				<LoginInput title="Password" isPassword="true" />
			</View>

			<View
				style={{
					justifyContent: "center",
					marginBottom: 20,
					width: "100%",
					alignItems: "center",
				}}
			>
				{/* LoginButton */}
				<LoginButton onPress={() => signIn()} text="Login" />
				<Text>Forgot password?</Text>
			</View>
		</View>
	);
};

export default LoginSection;
