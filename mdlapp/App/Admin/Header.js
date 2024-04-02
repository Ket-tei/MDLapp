import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

export default function Header(textTitle) {
  const headerTitle = textTitle.value;

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content style={styles.container} title={(headerTitle == "Adhérents") ? "Adhérents" : headerTitle} />
      <StatusBar />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#ffc265",
    height: 30,
  },
});