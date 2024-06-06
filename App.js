import { StyleSheet, Text, View } from 'react-native';
import Welcome from './src/screens/Welcome';
import LoginScreen from './src/screens/Loginscreen';
import SignUpScreen from './src/screens/signupscreen';
import Homescreen from './src/screens/Homescreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './src/screens/UserProfile';
import Productpage from './src/screens/Productpage';
import UserCart from './src/screens/UserCart';



export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
    <NavigationContainer>
    <Stack.Navigator initialRouteName='welcomepage'>
        <Stack.Screen name="welcomepage" component={Welcome} options={{headerShown: false,}} />
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false,}} />
        <Stack.Screen name="signup" component={SignUpScreen} options={{headerShown: false,}} />
        <Stack.Screen name="homescreen" component={Homescreen} options={{headerShown: false,}} />
        <Stack.Screen name="userprofile" component={UserProfile} options={{headerShown: false,}} />
        <Stack.Screen name="productpage" component={Productpage} options={{headerShown: false,}} />
        <Stack.Screen name="cartscreen" component={UserCart} options={{headerShown: false,}} />
    </Stack.Navigator>
    </NavigationContainer>
    </>
    
  );
}


const styles = StyleSheet.create({
  container: {
    
  },
});
