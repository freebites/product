import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { globalStyles } from "../../../components/global";
import EditProfileHeader from "../../../components/profile/EditProfileHeader";
import EditProfileInput from "../../../components/profile/EditProfileInput";
const placeholder = require(" ../../../assets/icons/freebites/placeholder.png");

const editProfile = () => {
  return (
    <SafeAreaView style={globalStyles.containerLight}>
      {/* <View
        style={{ backgroundColor: "white", flex: 1, width: 500, height: 1000 }}
      > */}
      <EditProfileHeader />

      <KeyboardAvoidingView behavior="position" style={{ paddingTop: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={placeholder}
            style={{ height: 161, width: 143, borderRadius: 10 }}
          />
          <Text style={{ marginTop: 15, color: "#F95D25" }}>
            change profile photo
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: "white",

            flex: 1,
            margin: "5%",
            marginTop: "20%",
            gap: 15,
            // width: 50,
            // height: 50,
          }}
        >
          <EditProfileInput title="Name" />
          <EditProfileInput title="Username" />
          <EditProfileInput title="Pronouns" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default editProfile;
