import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { navbtn, navbtnin ,hr80 ,incdecbtn, incdecinput,incdecout} from '../globals/style'
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../firebase/firebaseConfig'

const Productpage = ({navigation,route}) => {
    const data = route.params;
    // console.log(data)

    if(route.params===undefined){
        navigation.navigate('homescreen')
    }

    const [quantity,setQuantity] = useState('1');
    const [addonquantity,setAddonQuantity] = useState('0');


    const addtocart = () => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);

        const data1 = { data, Addonquantity: addonquantity, Foodquantity: quantity }
        // console.log(data1);

        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    cart: firebase.firestore.FieldValue.arrayUnion(data1)
                })
                console.log('Updated')
            } else {
                docRef.set({
                    cart: [data1]
                })
                console.log('Added')
            }
            alert('Added to cart')
        })

    }

    const increaseQuantity = () => {
        setQuantity((parseInt(quantity) + 1).toString())
    }
    const decreaseQuantity = () => {
        if (parseInt(quantity) > 1) {
            setQuantity((parseInt(quantity) - 1).toString())
        }
    }

    const increaseAddonQuantity = () => {
        setAddonQuantity((parseInt(addonquantity) + 1).toString())
    }
    const decreaseAddonQuantity = () => {
        if (parseInt(addonquantity) > 0) {
            setAddonQuantity((parseInt(addonquantity) - 1).toString())
        }
    }

    const cartdata1 = JSON.stringify({ cart: [{ Addonquantity: addonquantity, Foodquantity: quantity, data }] });
    console.log(cartdata1);
    
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('homescreen')}>
                <View style={navbtn}>

                <Ionicons name="arrow-back" size={24} color="black" style={navbtnin} />
                    
                </View>
            </TouchableOpacity>
            <View style={styles.container1}>
            <View style={styles.s1}>
                <Image source={{uri: data.foodImageUrl}} style={styles.cardimgin}/>
            </View>
            <View style={styles.s2}>
                <View style={styles.s2in}>
                    <Text style={styles.head1} >{data.foodName}</Text>
                    <Text style={styles.head2} >Rs.{data.foodPrice}/-</Text>
                </View>
                <View style={styles.s3} >
                <Text style={styles.head3} >About Food</Text>
                    <Text style={styles.head4} >{data.foodDescription}</Text>

                    <View style={styles.s3in} >
                    {data.foodType=='veg'? <Text style={styles.veg}></Text>: <Text style={styles.nonveg}></Text>} 
                    <Text style={styles.head5} >{data.foodType}</Text>
                    </View>

                </View>
                <View style={styles.container2} >
                <Text style={styles.txt1} >Location</Text>
                <Text style={styles.txt2} >{data.restaurentName}</Text>

                <View style={styles.container2in} >
                <Text style={styles.txt3} >{data.restaurentAddressBuilding}</Text>
                <View style={styles.dash}></View>
                <Text style={styles.txt3} >{data.restaurentAddressStreet}</Text>
                <View style={styles.dash}></View>
                <Text style={styles.txt3} >{data.restaurentAddressCity}</Text>
                <View style={styles.dash}></View>
                <Text style={styles.txt3} >{data.restaurentAddressPincode}</Text>
                </View>
                </View>


                {data.foodAddonPrice != ""  && 
                <View>
                    <View style={styles.container3} >
                    <Text style={hr80}></Text>
                    <Text style={styles.txt5} >Add Extra</Text>
                    <View style={styles.c3in}>
                    <Text style={styles.txt4} >{data.foodAddon}</Text>
                    <Text style={styles.txt4} >{data.foodAddonPrice}/-</Text>
                    </View>
                    <View style={incdecout}>
                    <Text style={incdecbtn} onPress={() => increaseAddonQuantity()}>+</Text>
                    <TextInput value={addonquantity}  style={incdecinput}/>
                    <Text style={incdecbtn} onPress={() => decreaseAddonQuantity()}>-</Text>
                </View>
                    </View>
                    
                </View>
                } 

                <View style={styles.container3} >
                <Text style={hr80}></Text>
                <Text style={styles.txt5} >Food Quantity</Text>
                <View style={incdecout}>
                    <Text style={incdecbtn} onPress={() => increaseQuantity()}>+</Text>
                    <TextInput value={quantity}  style={incdecinput}/>
                    <Text style={incdecbtn} onPress={() => decreaseQuantity()}>-</Text>
                </View>
                <Text style={hr80}></Text>
                </View>
                <View style={styles.container4}>
                        {/* <View style={hr80}></View> */}

                        <View style={styles.c4in}>
                            <Text style={styles.txt2}>Total Price</Text>
                            {data.foodAddonPrice ?
                                <Text style={styles.txt3}>₹{
                                    ((parseInt(data.foodPrice) * parseInt(quantity))
                                        + parseInt(addonquantity) * parseInt(data.foodAddonPrice)).toString()

                                }/-</Text>

                                :
                                <Text style={styles.txt5}>₹{
                                    ((parseInt(data.foodPrice) * parseInt(quantity))).toString()
                                }/-</Text>
                            }
                        </View>

                        <View style={hr80}></View>
                    </View>
            </View>

            <View style={styles.btncont} >
                <TouchableOpacity style={styles.btn2} onPress={() => addtocart()}>
                    <Text style={styles.btntxt} >Add To Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} >
                    <Text style={styles.btntxt} >Buy Now</Text>
                </TouchableOpacity>
            </View>
            </View>

    </ScrollView>
  )
}

export default Productpage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
    btn2: {
        width: 150,
        height: 50,
        backgroundColor: '#E59866',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        color: 'white',
        margin: 10,
        alignSelf: 'center',
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        // width: '100%',
    },
    s1: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardimgin: {
        width: '100%',
        height: '100%',
    },
    s2: {
        width: '100%',
        padding: 20,
    },
    s2in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    head1: {
        fontSize: 30,
        fontWeight: '500',
        color: 'blue',
        width: 220,
        marginRight: 10,
    },
    head2: {
        fontSize: 30,
        fontWeight: '200',
        color: 'black',
    },
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
    s3: {
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 20,
    },
    head3: {
        fontSize: 30,
        fontWeight : '200',
        color: 'white',
    },
    head4: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '400',
        color: 'white',
    },
    s3in: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: 130,
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
    },
    head5: {
        color: 'black',
        fontSize: 20,
        fontWeight: '200',
        marginLeft: 10,
    },
    btncont: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btntxt: {
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',
    },
    container2: {
        width: '100%',
        backgroundColor: '#E59866',
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 10,
        alignItems: 'center',
    },
    txt1: {
        // color: '#E59866',
        color: 'blue',
        fontSize: 20,
        fontWeight: '200'
    },
    txt2: {
        // color: '#E59866',
        color: 'black',
        fontSize: 30,
        fontWeight: '200',
        marginVertical: 10,
    },
    container2in: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt3: {
        // color: '#E59866',
        color: 'blue',
        fontSize: 15,
        // fontWeight: '200'
    },
    dash: {
        width: 1,
        height: 20,
        backgroundColor: 'white',
        marginHorizontal: 10,
    },
    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    txt5: {
        // color: '#E59866',
        color: 'blue',
        fontSize: 15,
        textAlign: 'center',
        // fontWeight: '200'
    },
    c3in: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    txt4: {
        // color: '#E59866',
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 10,
        // fontWeight: '200'
    },
    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    text5: {
        color: 'black',
        fontSize: 20,
        marginHorizontal: 10,
    },
    c4in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },

})