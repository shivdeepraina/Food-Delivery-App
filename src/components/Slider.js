import { StyleSheet, Text, View ,Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper'

const carouseldata=[
    {
        id: 1,
        image: '../../assets/backgroundimage.jpg',
    },
    {
        id: 2,
        image: '../../assets/background2.jpg',
    },
    {
        id: 3,
        image: '../../assets/background3.jpg',
    }
]



const Slider = () => {
  return (
    <View>
      <View style={styles.slider}>
        <Swiper autoplay={true} autoplayTimeout={5} showsButtons={true} dotColor='#ffff' activeDotColor='#BA4A00' nextButton={<Text style={styles.buttontext}><AntDesign name="arrowright" size={24} color="black" /></Text>} prevButton={<Text style={styles.buttontext}><AntDesign name="arrowleft" size={24} color="black" /></Text>} >
            <View style={styles.slides}>
                <Image source={require('../../assets/backgroundimage.jpg')} style={styles.image} />
            </View>
            
            <View style={styles.slides}>
                <Image source={require('../../assets/background2.jpg')} style={styles.image} />
            </View>

            <View style={styles.slides}>
                <Image source={require('../../assets/background3.jpg')} style={styles.image} />
            </View>
        </Swiper>
      </View>
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
    slider: {
        width: '100%',
        height: 200,
        backgroundColor: "#ffff",
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    slides: {
        width: '100%',
        height: 200,
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },

    buttontext: {
        color: '#212F3C',
        fontSize: 40,
        fontWeight: '500',
        backgroundColor: 'white',
        borderRadius: 20,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
    }
})