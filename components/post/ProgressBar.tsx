// Example using Animated API
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { PostContext } from "../../context/postContext";
import { useFocusEffect } from "expo-router";
import { COLORS } from "../../constants";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
	useDerivedValue,
	interpolate,
	interpolateColor,
	withSpring,
	runOnJS,
} from "react-native-reanimated";
const ProgressBar = () => {
	const { progress, updateProgress } = useContext(PostContext);

	const bar1Progress = useSharedValue(progress >= 1 ? 100 : 0);
	const bar2Progress = useSharedValue(progress >= 2 ? 100 : 0);
	const bar3Progress = useSharedValue(progress >= 3 ? 100 : 0);

	const [circle1, setCircle1] = useState(progress >= 1 ? true : false);
	const [circle2, setCircle2] = useState(progress >= 2 ? true : false);
	const [circle3, setCircle3] = useState(progress >= 3 ? true : false);
	useFocusEffect(() => {
		if (progress >= 1) {
			bar1Progress.value = 100;
		} else {
			bar1Progress.value = 0;
		}

		if (progress >= 2) {
			bar2Progress.value = 100;
		} else {
			bar2Progress.value = 0;
		}

		if (progress >= 3) {
			bar3Progress.value = 100;
		} else {
			bar3Progress.value = 0;
		}
	});

	useEffect(() => {
		if (progress >= 1) {
			bar1Progress.value = 100;
		} else {
			bar1Progress.value = 0;
			setCircle1(false);
		}

		if (progress >= 2) {
			bar2Progress.value = 100;
		} else {
			bar2Progress.value = 0;
			setCircle2(false);
		}

		if (progress >= 3) {
			bar3Progress.value = 100;
		} else {
			bar3Progress.value = 0;
			setCircle3(false);
		}
	}, [progress]);

	const config = {
		duration: 750,
		easing: Easing.bezier(0.5, 0.01, 0, 1),
	};

	const barStyle = (barProgress) => {
		return useAnimatedStyle(() => {
			const backgroundColor = withTiming(
				interpolateColor(
					barProgress.value,
					[0, 1],
					["green", "orange"]
				),
				config
			);

			return {
				backgroundColor,
			};
		});
	};
	const circleAnimation = (circleProgress) => {
		return useAnimatedStyle(() => {
			return {
				transform: [
					{
						translateX: withTiming(
							interpolate(
								circleProgress.value,
								[0, 100],
								[-26, 0]
							),
							config
						),
					},
				],
			};
		});
	};

	const style = (barProgress) =>
		useAnimatedStyle(() => {
			return {
				width: withTiming(bar1Progress.value, config),
			};
		});

	const nestedViewStyle = (barProgress, circleProgress) => {
		const onFinish = () => {
			if (barProgress.value == 100) {
				circleProgress(true);
			}
		};
		return useAnimatedStyle(() => {
			// const translateX = interpolate(
			// 	barProgress.value,
			// 	[0, 1],
			// 	[-100, 100]
			// );

			return {
				transform: [
					{
						translateX: withTiming(
							interpolate(barProgress.value, [0, 100], [-26, 0]),
							config,
							() => {
								runOnJS(onFinish)();
							}
						),
					},
				],
			};
		});
	};

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.barContainer]}>
				<Animated.View
					style={[
						styles.circle,
						{ backgroundColor: COLORS.orange[70] },
					]}
				></Animated.View>
				<View style={styles.bar}>
					<Animated.View
						style={[
							styles.completeBar,
							nestedViewStyle(bar1Progress, setCircle1),
						]}
					></Animated.View>
				</View>
				<View
					style={[
						styles.circle,
						{
							backgroundColor: circle1
								? COLORS.orange[70]
								: COLORS.green[20],
						},
					]}
				></View>
				<View style={styles.bar}>
					<Animated.View
						style={[
							styles.completeBar,
							nestedViewStyle(bar2Progress, setCircle2),
						]}
					></Animated.View>
				</View>
				<View
					style={[
						styles.circle,
						{
							backgroundColor: circle2
								? COLORS.orange[70]
								: COLORS.green[20],
						},
					]}
				></View>
				<View style={styles.bar}>
					<Animated.View
						style={[
							styles.completeBar,
							nestedViewStyle(bar3Progress, setCircle3),
						]}
					></Animated.View>
				</View>
				<View
					style={[
						styles.circle,
						{
							backgroundColor: circle3
								? COLORS.orange[70]
								: COLORS.green[20],
						},
					]}
				></View>
			</Animated.View>
		</View>
	);
};

// const animatedProgress = useDerivedValue(() => currProgress.value);
// return (
// 	<View>
// 		<Animated.Text>{`Progress: ${animatedProgress.value}%`}</Animated.Text>
// 		<Text>{`step: ${progress}`}</Text>
// 		<Button
// 			title="toggle"
// 			onPress={() => {
// 				currProgress.value = Math.random() * 350;
// 			}}
// 		/>
// 		{/* Render your actual animated progress bar UI here */}
// 	</View>
// );
// };

const styles = StyleSheet.create({
	container: {
		width: "50%",
		height: 70,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		gap: 0,
	},
	barContainer: {
		width: 100,
		height: 50,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 0,
	},
	barContainer2: {
		width: 100,
		height: 80,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	circle: {
		width: 9,
		height: 9,
		borderRadius: 4.5,
		backgroundColor: COLORS.green[20],
	},
	bar: {
		height: 4,
		width: 26,
		marginHorizontal: -2,
		backgroundColor: COLORS.green[20],
		overflow: "hidden",
	},
	completeBar: {
		height: 4,
		width: 26,
		marginHorizontal: -2,
		backgroundColor: COLORS.orange[70],
	},
});
export default ProgressBar;
