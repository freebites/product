import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { styled } from "styled-components/native";
import { router } from "expo-router";
import { globalStyles } from "../global";

const placeholder = require("../../assets/icons/freebites/placeholder.png");
const left = require(" ../../../assets/icons/chevron-left.png");
const check = require(" ../../../assets/icons/check.png");
const HeaderUI = styled.View`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 30px;
  background-color: #f0e1d2;
  position: absolute;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  z-index: 2;
`;

const HeaderTextUI = styled.View`
  width: 100%;
  padding-horizontal: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
        <Text style={[globalStyles.headerText]}>My Profile</Text>
        <Image source={check} />
      </HeaderTextUI>
    </HeaderUI>
  );
};

const styles = StyleSheet.create({
  HeaderUI: {
    width: "100%",
    paddingTop: 60,
    backgroundColor: "#f0e1d2",
    position: "absolute",
  },
});

export default EditProfileHeader;
