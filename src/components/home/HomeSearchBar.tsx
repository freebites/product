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
  Text,
} from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import SearchModal from "./SearchModal";
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";
import { COLORS } from "../../constants";

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
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 6.75C3 6.33579 3.33579 6 3.75 6H20.25C20.6642 6 21 6.33579 21 6.75C21 7.16421 20.6642 7.5 20.25 7.5H3.75C3.33579 7.5 3 7.16421 3 6.75ZM3 12C3 11.5858 3.33579 11.25 3.75 11.25H20.25C20.6642 11.25 21 11.5858 21 12C21 12.4142 20.6642 12.75 20.25 12.75H3.75C3.33579 12.75 3 12.4142 3 12ZM11.25 17.25C11.25 16.8358 11.5858 16.5 12 16.5H20.25C20.6642 16.5 21 16.8358 21 17.25C21 17.6642 20.6642 18 20.25 18H12C11.5858 18 11.25 17.6642 11.25 17.25Z"
              fill="#0F172A"
            />
          </Svg>
        </View>
        <SearchModal ref={bottomSheetModalRef} />
      </Pressable>
    </View>
  );
};

const SearchIcon = () => {
  // const searchIcon = require("../../assets/icons/freebites/search.png");
  return (
    <View style={styles.LeftComponent}>
      <Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
        <G clip-path="url(#clip0_5998_3250)">
          <Path
            d="M12 8.5C12 10.1569 10.6569 11.5 9 11.5C7.34315 11.5 6 10.1569 6 8.5C6 6.84315 7.34315 5.5 9 5.5C10.6569 5.5 12 6.84315 12 8.5Z"
            stroke="#0F172A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            d="M16.5 8.5C16.5 15.6421 9 19.75 9 19.75C9 19.75 1.5 15.6421 1.5 8.5C1.5 4.35786 4.85786 1 9 1C13.1421 1 16.5 4.35786 16.5 8.5Z"
            stroke="#0F172A"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_5998_3250">
            <Rect width="18" height="21" fill="white" />
          </ClipPath>
        </Defs>
      </Svg>
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
    // paddingLeft: 50,
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
