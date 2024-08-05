import React from "react";
import { View, Text, Image, Pressable, StyleSheet, TouchableOpacity} from "react-native";
import { router } from "expo-router";
import { globalStyles } from "../global";

const left = require("../../assets/icons/chevron-left.png");
const check = require("../../assets/icons/check.png");

function PrevPage() {
  router.back();
}

interface SubmitButtonProps {
  onSubmit: () => void; 
}

const EditProfileHeader: React.FC<SubmitButtonProps> = ({onSubmit}) => {
  return (
    <View style={styles.headerUI}>
      <View style={styles.headerTextUI}>
        <Pressable onPress={() => PrevPage()} style={{ height: 30, width: 30 }}>
          <Image source={left} />
        </Pressable>
        <Text style={globalStyles.headerText}>My Profile</Text>
        <TouchableOpacity onPress={onSubmit}>
          <Image source={check}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerUI: {
    width: "100%",
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#f0e1d2",
    position: "absolute",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 2,
  },
  headerTextUI: {
    width: "100%",
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default EditProfileHeader;
