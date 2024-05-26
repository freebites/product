import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface ImageViewerProps {
  placeholderImageSource: string;
  selectedImage: string[];
  disabled?: boolean;
}
const defaultWidth = 317;
const defaultHeight = 288;
export default function ImageViewer(props: ImageViewerProps) {
  const { placeholderImageSource, selectedImage, disabled } = props;

  // TODO: add placeholder image, and also know number of items in carousel
  return (
    !disabled && (
      <View style={styles.container}>
        <Carousel
          width={defaultWidth}
          height={defaultHeight}
          style={{
            borderRadius: 30,
          }}
          loop={false}
          data={props.selectedImage}
          renderItem={({ index }) => (
            <Image
              source={{ uri: props.selectedImage[index] }}
              style={styles.image}
            />
          )}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  container: {
    height: defaultHeight,
    width: defaultWidth,
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
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
