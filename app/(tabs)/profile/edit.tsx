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
      <EditProfileHeader />
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <KeyboardAvoidingView behavior="position" style={{ marginTop: 22 }}>
          <View
            style={{
              alignItems: "center",
              width: 400,
              backgroundColor: "#f0e1d2",
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              paddingTop: 30,
            }}
          >
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
              flex: 1,
              margin: "5%",
              marginVertical: "20%",
              marginBottom: 30,
              gap: 30,
            }}
          >
            <EditProfileInput title="Name" />
            <EditProfileInput title="Username" />
            <EditProfileInput title="Pronouns" />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default editProfile;
