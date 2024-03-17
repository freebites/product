import { View, Text, Image, Pressable } from "react-native";
import { styled } from "styled-components/native";
import { router } from "expo-router";
import { globalStyles } from "../global";

const placeholder = require("../../assets/icons/freebites/placeholder.png");
const left = require(" ../../../assets/icons/chevron-left.png");
const check = require(" ../../../assets/icons/check.png");
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
        <Pressable onPress={() => PrevPage()}>
          <Image source={left} />
        </Pressable>

        <Text style={[globalStyles.text, { fontSize: 20, fontWeight: "bold" }]}>
          Edit Profile
        </Text>

        <Image source={check} />
      </HeaderTextUI>
    </HeaderUI>
  );
};

export default EditProfileHeader;
