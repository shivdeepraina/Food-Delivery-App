import React from 'react'
import { StyleSheet,Text,TouchableOpacity,View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const HomeHeadNavbar = ({navigation}) => {
  return (
    
    <View style={styles.container}>
        <Entypo name="location" size={30} color="black" style={styles.icons} />
      <Text style={styles.logo}>Food App</Text>
      <TouchableOpacity onPress={() => navigation.navigate('userprofile')} style={styles.profileContainer}>
    <Feather name="user" size={30} color="black" style={styles.icons} />
    
    </TouchableOpacity>
    </View>
  )
}


const styles=StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#E59866', // Adjust background color to match your app's theme
        borderBottomWidth: 1,
        borderBottomColor: '#eee', // Adjust border color to match your app's theme
      },
      logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white', // Adjust text color to match your app's theme
      },
      profileContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        // backgroundColor: '#f0f0f0', // Adjust background color to match your app's theme
        justifyContent: 'center',
        alignItems: 'center',
      },
      profileIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },

})

export default HomeHeadNavbar