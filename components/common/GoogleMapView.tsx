import { Dimensions, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function GoogleMapView(props: { disabled?: boolean }) {
	const screenWidth = Dimensions.get("window").width;
	const isWeb = Platform.OS === "web";
	return (
		!props.disabled && (
			<MapView
				style={{ width: screenWidth, height: screenWidth * 1.15 }}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: 42.40711,
					longitude: -71.11355,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				showsUserLocation={true}
			></MapView>
		)
	);
}
