import { View, Text, Image } from "react-native";
import { styled } from "styled-components/native";
import { router } from "expo-router";
import { globalStyles } from "../global";

const placeholder = require("../../assets/icons/freebites/placeholder.png");
const HeaderUI = styled.View`
  width: 100%;
  padding-top: 60px;
  background-color: #f0e1d2;
  position: absolute;
`;

const HeaderTextUI = styled.View`
  width: 100%;
  padding-horizontal: 10px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
function PrevPage() {
  router.back();
}

const EditProfileHeader = (props) => {
  const { isEditing } = props;
  return (
    <HeaderUI>
      <HeaderTextUI>
        <Text style={globalStyles.text} onPress={() => PrevPage()}>
          Cancel
        </Text>

        <Text style={[globalStyles.text, { fontSize: 20, fontWeight: "bold" }]}>
          Edit Profile
        </Text>

        <Text style={globalStyles.text}>Done</Text>
      </HeaderTextUI>
    </HeaderUI>
  );
};

export default EditProfileHeader;
