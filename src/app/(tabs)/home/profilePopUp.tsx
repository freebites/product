import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { globalStyles } from "@components/global";
import UserProfileCard from "@components/home/UserProfileCard";

export const profilePopUp = () => {
  let params = useLocalSearchParams();

  // cast as string
  const userid = params.id as string;

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.cardbox}>
        <UserProfileCard id={userid} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardbox: {
    height: 650,
    width: 345,
  },
});

export default profilePopUp;
