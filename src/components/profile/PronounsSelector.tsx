import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { PronounsOptions } from "../../utils";

interface PronounSelectorProps {
  value: string[];
  onChange: (selectedPronouns: string[]) => void;
  validate?: (selectedPronouns: string[]) => string | null;
}

const PronounSelector = (props: PronounSelectorProps) => {
  const { value, onChange, validate } = props;
  const [selectedPronouns, setSelectedPronouns] = useState<string[]>(
    value || []
  );
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const options = PronounsOptions;
  
  useEffect(() => {
    if (validate) {
      setError(validate(selectedPronouns));
    }
  }, [selectedPronouns, validate]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    if (text) {
      const filteredSuggestions = options.filter(
        (pronoun) =>
          pronoun.toLowerCase().includes(text.toLowerCase()) &&
          !selectedPronouns.includes(pronoun)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const addPronoun = (pronoun: string) => {
    const updatedPronouns = [...selectedPronouns, pronoun];
    setSelectedPronouns(updatedPronouns);
    setInputValue("");
    setSuggestions([]);
    if (onChange) {
      onChange(updatedPronouns);
    }
  };

  const removePronoun = (pronoun: string) => {
    const updatedPronouns = selectedPronouns.filter((p) => p !== pronoun);
    setSelectedPronouns(updatedPronouns);
    if (onChange) {
      onChange(updatedPronouns);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronouns:</Text>
      <TextInput
        style={[
          styles.input,
          error
            ? { borderBottomColor: "red" }
            : { borderBottomColor: "#9e9797" },
        ]}
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Type a pronoun"
      />
      {suggestions.length > 0 && (
        <ScrollView style={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion}
              style={styles.suggestionItem}
              onPress={() => addPronoun(suggestion)}
            >
              <Text>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <View style={styles.selectedContainer}>
        {selectedPronouns.map((pronoun: string) => (
          <View key={pronoun} style={styles.selectedPronoun}>
            <Text style={styles.selectedText}>{pronoun}</Text>
            <TouchableOpacity onPress={() => removePronoun(pronoun)}>
              <Text style={styles.removeButton}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // maxWidth: 215,
    minWidth: 250,
    height: 250,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "#9e9797",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#9e9797",
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 17,
  },
  suggestions: {
    maxHeight: 150,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedPronoun: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#F0E1D2",
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedText: {
    color: "#9e9797",
    fontSize: 17,
    opacity: 0.7,
    marginRight: 5,
  },
  removeButton: {
    color: "#9e9797",
    opacity: 0.7,
    fontWeight: "bold",
  },
});

export default PronounSelector;
