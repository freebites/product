import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import { useAuth } from "@context/auth";
import { COLORS } from "../../constants";
import Checkbox from "expo-checkbox";
import { create } from "@api/user/usercrud";
import { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setItem } from "../../utils/asyncStorage";
import React from "react";
import { Link } from "expo-router";
import RectangleOrangeButton from "@components/common/RectangleOrangeButton";
import { ErrorCodes, ErrorMessage } from "freebites-types/ErrorCodes";

const SignupSection = () => {
  const { user, setUser, signIn } = useAuth();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailAddress, setEmail] = useState<string>("");
  const [password, setNewPassword] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    oldError: string;
    newError: string;
    confirmError: string;
  }>({
    oldError: "",
    newError: "",
    confirmError: "",
  });

  const [validated, setValidated] = useState<{
    oldValidated: boolean;
    newValidated: boolean;
    confirmValidated: boolean;
  }>({
    oldValidated: true,
    newValidated: false,
    confirmValidated: false,
  });

  const validateNewPassword = (password: string) => {
    var regularExpression =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const valid = regularExpression.test(password);

    setValidated((prevState) => ({
      ...prevState,
      newValidated: valid,
    }));

    setErrors((prevState) => ({
      ...prevState,
      newError: valid
        ? ""
        : "Password needs at least 1 number, 1 symbol, 1 capital, and between 8-16 characters",
    }));

    if (valid) {
      setNewPassword(password);
    }
  };

  const handleFirstName = (text: string) => {
    setFirstName(text);
  };
  const handleLastName = (text: string) => {
    setLastName(text);
  };
  const handleEmail = (text: string) => {
    setEmail(text);
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
      .catch((error: any) => {
        const errorCode = error.code;
        if (errorCode == ErrorCodes.INVALID_EMAIL) {
          setEmailErrorMessage(ErrorMessage.INVALID_EMAIL);
        }
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

  useEffect(() => {
    if (emailErrorMessage) {
      const timer = setTimeout(() => {
        setEmailErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [emailErrorMessage]);

  useEffect(() => {
    // Enable the button if the password is valid and other required fields are filled
    if (
      validated.newValidated &&
      firstName &&
      lastName &&
      emailAddress &&
      isChecked
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [validated.newValidated, firstName, lastName, emailAddress, isChecked]);

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
          style={[
            styles.textInput,
            emailErrorMessage ? styles.errorBorder : null,
          ]}
          placeholder=""
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(text) => {
            handleEmail(text);
          }}
        />
        <View style={styles.errorContainer}>
          {emailErrorMessage ? (
            <Text style={styles.errorText}>{emailErrorMessage}</Text>
          ) : null}
        </View>

        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder=""
          secureTextEntry
          autoComplete={Platform.OS === "ios" ? "password-new" : "new-password"}
          onChangeText={(text) => {
            validateNewPassword(text);
          }}
        />
        <Text style={styles.errorText}>{errors.newError}</Text>

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
        <RectangleOrangeButton
          onPress={handleSubmitData}
          text="Sign Up"
          disabled={
            emailAddress.length === 0 || password.length === 0 || !isChecked
          }
          bold
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
  errorText: {
    fontSize: 12,
    color: COLORS.error[70],
    textAlign: "left",
    width: "70%",
  },
  errorBorder: {
    borderColor: COLORS.error[70],
  },
  errorContainer: {
    minHeight: 10,
    justifyContent: "center",
  },
});

export default SignupSection;
