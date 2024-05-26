import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

interface EditProfileInputProps {
  title: string;
  multiline?: boolean;
}
const EditProfileInput = (props: EditProfileInputProps) => {
  const { title, multiline } = props;
  return (
    <View style={styles.container}>
      <Text style={{ color: "#9e9797", fontSize: 20 }}>{title}</Text>
      <TextInput style={styles.textInput} multiline={multiline} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#505a4e",
    borderBottomWidth: 1,
    borderBottomColor: "#505a4e",
    opacity: 0.5,
    padding: "5%",
    width: "100%",
    fontSize: 17,
  },
  container: {
    maxHeight: "10%",
    width: "77.2%",
    flex: 1,
  },
});

export default EditProfileInput;
