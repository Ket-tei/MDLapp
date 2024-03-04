import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator, View } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import FetchData from "./FetchDataDonneeEtu";
import removeAccents from 'remove-accents';


export default function Data(searchValue) {
  const [value, setValue] = useState();

  useEffect(() => {
    let data = async () => {
      setValue(await FetchData());
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
    <ScrollView>
      {/* <Search/> */}
      {value.map((files, index) => {
        // Vérifier si le prénom correspond à la valeur de la recherche
        const nval = removeAccents(searchValue.value);
        const nf1 = removeAccents(files[1]);
        const nf2 = removeAccents(files[2]);

        const nameMatches = nf1.toLowerCase().includes(nval.toLowerCase());
        const firstNameMatches = nf2.toLowerCase().includes(nval.toLowerCase());

        // Si la valeur de recherche est vide ou le prénom correspond, afficher le composant Card
        if (!searchValue.value || firstNameMatches || nameMatches) {
          return (
            <Card key={index} style={styles.container}>
              <Card.Title
                title={!files[1] ? " - " : files[1] + " " + files[2]}
                left={() => <Ionicons name="person-circle-outline" size={40} color="#fff" />}
              />
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Classe :</Text>
                <Text style={styles.paragraph}>
                  {(!files[3]) ? " - " : files[3]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Numéro Tel. :</Text>
                <Text style={styles.paragraph}>
                  {!files[4] ? " - " : "0" + files[4]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Droit à l'image :</Text>
                <Text style={styles.paragraph}>
                  {!files[5] ? " - " : files[5]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Adérant :</Text>
                <Text style={styles.paragraph}>
                  {!files[6] ? " - " : files[6]}
                </Text>
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
    backgroundColor: "#ffc265",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
    flexWrap: "wrap",
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