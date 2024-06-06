import {
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {firebase} from "../../firebase/firebaseConfig"

const Googlelogo = require('../../assets/google.png');
const LoginImage = require('../../assets/image.jpg');

const Login = ({navigation}) => {
  const [focusedField, setFocusedField] = useState('');

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
    setCustomError("");
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleLogin = () =>{
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userCredential) =>{
      var user = userCredential.user;
      console.log("Logged in Succesfully");
      // console.log(user);
      navigation.navigate('welcomepage');
    })
    .catch((error)=> {
     // console.log(error.message);
    if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
        setCustomError('Invalid Email');
      }

    else {
      setcustomError('Incorrect email or password');
    }
    })

  }
  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [customError,setCustomError] = useState("");

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent" // Set background color to blue
        barStyle="light-content" // Light icons and text on a dark background
        translucent={true} // Make the status bar translucent
        animated={true} // Animate changes
      />
        
          <Image source={LoginImage} style={styles.image} />

          <View style={styles.container}>
            <Text style={styles.title}>India's #1 Food Delivery App</Text>
            <View style={styles.separator}>
              <View style={styles.line} />
              <Text style={styles.text}>Log in</Text>
              <View style={styles.line} />
            </View>
          </View>

          {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

          <TextInput
            style={[styles.input, focusedField === 'email' && styles.focused]}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
          />

          
          <TextInput
            style={[styles.input, focusedField === 'password' && styles.focused]}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginTop: responsiveHeight(2),
              width: responsiveWidth(90),
              height: responsiveHeight(6),
              backgroundColor: '#EF4848',

              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={()=> handleLogin()}
            >
            <Text
              style={{
                textAlign: 'center',
                fontSize: responsiveFontSize(2.8),
                color: '#fff',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={styles.extraLinks}>

             <Text style={styles.extraText}>
              Forgot Password?
             </Text>

        
             <Text style={styles.extraText} 
                onPress={() => navigation.navigate('signup')}>
                Sign Up
             </Text>
        

          </View>

          <View style={styles.container2}>
            <View style={styles.separator}>
              <View style={styles.line} />
              <Text style={styles.text}>or</Text>
              <View style={styles.line} />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(1),
            }}>
            <Image
              source={Googlelogo}
              style={{
                height: 50,
                width: 50,
                resizeMode: 'contain',
                marginTop: responsiveHeight(1),
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(1),
              marginBottom: responsiveHeight(1),
            }}>
            <Text style={{textAlign: 'center'}}>
              By continuing, you agree to our{'\n'}
              Terms of Service {'\t'}Privacy Policy {'\t'}Content Policy
            </Text>
          </View>
        
      
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(100), // Adjust image width as needed
    height: responsiveHeight(35), 
    backgroundColor: '#E59866',// Adjust image height as needed
    // Add spacing below image
  },
  container: {
    marginTop: responsiveHeight(2),
    alignItems: 'center', // Center content horizontally
  },
  container2: {
    alignItems: 'center', // Center content horizontally
  },

  title: {
    fontSize: responsiveFontSize(3), // Adjust title font size
    fontWeight: 'bold',
    color: 'black', // Make title bold
  },
  separator: {
    marginTop: responsiveHeight(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(90), // Adjust separator width as needed
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ADADAD',
  },
  text: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
 
  input: {
    marginTop: responsiveHeight(2),
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    paddingLeft: responsiveWidth(5),
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ADADAD',
    backgroundColor: '#fff', // White background
    shadowColor: '#000', // Shadow color
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 1, // Shadow blur radius
    elevation: 3,
  },

  extraLinks:{
    alignSelf:"center",
    width: responsiveWidth(90),
    flexDirection: "row",
    justifyContent:"space-between",
    marginTop: responsiveHeight(2),
  },

  extraText:{
    fontWeight:"600"
  },

  focused: {
    borderColor: '#EF4848',
    borderWidth: 2,
  },

  errormsg: {
    padding:responsiveWidth(2),
    color: '#EF4848',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginTop: responsiveHeight(2),
    borderColor: '#EF4848',
    borderWidth: 1,
    borderRadius: 10,
    width:responsiveWidth(50),
    alignSelf:"center",  
},
  

});
