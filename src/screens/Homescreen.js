import { StyleSheet,Text,View,StatusBar,TextInput ,ScrollView, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNavbar from '../components/HomeHeadNavbar'
import CategoriesSection from '../components/CategoriesSection'
import Slider from '../components/Slider'
import { AntDesign } from '@expo/vector-icons';
import AllRestaurents from '../components/AllRestaurents'
import {firebase} from '../../firebase/firebaseConfig';
import 'firebase/firestore';
import CardSlider from '../components/CardSlider'
import BottomNavbar from '../components/BottomNavbar'

const Homescreen = ({navigation}) => {
  const [foodData, setFoodData] = useState([]);
    const [VegData, setVegData] = useState([]);
    const [NonVegData, setNonVegData] = useState([]);
    const [resname, setresname] = useState([]);
    const [restname, setrestname] = useState([]);


    const foodRef = firebase.firestore().collection('foodData');

    useEffect(() => {
        foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
        }
        )
    }, [])

    useEffect(() => {
        setVegData(foodData.filter((item) => item.foodType == 'veg'))
        setNonVegData(foodData.filter((item) => item.foodType == 'non-veg'))
        setresname(foodData.filter((item) => item.restaurentName == 'Ram Restaurent'))
        setrestname(foodData.filter((item) => item.restaurentName == 'Shyam Restaurent'))

        // setVegPaneer(foodData.filter,where(foodData, '==', '%paneer%'))

        
    },[foodData])
    // console.log(VegData) 
    // console.log(NonVegData)
        // console.log(VegPaneer)


    const[search,setSearch]=useState('');

// console.log(search)
  return (
    <>
    <View style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <StatusBar></StatusBar>
        <HomeHeadNavbar navigation={navigation} ></HomeHeadNavbar>

        <View style={styles.bottomnavbar}>
        <BottomNavbar navigation={navigation} ></BottomNavbar>
        </View>
        
        <ScrollView>
        <View style={styles.searchbox}>
        <AntDesign name="search1" size={30} color="black" style={styles.searchicon} />
          <TextInput placeholder='Search' style={styles.inputtext} onChangeText={(text) => {setSearch(text)}}></TextInput>
        </View>
        
        {search != '' && 
        <View style={styles.searchresultouter}>
          <FlatList style={styles.searchresultsinner} 
          data={foodData}
          renderItem={({item}) => {
            if(item.foodName.toLowerCase().includes(search.toLocaleLowerCase())) {
              return(
                <View style={styles.searchresult}>
                  <AntDesign name='arrowright' size={24} color="black" />

                  <Text style={styles.searchresulttext}>{item.foodName}</Text>
                </View>
              )
            }
          }}
          />
        </View>
        }
        <CategoriesSection></CategoriesSection>
        <Slider></Slider>
        <AllRestaurents></AllRestaurents>
        <CardSlider title={"--- Ram Restaurent ---"} data={resname} navigation={navigation} ></CardSlider>
        <CardSlider title={"--- Shyam Restaurent ---"} data={restname} navigation={navigation} ></CardSlider>
        <CardSlider title={"--- FEATURED ---"} data={foodData} navigation={navigation} ></CardSlider>
        <CardSlider title={"--- NON-VEG ---"} data={NonVegData} navigation={navigation} ></CardSlider>
        <CardSlider title={"--- VEG ---"} data={VegData} navigation={navigation} ></CardSlider>

        {/* <CardSlider title={"--- PANEER ITEMS ---"} data={VegPaneer} ></CardSlider> */}
        </ScrollView>
        
    </View>
    
    
    
    </>
  )
}
const styles=StyleSheet.create({
  
  container: {
    flex: 1,
    // alignItems: 'center',
    width: '100%',
  },
  searchbox: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#ffff',
    borderRadius: 30,
    padding: 10,
    margin: 20,
    elevation: 10,
  },
  inputtext: {
    marginLeft: 10,
    width: '90%',
    fontSize: 15,
    color: '#5D6D7E',
  },
  searchresultouter: {
    width: 'auto',
    marginHorizontal: 30,
    height: 'auto',
    backgroundColor: '#FEF9E7',
  },
  searchresultsinner: {
    width: 'auto',
  },
  searchresult: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: 'grey',
  },
  bottomnavbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    zIndex: 20,
  },
})
export default Homescreen