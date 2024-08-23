import React, { useEffect, useState } from "react";
import { RefreshControl, StyleSheet, Text, Animated, View } from "react-native";
import { XWing } from "../Commun/XWing";
import FetchData from "./FetchData";
import { Card } from "react-native-paper";

const TextAnim = Animated.createAnimatedComponent(Text);

var acessToken = "";

export default function Data() {
  const [value, setValue] = useState();

  // View Animation
  const [statusOpacityAnim, setStatusOpacityAnim] = useState(new Animated.Value(0));
  const [statusPressed, setStatusPressed] = useState(true);
  const statusOpacity = statusOpacityAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['transparent', '#49494944', 'transparent'],
  });

  // Refresh logic
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    let data = async () => {
      setValue(await FetchData(process.env.EXPO_PUBLIC_WORKSHEET_NAME_STATUS));
    };
    data();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


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

  async function changeStatus() {
    XWing(acessToken, "StatutMDL!A2", [(value[0][0] == "Fermé") ? "Ouvert" : "Fermé"])
    await new Promise(resolve => setTimeout(resolve, 1500));
    onRefresh();
  }

  async function changeBG(opacityAnimComponent, iconPressedComponent) {
    Animated.spring(opacityAnimComponent, {
      toValue: iconPressedComponent ? 1 : 0,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Card.Content style={styles.content}>
      <Text style={ (value[0][0] == "Ouvert") ? styles.status1 : styles.status2 }>.</Text>
      <TextAnim style={[styles.title, {backgroundColor: statusOpacity}]} onPress={() => {changeStatus(); setStatusPressed(!statusPressed); changeBG(statusOpacityAnim, statusPressed);}}>
        {value[0][0]}
      </TextAnim>
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