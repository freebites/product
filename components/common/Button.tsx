import { View, Text } from 'react-native'
import React from 'react';
import styled from 'styled-components/native';

const LoginButtonUI = styled.TouchableOpacity`
    border-radius: 100px;
    background: #EDA76E;
    display: flex;
    width: 80%;
    padding: 16px 32px;
    flex-direction: column;
    align-items: center;
    gap: 12px; 

`

const ButtonText = styled.Text`
    font-size: 13px;
`

const LoginButton = (props) => {
    return(
        <LoginButtonUI onPress={props.onPress}>
            <ButtonText>{props.text}</ButtonText>
        </LoginButtonUI>
    )
}
export default LoginButton;