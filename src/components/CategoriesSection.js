import React, { useState } from 'react';
import { StyleSheet,Text,View,FlatList,TouchableOpacity,Image} from 'react-native'
import { Categories, COLOURS } from '../data/items';
import { FontAwesome } from '@expo/vector-icons';


const CategoriesSection = () => {


  const [currentSelected, setCurrentSelected] = useState(0);

  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setCurrentSelected(index)}
      >
        <View
          style={{
            width: 120,
            height: 180,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor:
              currentSelected == index ? COLOURS.accent : COLOURS.white,
            borderRadius: 20,
            margin: 10,
            elevation: 5,
          }}
        >
          <View style={{ width: 60, height: 60 }}>
            <Image
              source={item.image}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'center',
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: COLOURS.black,
              fontWeight: '600',
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              backgroundColor:
                currentSelected == index ? COLOURS.white : COLOURS.accentRed,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome
              name="angle-right"
              style={{
                fontSize: 12,
                color: currentSelected == index ? COLOURS.black : COLOURS.white,
              }}></FontAwesome>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.conatiner} >
        <Text style={styles.head}>Categories</Text>
        <FlatList
          horizontal={true}
          data={Categories}
          renderItem={renderCategories}
          showsHorizontalScrollIndicator={false}
        />

        





      </View>
    </>
  )
}

const styles=StyleSheet.create({
  conatiner: {
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "#ffff",
    // alignItems: 'center',
    width: '97%',
    margin: 5,
  },

  head: {
    color: '#D35400',
    fontSize: 25,
    fontWeight: '300',
    margin: 10,
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomColor: '#D35400',
    borderBottomWidth: 1,
  },

 

})

export default CategoriesSection;