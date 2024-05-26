import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

// helper function for word counting

const Description = (props: { onTextChange: (text: string) => void }) => {
  const [value, setValue] = useState("");
  const [wordCount, setWordCount] = useState<number>(0);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Eg. Big macs, fries, and nuggets from TUSC event."
        placeholderTextColor="#A8A7A6"
        multiline
        numberOfLines={4}
        maxLength={250}
        style={styles.input}
        onChangeText={(text) => {
          setValue(text);
          setWordCount(text.length);
          props.onTextChange(text);
        }} // add description update later
        // onChangeText={(text) => {
        // 	handleUpdateDesc(text);
        // }}
        // value={postData.description}
      ></TextInput>

      <Text
        style={{
          fontSize: 10,
          color: "lightgrey",
          textAlign: "right",
          position: "absolute",
          right: 30,
          bottom: 10,
        }}
      >
        {wordCount}/250
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: "100%",
    marginTop: 9,
    marginBottom: 64,
  },
  input: {
    height: 147,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.40)",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 17,
  },
});

export default Description;
