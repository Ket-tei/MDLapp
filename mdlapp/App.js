import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./App/Admin/HomeScreen";
import ListeScreen from "./App/Admin/ListeScreen";
import OptionScreen from "./App/Admin/OptionScreen";
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
        <Stack.Screen name="Add" component={AddScreen}/>
        <Stack.Screen name="Liste" component={ListeScreen}/>
        <Stack.Screen name="Option" component={OptionScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Screens/>
  );
}