import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../globals/style';
import { Feather } from '@expo/vector-icons';
const BottomNav = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <Text>BottomNav</Text> */}
            <View style={styles.btncon2}>
                <AntDesign name="home" size={30} color="black" style={styles.icon2} onPress={() => { navigation.navigate('homescreen') }} />

            </View>
            <View style={styles.btncon2} >
                <Ionicons name="search" size={30} color="black" style={styles.icon2} onPress={() => { navigation.navigate('home') }} />
            </View>
            <View style={styles.btncon2} >
                <AntDesign name="shoppingcart" size={30} color="black" style={styles.icon2} onPress={() => { navigation.navigate('cartscreen') }} />

            </View>
            <View style={styles.btncon2} >
            <Feather name="map-pin" size={24} color="black" style={styles.icon2} onPress={() => { navigation.navigate('trackorders') }} />
            </View>
        </View>
    )
}

export default BottomNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        elevation: 30,
        borderTopColor: colors.text1,
        borderTopWidth: 0.5,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    btncon1: {
        alignItems: 'center',
    },
    btncon2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        // top: 10,
        backgroundColor: 'white',
        width: 60,
        height: 60,
        elevation: 10,
        borderRadius: 60,
    },
    
    
})