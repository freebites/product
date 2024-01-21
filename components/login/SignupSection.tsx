import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import LoginButton from "./LoginButton";
import { useAuth } from "../../context/auth";
import LoginInput from "./LoginInput";
import { create } from "../../api/user/usercrud";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
	const handleSubmitData = () => {
		// firebase shit
		createUserWithEmailAndPassword(auth, emailAddress, password)
			.then((userCredential) => {
				const user = userCredential.user;
				const uid = user.uid;
				console.log("Created account with:", user.email);
				// send to mongoDB server
				create({ uid, firstName, lastName, emailAddress });
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(
					"user creation failed with: ",
					errorCode,
					errorMessage
				);
			});
	};

	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			emailAddress: "",
			password: "",
		},
	});

	/*

	random example of something I tested out [how to add the 'registered' 
	property] 

	<Controller
		control={control}
		rules={{
			required: true,
		}}
		render={({ field: { onChange, onBlur, value } }) => (
			<TextInput
				placeholder="First name"
				onBlur={onBlur}
				onChangeText={onChange}
				value={value}
				{...register("firstName", {
					required: true,
					maxLength: 20,
				})}
			/>
		)}
		name="firstName"
	/>
	
	
	
	*/

	// this should be the function to handle the data submission to the backend
	// (hint we already implemented something like it above)
	// in this case, data is already a json object, so look at what type it is
	// you may be able to pass it directly into the create function, or you
	// need to grab each field
	const onSubmit = (data) => console.log(data);

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
				<LoginButton onPress={handleSubmitData} text="Sign Up" />
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
		paddingLeft: "15%",
	},
});

export default SignupSection;
