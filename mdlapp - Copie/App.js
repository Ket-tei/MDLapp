import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./App/HomeScreen";
import ListeScreen from "./App/ListeScreen";
import OptionScreen from "./App/OptionScreen";
import AddScreen from "./App/AddScreen";

const Stack = createNativeStackNavigator();


const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Liste" component={ListeScreen}/>
        <Stack.Screen name="Option" component={OptionScreen}/>
        <Stack.Screen name="Add" component={AddScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Screens/>
  );
}