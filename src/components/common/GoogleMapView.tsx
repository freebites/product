import { forwardRef } from "react";
import { Dimensions, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

function GoogleMapView(props: { disabled?: boolean; coordinates?: any }, ref) {
	const screenWidth = Dimensions.get("window").width;

	return (
		// issue with rendering initial so i have it wait to render until
		// coordinates are set with setState
		props.coordinates != null &&
		!props.disabled && (
			<MapView
				ref={ref}
				style={{
					width: screenWidth,
					height: screenWidth * 1,
					zIndex: 9,
				}}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: props.coordinates.lat,
					longitude: props.coordinates.lng,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
				showsUserLocation={true}
			>
				{/* based off of coordinates */}
				<Marker
					coordinate={{
						latitude: props.coordinates.lat,
						longitude: props.coordinates.lng,
					}}
				></Marker>
			</MapView>
		)
	);
}

export default forwardRef(GoogleMapView);
