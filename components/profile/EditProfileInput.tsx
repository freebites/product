import { Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

const LoginInputUI = styled.View`
  max-height: 10%;
  width: 77.2%;
  flex: 1;
`;

const StyledInput = styled.TextInput`
  color: #505a4e;
  border-bottom-width: 1px;
  border-bottom-color: #505a4e;
  opacity: 0.5;
  padding: 3%;
  width: 300px;
`;

const EditProfileInput = (props) => {
  return (
    <LoginInputUI>
      <Text style={{ color: "#9e9797", fontSize: 20 }}>{props.title}</Text>
      <StyledInput multiline={props.multiline} />
    </LoginInputUI>
  );
};

export default EditProfileInput;
