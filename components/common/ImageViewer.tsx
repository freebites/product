import { Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
	const imageSource = selectedImage
		? { uri: selectedImage }
		: placeholderImageSource;
	// TODO: add placeholder image, and also know number of items in carousel
	return (
		<Carousel
			width={320}
			height={288}
			style={{ borderRadius: 30, shadowRadius: 2 }}
			loop={false}
			data={selectedImage}
			renderItem={({ index }) => (
				<Image
					source={{ uri: selectedImage[index] }}
					style={styles.image}
				/>
			)}
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
export function CardImageViewer({ placeholderImageSource, selectedImage }) {
	const imageSource = selectedImage
		? { uri: selectedImage }
		: placeholderImageSource;
	// TODO: add placeholder image, and also know number of items in carousel
	return (
		<Carousel
			width={320}
			height={420}
			loop={false}
			data={selectedImage}
			renderItem={({ index }) => (
				<Image
					source={{ uri: selectedImage[index] }}
					style={styles.image}
				/>
			)}
		/>
	);
}
