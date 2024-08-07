import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import SearchModal from "./SearchModal";
import { COLORS } from "../../constants";
import SearchOptions from "../../assets/icons/search-options";
import SearchLocation from "../../assets/icons/search-location";

// constants
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

// get screen dimensions for the overlay
const overlayStyle = {
  width: Dimensions.get("window").width, // Set overlay width to screen width
  height: Dimensions.get("window").height, // Set overlay height to screen height
};

const SearchFilterIcon = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  const [isPressed, setIsPressed] = useState(false);

  return (
    <View>
      <Pressable
        style={styles.RightComponent}
        onPress={handlePresentModalPress}
        onPressIn={() => setIsPressed(true)} // Set isPressed to true when press starts
        onPressOut={() => setIsPressed(false)} // Reset isPressed when press ends
      >
        <View style={styles.verticleLine}></View>
        <View style={[styles.stretch, { opacity: isPressed ? 0.25 : 1 }]}>
          <SearchOptions/>
        </View>
        <SearchModal ref={bottomSheetModalRef} />
      </Pressable>
    </View>
  );
};

const SearchIcon = () => {
  return (
    <View style={styles.LeftComponent}>
      <SearchLocation/>
    </View>
  );
};

interface HomeSearchBarProps {
  onSelected?: () => void;
  onLocationFound?: () => void;
  onPress: (
    details: {
      lat: string | number;
      lng: string | number;
    } | null
  ) => void;
}
const HomeSearchBar = (props: HomeSearchBarProps) => {
  const { onSelected, onLocationFound, onPress } = props;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const handleChangeText = (text: string) => {
    // Update local state on text change
    setSearchQuery(text);
    if (text === "" && checked == false) {
      onPress(null); // Send an "empty" parameter if text is cleared
      setChecked(true);
    } else if (text != "" && checked == true) {
      setChecked(false);
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <SafeAreaView style={styles.searchBarContainer}>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Search location"
          onPress={async (data, details) => {
            // 'details' is provided when fetchDetails = true
            const coords = data === null ? null : details?.geometry.location;
            onPress(coords ?? null);
            // props.onLocationFound();
          }}
          query={{
            key: `${apiKey}`,
            language: "en",
          }}
          onFail={(error) => {
            console.log(error);
          }}
          requestUrl={{
            useOnPlatform: "web",
            url: "https://maps.googleapis.com/maps/api",
          }}
          styles={styles}
          textInputProps={{
            onSubmitEditing: () => {
              if (searchQuery === "") {
                onPress(null); // Send an "empty" parameter if "return" is hit with an empty query
              }
            },
            onFocus: onSelected ? () => onSelected() : () => setIsFocused(true),
            // do nothing if it doesn't exist loldd
            onBlur: () => {
              setIsFocused(false);
            },
            onChangeText: (text) => {
              handleChangeText(text);
            },
            placeholderTextColor: COLORS.neutral[50],
            clearButtonMode: "never",
          }}
          enablePoweredByContainer={false}
          renderRightButton={() => <SearchFilterIcon />}
          renderLeftButton={() => <SearchIcon />}
          fetchDetails={true}
        />
      </SafeAreaView>
      {isFocused && (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsFocused(false);
            ref.current?.blur();
          }}
        >
          <View style={[styles.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 21,
    zIndex: 10,
    overflow: "visible",
    height: 42,
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0, // Ensure the overlay is behind the autocomplete options
  },
  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 999,
    width: "92%",
  },
  textInput: {
    height: 42,
    borderRadius: 0,
    color: "#5d5d5d",
    fontSize: 16,
    borderWidth: 0,
  },
  predefinedPlacesDescription: {
    color: "#1faadb",
  },
  listView: {
    top: 60,
    zIndex: 100,
    borderRadius: 10,
    position: "absolute",
    color: "black",
    backgroundColor: "white",
    width: "92%",
  },
  separator: {
    flex: 1,
    backgroundColor: "blue",
  },
  description: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 14,
    maxWidth: "89%",
  },
  stretch: {
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
  searchIcon: {
    resizeMode: "contain",
    height: 20,
    width: 20,
    left: 16,
    top: 9,
    position: "absolute",
    zIndex: 10,
  },
  RightComponent: {
    backgroundColor: "white",
    height: 42,
    width: 42,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 35,
    gap: 19,
  },
  LeftComponent: {
    backgroundColor: "white",
    height: 42,
    width: 42,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    paddingLeft: 18,
  },
  searchBarContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  verticleLine: {
    height: "70%",
    width: 1,
    backgroundColor: COLORS.neutral[50],
  },
});

export default HomeSearchBar;
