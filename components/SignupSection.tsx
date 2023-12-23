import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import LoginButton from "./login/LoginButton";
import { useAuth } from "../context/auth";
import LoginInput from "./login/LoginInput";
import { create } from "../server/usercrud";
import { useState } from "react";

const SignupSection = () => {
	const { signIn } = useAuth();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAddress, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleFirstName = (text) => {
		setFirstName(text);
	};
	const handleLastName = (text) => {
		setLastName(text);
	};
	const handleEmail = (text) => {
		setEmail(text);
	};
	const handlePassword = (text) => {
		setPassword(text);
	};
	const handleSubmit = () => {
		create({ firstName, lastName, emailAddress, password });
		// send to server and shit
	};
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				width: "100%",
				marginTop: "2%",
			}}
		>
			<View style={styles.form}>
				{/* Your other components
						<LoginInput title="First Name" />
				<LoginInput title="Last Name" />
				<LoginInput title="Email Address" />
				<LoginInput title="Password" isPassword="true" />
				
				*/}
				<Text style={styles.title}>First Name</Text>
				<TextInput
					style={styles.textInput}
					placeholder=""
					onChangeText={(text) => {
						handleFirstName(text);
					}}
				/>
				<Text style={styles.title}>Last Name</Text>
				<TextInput
					style={styles.textInput}
					placeholder=""
					onChangeText={(text) => {
						handleLastName(text);
					}}
				/>
				<Text style={styles.title}>Email Address</Text>
				<TextInput
					style={styles.textInput}
					placeholder=""
					keyboardType="email-address"
					textContentType="emailAddress"
					onChangeText={(text) => {
						handleEmail(text);
					}}
				/>
				<Text style={styles.title}>Password</Text>
				<TextInput
					style={styles.textInput}
					placeholder=""
					secureTextEntry
					autoComplete={
						Platform.OS === "ios" ? "password-new" : "new-password"
					}
					onChangeText={(text) => {
						handlePassword(text);
					}}
				/>
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
				<LoginButton onPress={handleSubmit} text="Sign Up" />
				<Text>Forgot password?</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	form: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		maxHeight: "60%",
		marginBottom: "3%",
	},
	textInput: {
		// backgroundColor: "red",
		minWidth: 150,
		width: "70%",
		borderBottomWidth: 1,
		borderBottomColor: "#9e9797",
	},
	title: {
		color: "#9e9797",
		alignSelf: "flex-start",
		paddingLeft: "15%"
	},
});

export default SignupSection;
