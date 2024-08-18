import React, { useEffect, useState } from "react";
import { RefreshControl, StyleSheet, Text, ScrollView, ActivityIndicator, View, Animated, Pressable } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import FetchData from "./FetchData";
import removeAccents from 'remove-accents';
import { XWing } from "../Commun/XWing";

var acessToken = "";

const ButtonAnim = Animated.createAnimatedComponent(Pressable);
const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function Data(searchValue) {
  const [value, setValue] = useState();

  // delete animation
  const [opacityAnimDel, setOpacityAnimDel] = useState(new Animated.Value(1));
  const [iconPressedDel, setIconPressedDel] = useState(false);
  const iconOpacityDel = opacityAnimDel.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

  // Refresh logic
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    let data = async () => {
      setValue(await FetchData(process.env.EXPO_PUBLIC_WORKSHEET_NAME_ETU));
    };
    data();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let data = async () => {
      setValue(await FetchData(process.env.EXPO_PUBLIC_WORKSHEET_NAME_ETU));
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

  async function deleteRow(index) {
    const newIndex = String(parseInt(index)+2);
    XWing("", "A"+newIndex, [" ", " ", " ", " ", " ", " "])
  }

  async function changeOpacity(opacityAnimComponent, iconPressedComponent, navigationComponent) {
    Animated.spring(opacityAnimComponent, {
      toValue: iconPressedComponent ? 1 : 0,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
    await delay(150);
    if (navigationComponent != "None") navigation.navigate(navigationComponent);
  }

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      {/* <Search/> */}
      {value.map((files, index) => {
        // Vérifier si le prénom correspond à la valeur de la recherche
        const nval = removeAccents(searchValue.value);
        const nf1 = removeAccents(files[0]);
        const nf2 = removeAccents(files[1]);

        const nameMatches = nf1.toLowerCase().includes(nval.toLowerCase());
        const firstNameMatches = nf2.toLowerCase().includes(nval.toLowerCase());

        if (files[0] == " " && files[1] == " " && files[2] == " " && files[3] == " " && files[4] == " " && files[5] == " ") return null;
        // Si la valeur de recherche est vide ou le prénom correspond, afficher le composant Card
        if (!searchValue.value || firstNameMatches || nameMatches) {
          return (
            <Card key={index} style={styles.container}>
              <Card.Title
                title={!files[0] ? " - " : files[0] + " " + files[1]}
                left={() => <Ionicons name="person-circle-outline" size={40} color="#fff" />}
              />
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Classe :</Text>
                <Text style={styles.paragraph}>
                  {(!files[2]) ? " - " : files[2]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Numéro Tel. :</Text>
                <Text style={styles.paragraph}>
                  {!files[3] ? " - " : "0" + files[3]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Droit à l'image :</Text>
                <Text style={styles.paragraph}>
                  {!files[4] ? " - " : files[4]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Adérant :</Text>
                <Text style={styles.paragraph}>
                  {!files[5] ? " - " : files[5]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.buttons}>
                <ButtonAnim style={[styles.buttonTrash,{opacity: iconOpacityDel}]} onPress={() => {setIconPressedDel(!iconPressedDel); changeOpacity(opacityAnimDel, iconPressedDel, 'None'); deleteRow(index)}}><Ionicons name="trash-outline" size={20} color="white" backgroundColor="red"/></ButtonAnim>
              </Card.Content>
            </Card>
          );
        } else {
          // Si la valeur de recherche n'est pas vide et le prénom ne correspond pas, ne rien rendre
          return null;
        }
      })}

      <View style={styles.pad}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  spin: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100%',
  },
  container: {
    margin: 20,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#79b1db",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
    flexWrap: "wrap",
  },
  buttons: {
    justifyContent: "center",
    alignContent: "center",
  },
  buttonTrash: {
    width: '97%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'red',
    margin: 5,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
  },
  paragraph: {
    fontSize: 18,
  },
  pad: {
    padding: '30%',
  },
});
