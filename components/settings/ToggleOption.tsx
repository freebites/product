import { View, Text } from "react-native";
import React, { useState } from "react";
import { SettingsText } from "./styles";
import { styled } from "styled-components/native";
const SwitchStyle = styled.Switch`
	display: flex;
	width: 66px;
	height: 29px;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
`;

const ToggleUI = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin: 4% 0%;
`;
const ToggleOption = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	return (
		<ToggleUI>
			<SettingsText>ToggleOption</SettingsText>
			<SwitchStyle value={isEnabled} onValueChange={toggleSwitch} />
		</ToggleUI>
	);
};

export default ToggleOption;
