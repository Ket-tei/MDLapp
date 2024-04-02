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

  // Liste Animation
  const [opacityAnimListe, setOpacityAnimListe] = useState(new Animated.Value(1));
  const [iconPressedListe, setIconPressedListe] = useState(false);
  const iconOpacityListe = opacityAnimListe.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

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

  // Add Animation
  const [opacityAnimAdd, setOpacityAnimAdd] = useState(new Animated.Value(0));
  const [iconPressedAdd, setIconPressedAdd] = useState(true);
  const iconOpacityAdd = opacityAnimAdd.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
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
      <View style={styles.add}>
        <IoniconsAnim name="add-outline" size={50} color="#ffc265" style={{transform: [{rotate: iconOpacityAdd}]}} onPress={() => {setIconPressedAdd(!iconPressedAdd); changeOpacity(opacityAnimAdd, iconPressedAdd, 'Add');}} />
      </View>
      <View style={styles.liste}>
        <IoniconsAnim name="person-circle-outline" size={40} color="#ffc265" style={{opacity: iconOpacityListe}} onPress={() => {setIconPressedListe(!iconPressedListe); changeOpacity(opacityAnimListe, iconPressedListe, 'Liste');}} />
      </View>
      <View style={styles.home}>
        <IoniconsAnim name="home-outline" size={40} color="#ffc265" style={{opacity: iconOpacityHome}} onPress={() => {setIconPressedHome(!iconPressedHome); changeOpacity(opacityAnimHome, iconPressedHome, 'Home');}} />
      </View>
      <View style={styles.home}>
        <IoniconsAnim name="settings-outline" size={40} color="#ffc265" style={{opacity: iconOpacityOption}} onPress={() => {setIconPressedOption(!iconPressedOption); changeOpacity(opacityAnimOption, iconPressedOption, 'Option');}} />
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