import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';

const AllRestaurents = () => {

	return (
        <>
        <View style={styles.headerview}>
						<Text style={styles.subtitle1}>--- All Restaurents ---</Text>
					</View> 
        </>
	);
};

const styles = StyleSheet.create({
    subtitle1: {
        fontSize: 20,
        // marginTop: ,
		color: '#333',
		marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        textAlign: 'center',
        
    },
    
    headerview: {
        elevation: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#ffff",
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 5,
    },
});

export default AllRestaurents;
