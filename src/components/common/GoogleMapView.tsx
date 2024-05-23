import React, { forwardRef } from "react";
import { Dimensions, Platform } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";

interface GoogleMapViewProps {
  disabled?: boolean;
  coordinates?: { lat: number; lng: number };
}
const GoogleMapView = forwardRef<MapView, GoogleMapViewProps>((props, ref) => {
  const screenWidth = Dimensions.get("window").width;
  const { disabled, coordinates } = props;

  return (
    // issue with rendering initial so i have it wait to render until
    // coordinates are set with setState
    coordinates != null &&
    !disabled && (
      <MapView
        ref={ref}
        style={{
          width: screenWidth,
          height: screenWidth * 1,
          zIndex: 9,
        }}
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        initialRegion={{
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {/* based off of coordinates */}
        <Marker
          coordinate={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          }}
        ></Marker>
      </MapView>
    )
  );
});

export default GoogleMapView;
