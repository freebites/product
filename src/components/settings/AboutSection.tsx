import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";
import { setItem } from "../../utils/asyncStorage";
import Dropdown from "./Dropdown";

const AboutSection = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setShowDropdown(true);
  }, []);
  return (
    <View>
      <Dropdown title="About">
        <Text style={styles.text}>
          Made by students for students, Freebites is an app that alerts you
          guys of free food opportunities on campus to tackle food waste and
          insecurity.
        </Text>
        <Text style={styles.text}>
          We’d love to hear from you! If you have any questions, feedback, or
          want to get involved, please feel free to reach out.
        </Text>
        <Text style={styles.text}>
          We’re committed to providing you with the best experience possible!
        </Text>
      </Dropdown>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: "4%",
    fontSize: 12,
    color: "#58565D",
    // textAlign: "justify",
  },
});

export default AboutSection;
