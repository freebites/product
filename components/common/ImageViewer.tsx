import { Image, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
	const imageSource = selectedImage
		? { uri: selectedImage }
		: placeholderImageSource;
	// TODO: add placeholder image, and also know number of items in carousel
	return (
		<Carousel
			data={selectedImage}
			renderItem={({ item }) => (
				<Image source={{ uri: item }} style={styles.image} />
			)}
			sliderWidth={320}
			itemWidth={320}
		/>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
});
