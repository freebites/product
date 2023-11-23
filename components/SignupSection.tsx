import { View, Text } from "react-native";
import LoginButton from "./login/LoginButton";
import { useAuth } from "../context/auth";
import LoginInput from "./login/LoginInput";

const SignupSection = () => {
	const { signIn } = useAuth();

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				width: "100%",
				marginTop: "2%",
			}}
		>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "space-around",
					width: "100%",
					maxHeight: "60%",
					marginBottom: "3%",
				}}
			>
				{/* Your other components */}
				<LoginInput title="First Name" />
				<LoginInput title="Last Name" />
				<LoginInput title="Email Address" />
				<LoginInput title="Password" isPassword="true" />
			</View>

			<View
				style={{
					justifyContent: "center",
					marginBottom: 20,
					width: "100%",
					alignItems: "center",
					marginTop: 20,
				}}
			>
				{/* LoginButton */}
				<LoginButton onPress={() => signIn()} text="Login" />
				<Text>Forgot password?</Text>
			</View>
		</View>
	);
};

export default SignupSection;
