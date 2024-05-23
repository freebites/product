import { View, Text } from "react-native";
import React from "react";
import BorderLine from "./BorderLine";

const ContactSection = () => {
  return (
    <View>
      <Text>Contact Us</Text>
      <Text style={{ marginTop: "5%", fontSize: 16 }}>
        Contact us at FreeBites@gmail.com!
      </Text>
      <View style={{ paddingTop: 40 }}>
        <BorderLine />
      </View>
    </View>
  );
};

export default ContactSection;
