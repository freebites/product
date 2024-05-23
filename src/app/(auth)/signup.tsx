import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { globalStyles } from "../../../components/global";
import { TouchableHighlight } from "react-native-gesture-handler";
import LoginSection from "../../../components/login/LoginSection";
import SignupSection from "../../../components/login/SignupSection";
import { useLocalSearchParams } from "expo-router";
//import React from 'react'

//import top image icon thingy
const icon = require("../../assets/icons/freebites/logo.png");

// TODO: convert to form and then probably turn it into its own component

const signup = () => {
  const params = useLocalSearchParams(); // converts to string for some reason

  // selects section based on if "login" or "sign up" was use to navigate here,
  // defaults to signup
  const [loginSelected, setLoginSelected] = useState(
    params.login === "true" ? true : false
  );

  return (
    // <TouchableWithoutFeedback
    //   onPress={() => Keyboard.dismiss()}
    //   accessible={false}
    // >
    <View
      style={[
        globalStyles.container,
        { flex: 1, alignItems: "center", width: "100%" },
      ]}
    >
      <View
        style={{
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          aspectRatio: 1 / 1,
          paddingTop: "11.7%",
          justifyContent: "space-evenly",
        }}
      >
        <Image source={icon} style={{ width: 169, height: 191 }} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <View style={{ width: "30%" }}>
            <TouchableHighlight
              style={{
                borderBottomWidth: 1,
                borderColor: loginSelected ? "#EDA76E" : "transparent",
                alignItems: "center",
              }}
              underlayColor="transparent"
              onPress={() => setLoginSelected(true)}
            >
              <Text>Login</Text>
            </TouchableHighlight>
          </View>

          <View style={{ width: "30%" }}>
            <TouchableHighlight
              style={{
                borderBottomWidth: 1,
                borderColor: !loginSelected ? "#EDA76E" : "transparent",
                alignItems: "center",
              }}
              underlayColor="transparent"
              onPress={() => setLoginSelected(false)}
            >
              <Text>Sign Up</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>

      {loginSelected ? <LoginSection /> : <SignupSection />}
    </View>
    // </TouchableWithoutFeedback>
  );
};

export default signup;
