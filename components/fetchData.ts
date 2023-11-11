import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import axios from 'axios';


const Database = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.247.25.36:3001/api/Posts');
        console.log("Network request to get data was successful", response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();
  }, []);


  return data;
    
    // <View>
    //   {/* <Text>Title: {data[0].title} </Text> */}

    //   {data.map((item) => (
    //     <View key={item._id}>
    //       <Text>Title: {item.title}</Text>
    //       <Text>Description: {item.description}</Text>
    //     </View>
    //   ))} 


    // </View>
  
};


export default Database;