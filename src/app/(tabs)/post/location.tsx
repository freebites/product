import { Link, router, useFocusEffect } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";

import ImageViewer from "@components/common/ImageViewer";

import { PostContext } from "@context/postContext";
import { postStyles } from "./styles/postStyles";
import { Text, SafeAreaView, View, TextInput, StyleSheet } from "react-native";
import PlacesSearchBar from "@components/common/PlacesSearchBar";
import GoogleMapView from "@components/common/GoogleMapView";
import MapView from "react-native-maps";
import { getGeolocationWithPlaceID } from "@api/util/maps";
import ProgressBar from "@components/post/ProgressBar";
import RectangleOrangeButton from "@components/common/RectangleOrangeButton";
const placeholder = require("../../../assets/images/kemal.jpg");

interface latlong {
  lat: number;
  lng: number;
}

/*
 * screen for adding location to the post
 */
export default function location() {
  const [mapSelected, setMapSelected] = useState(false);
  // the prop GoogleMapView takes in is the opposite of locationSelected, just
  // intuitively makes more sense to code this way
  const [locationSelected, setLocationSelected] = useState(false);
  const [coordinates, setCoordinates] = useState<latlong>({ lat: 0, lng: 0 });
  // onPress --> grab the location input into a
  const mapRef = useRef<MapView | null>(null);
  useFocusEffect(() => {
    mapSelected ? updateProgress(4) : updateProgress(2);
  });

  useEffect(() => {
    mapSelected ? updateProgress(4) : updateProgress(2);
  }, [mapSelected]);
  /* context specific functions */
  const { progress, updateProgress, postData, updatePostData } =
    useContext(PostContext);

  // handler for updating location
  const handleUpdateLocation = (place_id: string, lat: number, lng: number) => {
    updatePostData({
      location: {
        ...postData.location,
        place_id: place_id,
        location: {
          ...postData.location.location,
          coordinates: [lng, lat],
        },
      },
    });
  };

  // handler to update room number
  const handleUpdateRoom = (room: string) => {
    updatePostData({ ...postData, room: room });
  };
  const changeLocation = async (place_id: string) => {
    const geolocation = await getGeolocationWithPlaceID(place_id);
    mapRef.current?.animateToRegion({
      latitude: geolocation.location.lat,
      longitude: geolocation.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    setCoordinates({
      lat: geolocation.location.lat,
      lng: geolocation.location.lng,
    });

    handleUpdateLocation(
      place_id,
      geolocation.location.lat,
      geolocation.location.lng
    );
  };

  return (
    <SafeAreaView style={postStyles.container}>
      <ProgressBar />
      <ImageViewer
        placeholderImageSource={placeholder}
        selectedImage={postData.imageURIs}
        disabled={mapSelected}
      />
      <View
        style={[
          postStyles.sectionContainer,
          { marginHorizontal: 0, marginTop: 25, width: "75%" },
        ]}
      >
        {!mapSelected && (
          <Text style={postStyles.pageHeader}>Where is the food?</Text>
        )}
      </View>

      <PlacesSearchBar
        onSelected={() => {
          setMapSelected(true);
          updateProgress(4);
        }}
        onLocationFound={() => {
          setLocationSelected(true);
        }}
        onPress={(place_id: string) => {
          changeLocation(place_id);
        }}
      />
      {mapSelected && (
        <>
          <Text style={styles.text}>Room number/ Food location:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(room) => {
              handleUpdateRoom(room);
            }}
          ></TextInput>
        </>
      )}

      <GoogleMapView
        ref={mapRef}
        disabled={!locationSelected}
        coordinates={coordinates}
      />
      <RectangleOrangeButton
        text="Next Step"
        // disabled={mapRef === null}
        onPress={() => {
          router.push("/post/reviewpost");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#485445",
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    borderRadius: 5,
    width: "66.7%",
    height: 28,
    marginBottom: 41,
  },
});
