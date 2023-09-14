import { View, Text, Image } from "react-native";
import { styled } from "styled-components/native";
import { router } from "expo-router";
import { globalStyles } from "../global";

const placeholder = require("../../assets/icons/freebites/placeholder.png");
const HeaderUI = styled.View`
	width: 100%;
	height: 41%;
	background-color: #f0e1d2;
	border-bottom-left-radius: 30px;
	border-bottom-right-radius: 30px;
`;

const HeaderTextUI = styled.View`
	margin-top: 10%;
	width: 100%;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
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

				<Text
					style={[
						globalStyles.text,
						{ fontSize: 20, fontWeight: "bold" },
					]}
				>
					Edit Profile
				</Text>

				<Text style={globalStyles.text}>Done</Text>
			</HeaderTextUI>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View style={{ alignItems: "center" }}>
					<Image
						source={placeholder}
						style={{ height: 90, width: 90, borderRadius: 10 }}
					/>
					<Text style={{ marginTop: 15, color: "#F95D25" }}>
						change profile photo
					</Text>
				</View>
			</View>
		</HeaderUI>
	);
};

export default EditProfileHeader;
