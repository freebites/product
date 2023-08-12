import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const Home = () => {
    const data = [
        {
            "id" : "1", 
            "description" : "Pizza", 
            "location": "JCC 160", 
            "timePosted": "3 mins ago"
        }, 
        { 
            "id" : "2", 
            "description" : "Sandwiches", 
            "location" : "SEC lobby", 
            "timePosted" : "5 mins ago"
        }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Free Food Feed</Text>
            
            {/* Placeholder for Search */}
            <View style={styles.searchContainer}>
                <Text>Search...</Text>
            </View>

            {/* Placeholder for Filters */}
            <View style={styles.filterContainer}>
                <Text>Filters...</Text>
            </View>

            {/* Live Feed */}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.feedItem}>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <Text style={styles.itemLocation}>{item.location}</Text>
                        <Text style={styles.itemTime}>{item.timePosted}</Text>
                        <Button title="I'm coming!" onPress={() => alert('Alerted the poster!')} />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#EEE1D5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    searchContainer: {
        marginBottom: 10,
    },
    filterContainer: {
        marginBottom: 20,
    },
    feedItem: {
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    itemLocation: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    itemTime: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    }
});

export default Home;
