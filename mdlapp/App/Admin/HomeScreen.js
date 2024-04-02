import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
} from 'react-native';
import React, { useState, useEffect } from "react";
import FetchData from "./FetchData";
import Data from "./DataSTatutMDL";
import Nav from "./Nav.js";
import Header from "./Header";
import { XWing } from "../Commun/XWing";

acessToken = "";

export default function HomeScreen({navigation}) {
  const [messageMDL, setMessageMDL] = useState('');

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

  async function changeMessage() {
    XWing(acessToken, "MessageMDL!A2", [messageMDL])
    setMessageMDL('');
  }

  return (
    <SafeAreaView>
      <View style={styles.page}>
        <Header value={"Acceuil"}/>
        {/* Menu */}
        <Nav component={navigation}/>
        
        {/* Statut */}
        <View>
          <Data/>
        </View>

        {/* Message */}
        <View style={styles.message}>
          <Text style={styles.title}>Message : </Text>
          <TextInput
            multiline={true}
            selectionColor={'#ffc265'}
            style={styles.input}
            autoComplete='off'
            onChangeText={(e) => setMessageMDL(e)}
            placeholder={value[0][0]}
            value={messageMDL}
          />
          <Button color="#ffc265" title="Mettre à jour le message" onPress={() => {changeMessage()}}/>
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