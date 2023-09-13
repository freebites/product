import { View, Text } from "react-native";
import { styled } from "styled-components/native";
import { router } from "expo-router";
import { globalStyles } from "../global";

const HeaderUI = styled.View`
	width: 100%;
	height: 41%;
	background-color: #f0e1d2;
	border-bottom-left-radius: 30px;
	border-bottom-right-radius: 30px;
`;

const HeaderTextUI = styled.View`
	width: 100%;
	flex-direction: row;
`;
function PrevPage() {
	router.back();
}
const EditProfileHeader = () => {
	return (
		<HeaderUI>
			<HeaderTextUI>
				<Text style={globalStyles.text} onPress={() => PrevPage()}>
					Cancel
				</Text>

				<Text style={globalStyles.headerText}>Edit Profile</Text>

				<Text style={globalStyles.text}>Done</Text>
			</HeaderTextUI>
		</HeaderUI>
	);
};

export default EditProfileHeader;
