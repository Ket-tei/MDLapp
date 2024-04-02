import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const IoniconsAnim = Animated.createAnimatedComponent(Ionicons);
const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function Nav(nav) {
  let navigation = nav.component;

  // Option Animation
  const [opacityAnimOption, setOpacityAnimOption] = useState(new Animated.Value(1));
  const [iconPressedOption, setIconPressedOption] = useState(false);
  const iconOpacityOption = opacityAnimOption.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

  // Home Animation
  const [opacityAnimHome, setOpacityAnimHome] = useState(new Animated.Value(1));
  const [iconPressedHome, setIconPressedHome] = useState(false);
  const iconOpacityHome = opacityAnimHome.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

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
    <View style={styles.nav} color="#ffc265">
      <View style={styles.home}>
        <IoniconsAnim name="home-outline" size={40} color="#ffc265" style={{opacity: iconOpacityHome}} onPress={() => {setIconPressedHome(!iconPressedHome); changeOpacity(opacityAnimHome, iconPressedHome, 'HomeAd');}} />
      </View>
      <View style={styles.home}>
        <IoniconsAnim name="settings-outline" size={40} color="#ffc265" style={{opacity: iconOpacityOption}} onPress={() => {setIconPressedOption(!iconPressedOption); changeOpacity(opacityAnimOption, iconPressedOption, 'OptionAd');}} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
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