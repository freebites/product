import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import LoginButton from "./LoginButton";
import { useAuth } from "@context/auth";
import { COLORS } from "../../constants";
import Checkbox from "expo-checkbox";
import { create } from "@api/user/usercrud";
import { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setItem } from "../../local-storage/asyncStorage";
import React from "react";
import { Link } from "expo-router";

const SignupSection = () => {
  const { signIn } = useAuth();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailAddress, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleFirstName = (text: string) => {
    setFirstName(text);
  };
  const handleLastName = (text: string) => {
    setLastName(text);
  };
  const handleEmail = (text: string) => {
    setEmail(text);
  };
  const handlePassword = (text: string) => {
    setPassword(text);
  };
  const handleSubmitData = () => {
    // firebase shit
    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then((userCredential) => {
        const firebaseUser = userCredential.user;
        const uid = firebaseUser.uid;
        // send to mongoDB server
        const newEmail = emailAddress.toLowerCase();
        create({ uid, firstName, lastName, emailAddress: newEmail });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("user creation failed with: ", errorCode, errorMessage);
      });
  };

  useEffect(() => {
    const setupStorage = async () => {
      await setItem("allNotification", true);
      await setItem("livePosts", true);
      await setItem("onlyFavs", false);
    };

    setupStorage();
  }, []);

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
  //   const onSubmit = (data) => console.log(data);

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
          autoComplete={Platform.OS === "ios" ? "password-new" : "new-password"}
          onChangeText={(text) => {
            handlePassword(text);
          }}
        />

        <View style={{ flex: 1, flexDirection: "row", gap: 16 }}>
          <Checkbox value={isChecked} onValueChange={setIsChecked} />
          <Text style={{ color: COLORS.neutral[70], fontSize: 11 }}>
            I have read and agree to the{" "}
            <Link
              href={{ pathname: "/loginPage" }}
              style={{ textDecorationLine: "underline" }}
            >
              <Text>Community Guidelines</Text>
            </Link>
            {"\n"}and terms of use
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          marginBottom: 20,
          width: "100%",
          alignItems: "center",
          marginTop: 20,
          gap: 12,
        }}
      >
        {/* LoginButton */}
        <LoginButton
          onPress={handleSubmitData}
          text="Sign Up"
          allowed={isChecked}
        />
        <Text style={{ color: COLORS.neutral[70] }}>
          Have an account?{"    "}
          <Link
            href={{ pathname: "/loginPage" }}
            style={{ textDecorationLine: "underline", alignSelf: "flex-end" }}
          >
            <Text>Login</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  textInput: {
    width: 330,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.neutral[50],
    backgroundColor: "#F3F2F2",
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  title: {
    color: COLORS.neutral[100],
    alignSelf: "flex-start",
    paddingLeft: "8%",
    marginBottom: 4,
    fontSize: 14,
  },
});

export default SignupSection;
