import { Image, Platform, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function ImageViewer(props: {
	placeholderImageSource;
	selectedImage;
	disabled?: boolean;
}) {
	const imageSource = props.selectedImage
		? { uri: props.selectedImage }
		: props.placeholderImageSource;
	// TODO: add placeholder image, and also know number of items in carousel
	return (
		!props.disabled && (
			<Carousel
				width={320}
				height={288}
				style={{ borderRadius: 30, shadowRadius: 2 }}
				loop={false}
				data={props.selectedImage}
				renderItem={({ index }) => (
					<Image
						source={{ uri: props.selectedImage[index] }}
						style={styles.image}
					/>
				)}
			/>
		)
	);
}

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

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
	shadows: {
		...Platform.select({
			ios: {
				shadowColor: "rgba(0, 0, 0, 0.15)",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.15,
				shadowRadius: 6,
			},
			android: {
				elevation: 2,
			},
		}),
	},
});
