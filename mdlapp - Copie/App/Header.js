import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

export default function Header() {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content style={styles.container} title="Adhérants" />
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