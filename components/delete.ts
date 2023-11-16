import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import axios from 'axios';

const deleteOne = async (itemID) => {

        try {
                console.log(itemID)
                const response = await axios.delete(`http://localhost:3001/api/Posts/${itemID}`);
                console.log('Item deleted successfully:', response.data);
        } catch (error) {
                // throw error;
                console.error('Error deleting item IN FRONTEND  :', error);
        }
                
};

export default deleteOne;