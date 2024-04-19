import React from 'react';
import { View, Text, Image } from 'react-native';
const vegetarian = require('../../assets/icons/freebites/vegetarian.png');
const perishable = require('../../assets/icons/freebites/perishable.png');
const nonperishable = require('../../assets/icons/freebites/nonperishable.png');
const msg = require('../../assets/icons/freebites/msg.png');
const lactose = require('../../assets/icons/freebites/lactose.png');

const DisplayTags = (props) => {
    return (
        <View>
            {props.perishable ? <Image source={perishable} /> : null}
        </View>
    );
};

export default DisplayTags;