import React, { useEffect, useState } from "react";
import { StyleSheet, Text,} from "react-native";
import FetchData from "../Admin/FetchData";
import { Card } from "react-native-paper";

export default function Data() {
  const [value, setValue] = useState();

  useEffect(() => {
    let data = async () => {
      setValue(await FetchData(process.env.EXPO_PUBLIC_WORKSHEET_NAME_STATUS));
    };
    data();
  }, []);
  if (!value) {
    return (
      <Text></Text>
    );
  }

  var statusChange = (value[0][0] == "Ouvert") ? 1 : 0 ;

  return (
    <Card.Content style={styles.content}>
      <Text style={ statusChange ? styles.status1 : styles.status2 }>.</Text>
      <Text style={styles.title}>{value[0][0]}</Text>
    </Card.Content>
  );
}

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: 'transparent',
    borderWidth: 0,
    shadowColor: "transparent",
    justifyContent: 'center',
    marginTop: 45,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  status1: {
    color: "green",
    transform: [{scaleX: 7}, {scaleY: 7}],
    marginTop: -3.5,
  },
  status2: {
    color: "red",
    transform: [{scaleX: 7}, {scaleY: 7}],
    marginTop: -3.5,
  }
});