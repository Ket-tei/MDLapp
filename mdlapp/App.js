import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./App/Admin/HomeScreen";
import HomeScreenStaff from "./App/Staff/HomeScreenStaff";
import HomeScreenAd from "./App/Normal/HomeScreenAd";
import ListeScreen from "./App/Admin/ListeScreen";
import ListeScreenStaff from "./App/Staff/ListeScreenStaff";
import OptionScreen from "./App/Admin/OptionScreen";
import OptionScreenStaff from "./App/Staff/OptionScreenStaff";
import OptionScreenAd from "./App/Normal/OptionScreenAd";
import AddScreen from "./App/Admin/AddScreen";
import ConnectScreen from "./App/Commun/ConnectScreen";

const Stack = createNativeStackNavigator();


const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Connect" component={ConnectScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="HomeStaff" component={HomeScreenStaff}/>
        <Stack.Screen name="HomeAd" component={HomeScreenAd}/>
        <Stack.Screen name="Add" component={AddScreen}/>
        <Stack.Screen name="Liste" component={ListeScreen}/>
        <Stack.Screen name="ListeStaff" component={ListeScreenStaff}/>
        <Stack.Screen name="Option" component={OptionScreen}/>
        <Stack.Screen name="OptionStaff" component={OptionScreenStaff}/>
        <Stack.Screen name="OptionAd" component={OptionScreenAd}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Screens/>
  );
}