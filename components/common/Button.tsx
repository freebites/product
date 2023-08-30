import { View, Text } from 'react-native'
import React from 'react';
import styled from 'styled-components/native';

const LoginButtonUI = styled.TouchableOpacity`
    border-radius: 100px;
    background: #EDA76E;
    display: flex;
    width: 343px;
    padding: 16px 32px;
    flex-direction: column;
    align-items: center;
    gap: 12px; 

`
const LoginButton = () => {
    return(
        <LoginButtonUI>
            hi
        </LoginButtonUI>
    )
}
export default LoginButton;