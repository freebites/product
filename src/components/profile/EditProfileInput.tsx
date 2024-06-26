import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';


interface EditProfileInputProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  validate?: (text: string) => string | null;
  multiline?: boolean;
  options?: string[];
}

const EditProfileInput = (props: EditProfileInputProps) => {
  const { title, multiline, value, onChangeText, validate, options } = props;
  const [error, setError] = useState<string | null>(null);

  const handleChangeText = (text: string) => {
    if (validate) setError(validate(text));
    onChangeText(text);
  };

  const handleDropdownChange = (itemValue: string) => {
    if (validate) setError(validate(itemValue));
    onChangeText(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#9e9797", fontSize: 20 }}>{title}</Text>
      {options ? (
        <View style={styles.textInput}>
          <RNPickerSelect
            onValueChange={handleDropdownChange}
            items={options.map(option => ({
              label: option,
              value: option.toLowerCase(),
            }))}
            value={value}
          />
        </View>
      ) : (
        <TextInput
          style={[
            styles.textInput,
            error ? { borderBottomColor: "red" } : { borderBottomColor: "#9e9797" },
          ]}
          multiline={multiline}
          value={value}
          onChangeText={handleChangeText}
        />
      )}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  textInput: {
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#9e9797",
    opacity: 0.5,
    padding: "5%",
    width: "70%",
    fontSize: 17,
    minWidth: 200,
  }
});

export default EditProfileInput;
