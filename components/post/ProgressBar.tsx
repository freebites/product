// Example using Animated API
import React, { useContext, useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { PostContext } from "../../context/postContext";
const ProgressBar = ({ currentStep }) => {
	const { progress, updateProgress } = useContext(PostContext);
	const currProgress = new Animated.Value(0);
	useEffect(() => {
		updateProgress(currentStep); // Assuming updateProgress sets the context value
	}, [currentStep, updateProgress]);
	useEffect(() => {
		Animated.timing(currProgress, {
			toValue: (progress / 4) * 100,
			duration: 500,
			useNativeDriver: false,
		}).start();
	}, [progress, currProgress]);

	return (
		<View>
			<Text>{`Progress: ${JSON.stringify(currProgress)}%`}</Text>
			<Text>{`step: ${progress}`}</Text>
			{/* Render your actual animated progress bar UI here */}
		</View>
	);
};

export default ProgressBar;
