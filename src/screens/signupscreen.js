import {
    StyleSheet,
    Text,
    Image,
    View,
    StatusBar,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
  } from "react-native";
  
  import React, { useState } from "react";
  import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
  import {firebase} from "../../firebase/firebaseConfig"
  
  const Googlelogo = require("../../assets/google.png");
  
  
  
  const SignUp = ({navigation}) => {
    const [countryCode, setCountryCode] = useState("IN");
    const [country, setCountry] = useState(null);
    const [withCountryNameButton, setWithCountryNameButton] = useState(false);
    const [withFlag, setWithFlag] = useState(true);
    const [withEmoji, setWithEmoji] = useState(true);
    const [withFilter, setWithFilter] = useState(true);
    const [withAlphaFilter, setWithAlphaFilter] = useState(true);
    const [withCallingCode, setWithCallingCode] = useState("91");
  
    //taking form data
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("")
    const [fullName, setFullName] = useState("");
    const [address, setFullAddress] = useState("");
    const [email, setEmail] = useState("");
  
    const onSelect = (selectedCountry) => {
      setCountryCode(selectedCountry.cca2);
      setCountry(selectedCountry); // Set selected country
      setWithCallingCode(selectedCountry.callingCode);
    };
  
    const [focusedField, setFocusedField] = useState('');
  
    const handleFocus = (fieldName) => {
      setFocusedField(fieldName);
      setCustomError("");
    };
  
    const handleBlur = () => {
      setFocusedField('');
    };
  
    const [customError, setCustomError] = useState('');
    const [successmsg, setSuccessmsg] = useState(null);
  
    const handleSignUp = () =>{
      if(password != cpassword){
  
        setCustomError("Password Does not Match");
        return;
      }
  
      else if(phoneNumber.length != 10){
        setCustomError("Phone number should be 10 digit");
        return;    
      }
  
      try{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((userCredentials)=>{
          console.log("user created");
          console.log(userCredentials);

          // setSuccessmsg("user created successfully");
          if(userCredentials?.user.uid){
          const userRef = firebase.firestore().collection('UserData');
          
          userRef.add({
            email:email,
            password:password,
            fullName:fullName,
            address:address,
            phoneNumber:phoneNumber,
            uid: userCredentials?.user.uid,
    
      
          }
      ).then(()=> {
            console.log('Data Added to firestore');
            setSuccessmsg("user created successfully");
          })
          .catch((error) => {
            console.log("firestore error",error);
          })
        }
        })
        .catch((error) =>{
          console.log("sign up firebase error", error.message);
          if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
            setCustomError("Email already exists");
          }
  
          else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
            setCustomError('Invalid Email');
          }
          else if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            setCustomError("Password Should Be al least 6 characters");
          }
          else{
            setCustomError(error.message);
          }
        })
  
      }
  
      catch(error){
  
        console.log("sign up system error", error.message);
  
      }
  
  
    };
  
  
    return (
      <ScrollView style={styles.container} >
      <View style={styles.container}>
        {successmsg == null?
        <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="transparent" // Set background color to blue
          barStyle="dark-content" // Light icons and text on a dark background
          translucent={false} // Make the status bar translucent
          animated={true} // Animate changes
        />
  
        <View style={styles.upperContainer}>
          <Text style={styles.title}>India's #1 Food Delivery App</Text>
          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.text}>Sign up</Text>
            <View style={styles.line} />
          </View>
          {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, focusedField === 'fullName' && styles.focused]}
            placeholder="Full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            onFocus={() => handleFocus('fullName')}
            onBlur={handleBlur}
          />
          <TextInput
            style={[styles.input, focusedField === 'address' && styles.focused]}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setFullAddress(text)}
            onFocus={() => handleFocus('address')}
            onBlur={handleBlur}
          />
          <TextInput
            style={[styles.input, focusedField === 'email' && styles.focused]}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
          />
        </View>
  
        <View style={styles.phoneContainer}>
          {/* <TouchableOpacity
            style={[styles.countryPicker,focusedField === 'phoneNumber' && styles.focused]}
            onFocus={() => handleFocus('phoneNumber')}
            onBlur={handleBlur}
            >
            <CountryPicker
              {...{
                country,
                countryCode,
                withFlag,
                withFilter,
                withCountryNameButton,
                withAlphaFilter,
                withCallingCode,
                withEmoji,
                onSelect,
              }}
              visible={country}
            />
          </TouchableOpacity> */}
          <Text
            style={[styles.callingCode,focusedField === 'phoneNumber' && styles.focused]}>
            +{withCallingCode}
          </Text>
  
          <TextInput
            style={[styles.phoneInput, focusedField === 'phoneNumber' && styles.focused]}
            placeholder="Enter Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            onFocus={() => handleFocus('phoneNumber')}
            onBlur={handleBlur}
          />
        </View>
        <TextInput
          style={[styles.input, focusedField === 'password' && styles.focused]}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => handleFocus('password')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedField === 'cpassword' && styles.focused]}
          placeholder="Confirm Password"
          value={cpassword}
          secureTextEntry={true}
          onChangeText={(text) => setcPassword(text)}
          onFocus={() => handleFocus('cpassword')}
          onBlur={handleBlur}
        />
        <TouchableOpacity
          style={styles.button} onPress={()=> handleSignUp()}>
          <Text
            style={styles.buttonText}>
            Sign Up
          </Text>
        </TouchableOpacity>
        
        
        <View style={styles.extraLinks}>
  
          <Text style={styles.extraText}>
            Forgot Password?
          </Text>
  
          <Text style={styles.extraText}>
            Already Registered? <Text style={styles.extraText} onPress={() => navigation.navigate('login')}>Log in</Text>
          </Text>
  
        </View>
  
        <View style={styles.lowerLineContainer}>
          <View style={styles.lowerSeparator}>
            <View style={styles.line} />
            <Text style={styles.text}>or</Text>
            <View style={styles.line} />
          </View>
        </View>
  
        <View
          style={styles.googleImageContainer}>
          <Image
            source={Googlelogo}
            style={styles.googleImage}
          />
        
        </View>
        <View
          style={styles.footer}>
          <Text style={{ textAlign: "center" }}>
            By continuing, you agree to our{"\n"}
            Terms of Service{"\t"}Privacy Policy{"\t"}Content Policy
          </Text>
        </View>
       </SafeAreaView>
  
  
        : 
        <View style ={styles.succesContainer}>
          <Text style={styles.successMsg}>{successmsg}</Text>
          <TouchableOpacity
          style={styles.button} onPress={() => navigation.navigate("login")}>
          <Text
            style={styles.buttonText}>
            Sign In
          </Text>
        </TouchableOpacity>
             <TouchableOpacity
                style={styles.button} onPress={()=> setSuccessmsg(null)}>
               <Text
                    style={styles.buttonText}>
                     Go Back
               </Text>
             </TouchableOpacity>
  
        </View>
  
  
        }
      </View>
      </ScrollView>
    );
  };
  
  export default SignUp;
  
  const styles = StyleSheet.create({
  
    container:{
      flex:1,
    },
  
    succesContainer:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
    },
    upperContainer: {
      marginTop: responsiveHeight(4),
      alignItems: "center", // Center content horizontally
    },
    inputContainer:{
      marginTop:responsiveHeight(1),
    },
    phoneContainer:{
      marginTop: responsiveHeight(2),
      flexDirection: "row",
      justifyContent: "center",
      width: responsiveWidth(100),
    },
    countryPicker:{
      marginRight: responsiveWidth(3),
      width: responsiveWidth(18),
      height: responsiveHeight(7),
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff", // White background
      borderRadius: 10, // Rounded corners for card effect
      shadowColor: "#000", // Shadow color
      shadowOpacity: 1, // Shadow opacity
      shadowRadius: 1, // Shadow blur radius
      elevation: 3,
      borderColor: "#ADADAD",
    },
    callingCode:{
      paddingRight:responsiveWidth(2),
      fontWeight: "600",
      textAlign: "right",
      textAlignVertical: "center",
      width: responsiveWidth(14),
      height: responsiveHeight(7),
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      color: "#000",
      borderColor: "#ADADAD",
      backgroundColor: "#fff", // White background
      shadowColor: "#000", // Shadow color
      shadowOpacity: 1, // Shadow opacity
      shadowRadius: 1, // Shadow blur radius
      elevation: 3,
    },
    button:{
      alignSelf: "center",
      marginTop: responsiveHeight(2),
      width: responsiveWidth(90),
      height: responsiveHeight(6),
      backgroundColor: "red",
      justifyContent: "center",    
      borderRadius: 10,
    },
    buttonText:{
      textAlign: "center",
      fontSize: responsiveFontSize(2.8),
      color: "#fff",
      textTransform:"uppercase",
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
  
    lowerLineContainer: {
      alignItems: "center", // Center content horizontally
    },
  
    title: {
      fontSize: responsiveFontSize(3), // Adjust title font size
      fontWeight: "bold",
      color: "black", // Make title bold
    },
    separator: {
      marginTop: responsiveHeight(3),
      flexDirection: "row",
      alignItems: "center",
      width: responsiveWidth(90), // Adjust separator width as needed
    },
    lowerSeparator:{
      marginTop: responsiveHeight(2),
      flexDirection: "row",
      alignItems: "center",
      width: responsiveWidth(90),
  
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: "#ADADAD",
    },
    text: {
      fontSize: responsiveFontSize(2),
      fontWeight: "700",    
      paddingHorizontal: responsiveWidth(3),
    },
  
    googleImageContainer:{ 
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  
    googleImage:{
      height: responsiveHeight(6),  
      width:responsiveWidth(12),
      resizeMode: "contain",
    },
    phoneInput: {
      paddingLeft: responsiveWidth(3),
      height: responsiveHeight(7),
      width: responsiveWidth(76),
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderColor: "#ADADAD",
      backgroundColor: "#fff", // White background
      shadowColor: "#000", // Shadow color
      shadowOpacity: 1, // Shadow opacity
      shadowRadius: 1, // Shadow blur radius
      elevation: 3,
    },
    input: {
      marginTop: responsiveHeight(2),
      height: responsiveHeight(7),
      width: responsiveWidth(90),
      paddingLeft: responsiveWidth(5),
      borderWidth: 1,
      alignSelf: "center",
      backgroundColor: "#fff",
      borderRadius: 10,
      borderColor: "#ADADAD",
      backgroundColor: "#fff", // White background
      shadowColor: "#000", // Shadow color
      shadowOpacity: 1, // Shadow opacity
      shadowRadius: 1, // Shadow blur radius
      elevation: 3,
    },
    footer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: responsiveHeight(1),
    },
  
    focused: {
      borderColor: '#EF4848',
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
  },
  
  successMsg: {
      color: 'green',
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
      borderColor: 'green',
      borderWidth: 1,
      borderRadius: 10,
      padding: 11,
    }
    });