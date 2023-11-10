import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import axios from 'axios';

function readData (itemID: string) {
        /* Find the desired post via itemId then check which fields the client 
        wants */
        // return 5;
            try {
              return axios.get('http://10.247.25.36:3001/api/Posts')
              .then(res => {
              if (!res.ok) {
                throw new Error('Failed to fetch item');
              }
              console.log("Network request to get data was successful", response.data);
              return res;
              })
            } catch (error) {
              console.error('Error fetching data:', error);
            }

        

    
}

        // var toReturn;
        // for (var i = 0; i < data.length; i++) {
        //         if (data[i]._id == props.itemID) {
        //                 toReturn = data[i]
        //                 console.log("gets here")
        //                 break
        //         }
        // }

        // console.log(toReturn)


        // return (
        //         toReturn
                // {props.title ? showTitle}
                // if (props.title) {
                        
                // }
        
                // if (props.description) {
                //         item.description = props.description
                // }
        
                // if (props.tag) {
                //         item.tag = props.tag
                // }
        
                // if (props.location) {
                //         item.location = props.location
                // }
        
                // if (props.room) {
                //         item.room = props.room
                // }
        
                // if (props.postTime) {
                //         item.postTime = props.postTime
                // }

                // <Text> {toReturn.title} </Text>
                
        // );

        /* if unspecified display all fields */

export default readData;