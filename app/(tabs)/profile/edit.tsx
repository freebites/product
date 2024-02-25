import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { globalStyles } from "../../../components/global";
import EditProfileHeader from "../../../components/profile/EditProfileHeader";
import EditProfileInput from "../../../components/profile/EditProfileInput";

const editProfile = () => {
  return (
    <SafeAreaView style={globalStyles.containerLight}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, margin: "5%", gap: 15 }}
      >
        <EditProfileHeader />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, flexDirection: "column", gap: 10 }}>
            <EditProfileInput title="Name" />
            <EditProfileInput title="Username" />
            <EditProfileInput title="Pronouns" />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default editProfile;
