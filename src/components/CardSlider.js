import { FlatList, StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react'

const CardSlider = ({title,data,navigation}) => {

    // console.log(data);
    const openProductPage = (item) => {
        // console.log(item);
        navigation.navigate('productpage',item)
    }
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>{title}</Text>

      <FlatList style={styles.cardsout} 
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity key={item.index} onPress={() => {
            openProductPage(item)
        }}>
        <View style={styles.card}>
            <View style={styles.s1}>
                <Image source={{
                    uri: item.foodImageUrl
                }} style={styles.cardimgin}/>
            </View>

            <View style={styles.s2}>
                <Text  style={styles.txt1} >{item.foodName}</Text>
                
                <View style={styles.s2in}>
                <Text style={styles.txt2}>Rs.{item.foodPrice}/-</Text>

                

                {/* {} */}
                {item.foodType=='veg'? <Text style={styles.veg}></Text>: <Text style={styles.nonveg}></Text>}
            </View>
        </View>

        <View style={styles.s3}>
            <Text style={styles.buybtn}>
                Buy Now
            </Text>
        </View>
        </View>
        </TouchableOpacity>
    )} />
    </View>
  )
}

const styles = StyleSheet.create({
veg: {
    backgroundColor: 'green',
    width: 20,
    height: 20,
    marginTop: 5,
    borderRadius: 50,
},
nonveg: {
    backgroundColor: 'red',
    width: 20,
    marginTop: 5,

    height: 20,
    borderRadius: 50,
},
container: {
    marginVertical: 20,
    elevation: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#ffff",
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 5,
},
cardouthead: {
    color: '#707B7C',
    fontSize: 20,
    fontWeight: '400',
    marginTop: -10,
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: 20,
        // marginTop: ,
	color: '#333',
	marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',

},
cardsout: {
    width: '100%',
},
card: {
    width: 300,
    height: 300,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: 'white',
},
cardimgin: {
    width: '100%',
    height: 200,
    borderRadius: 10,
},

s2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
txt1:{
    fontSize: 18,
    color: 'black',
    marginTop: 5,
    marginHorizontal: 5,
    width: 150,
},
txt2:{
    fontSize: 18,
    color: 'grey',
    marginTop: 5,
    marginRight: 10,
},
s2in: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
},
s3: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 1,
    width: '100%',
},
buybtn: {
    backgroundColor: 'green',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
    textAlign: 'center',
}
})

export default CardSlider