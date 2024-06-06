import React from 'react'
import { StyleSheet,Text,View,ScrollView } from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons'

const Categories = () => {
  return (
    <>
      <View style={styles.conatiner} >
        <Text style={styles.head}>Categories</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.box}>
          <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" style={styles.icons} />
          <Text style={styles.text}>Starters</Text>
          </View>
          {/* style={styles.icons} */}
          <View style={styles.box}>
          <MaterialIcons name="dinner-dining" size={24} color="black" style={styles.icons} />
          <Text style={styles.text}>Dinners</Text>
          </View>

          <View style={styles.box}>
          <MaterialCommunityIcons name="noodles" size={24} color="black" style={styles.icons} />
          <Text style={styles.text}>Breakfast</Text>
          </View>

          <View style={styles.box}>
          <MaterialCommunityIcons name="cupcake" size={24} color="black" style={styles.icons} />
          <Text style={styles.text}>Deserts</Text>
          </View>

        </ScrollView>





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

  box: {
    backgroundColor: '#ffff',
    elevation: 20,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  icons: {
    marginRight: 10,
    color: '#17202A',
  }

})

export default Categories