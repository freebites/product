import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import { globalStyles } from "../global";
import ToggleOption from "./ToggleOption";
import BorderLine from "./BorderLine";
import { setItem } from "../../local-storage/asyncStorage";
import Dropdown from "./Dropdown";

const HelpSection = () => {
	const handlePress = () => {
		Linking.openURL('/profile/FAQ')
	}

  return (
    <View>
      <Dropdown title="Help">
				<Link href="/profile/FAQ" asChild>
          <TouchableOpacity>
            <View>
              <Text style={styles.subTitle}>FAQ</Text>
              <Text style={styles.text}>
                Reach out to Freebitesteam@gmail.com for further concerns or questions. Thank you!
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      </Dropdown>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#58565D",
  },
  text: {
    marginTop: "4%",
    fontSize: 12,
    color: "#58565D",
  },
});

export default HelpSection;
