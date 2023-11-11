import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import axios from 'axios';

const Update = (props) => {
        
        /* Create a new properties with existing item fields + updated item fields */
        if (props.title) {
                item.title = props.title
        }

        if (props.description) {
                item.description = props.description
        }

        if (props.tag) {
                item.tag = props.tag
        }

        if (props.location) {
                item.location = props.location
        }

        if (props.room) {
                item.room = props.room
        }

        if (props.postTime) {
                item.postTime = props.postTime
        }
        
        /* Create a new post with the new properties */ 
        updatedData = Create(newprops)

        if (props.itemId)
        try {
                const response = await axios.put(`http://130.64.64.67:5000/api/Posts/${props.itemId}`, updatedData); // Replace with your actual API endpoint
                // Handle the response or any further actions, such as updating your state.
                console.log('Item updated successfully:', response.data);
        } catch (error) {
                console.error('Error updating item:', error);
        }

        

        
};

export default Update;