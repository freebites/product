import React, { useMemo } from "react";
import {
  BottomSheetBackdropProps,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native";


const ModalBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables



  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(52, 52, 52, 0.8)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} />;
};

export default ModalBackdrop;
