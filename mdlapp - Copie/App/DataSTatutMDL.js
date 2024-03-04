import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FetchData from "./FetchDataStatutMDL";
import { Card } from "react-native-paper";

export default function Data() {
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
        size="large"
        animating={true}
        color="rgba(137,232,207,100)"
      />
    );
  }
  return (
    <Card.Content style={styles.content}>
      <Text style={styles.status}>.</Text>
      <Text style={styles.title}>
        {value[0][0]}
      </Text>
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
  },
  status: {
    color: "green",
    transform: [{scaleX: 7}, {scaleY: 7}],
    marginTop: -3.5,
  }
});