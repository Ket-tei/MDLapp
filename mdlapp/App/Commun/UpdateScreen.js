import { StyleSheet, Text, ActivityIndicator, View, Linking} from "react-native";
import React, { useEffect, useState } from "react";
import FetchData from "../Admin/FetchData";

export default function UpdateScreen({navigation}) {
  let Version = "1.0.0";
  const [value, setValue] = useState();


  useEffect(() => {
    let data = async () => {
      setValue(await FetchData(process.env.EXPO_PUBLIC_WORKSHEET_NAME_STATUS));
    };
    data();
  }, []);
  if (!value) {
    return (
      <ActivityIndicator
        size= "x-large"
        animating={true}
        color="#79b1db"
        style={styles.spin}
      />
    );
  }
  else {
    checkVersion();
  }

  function checkVersion() {
    if (value[0][2] == Version) {

      navigation.navigate('Connect');
    }
  }

  const url = 'https://kettei.fr/html/MDLapp-download.html';

  function checkLink() {
    if (value[0][2] != Version) {
      openLink();
    }
  }

  async function openLink() {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    }
  }

  return (
    <View style={styles.page}>
      <Text style={styles.titre}>Nouvelle Mis à jour</Text>
      <Text>Aller a l'url suivant :</Text>
      <Text onPress={checkLink()} style={styles.url}>https://kettei.fr/html/MDLapp-download/</Text>
    </View>
  )}


const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titre: {
    fontSize: 20,
    marginBottom: 20,
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  spin: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100%',
  }
});