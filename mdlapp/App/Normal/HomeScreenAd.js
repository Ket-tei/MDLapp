import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import React, { useState, useEffect } from "react";
import FetchData from "../Admin/FetchData.js";
import Data from "./DataSTatutMDLAd.js";
import Nav from "./NavAd.js";

acessToken = "";

export default function HomeScreenAd({navigation}) {
  const [value, setValue] = useState();

  useEffect(() => {
    let data = async () => {
      setValue(await FetchData(process.env.EXPO_PUBLIC_WORKSHEET_NAME_MESSAGE));
    };
    data();
  }, []);
  if (!value) {
    return (
      <ActivityIndicator
        size= "x-large"
        animating={true}
        color="#ffc265"
        style={styles.spin}
      />
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.page}>
        {/* Menu */}
        <Nav component={navigation}/>
        
        {/* Statut */}
        <View>
          <Data/>
        </View>

        {/* Message */}
        <View style={styles.message}>
          <Text style={styles.title}>Message : </Text>
          <Text style={styles.input}>{value[0][0]}</Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    width: '100%',
    justifyContent: 'space-around'
  },
  add: {
    position: 'absolute',
    backgroundColor: '#fbebc7',
    borderRadius: 50,
    left: '47.5%',
    bottom: 58,
  },
  message: {
    position: 'absolute',
    top: '22%',
    width: '90%',
    height: '30%',
    margin: 10,
    alignContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 4,
    borderRadius: 10,
    fontSize: 20,
  },
});