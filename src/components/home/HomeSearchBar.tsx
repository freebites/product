import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import {
  Image,
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
    <Pressable
      style={styles.RightComponent}
      onPress={handlePresentModalPress}
      onPressIn={() => setIsPressed(true)} // Set isPressed to true when press starts
      onPressOut={() => setIsPressed(false)} // Reset isPressed when press ends
    >
      <Image
        style={[styles.stretch, { opacity: isPressed ? 0.25 : 1 }]}
        source={require("../../assets/icons/freebites/filter.png")}
      />
      <SearchModal ref={bottomSheetModalRef} />
    </Pressable>
  );
};

const SearchIcon = () => {
  const searchIcon = require("../../assets/icons/freebites/search.png");
  return <Image source={searchIcon} style={styles.searchIcon} />;
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
      props.onPress(null); // Send an "empty" parameter if text is cleared
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
          placeholder="Search"
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
                props.onPress(null); // Send an "empty" parameter if "return" is hit with an empty query
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
    zIndex: -1, // Ensure the overlay is behind the autocomplete options
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
    paddingLeft: 50,
    borderRadius: 0,
    color: "#5d5d5d",
    fontSize: 16,
    borderWidth: 0,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
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
  },
  searchBarContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default HomeSearchBar;
