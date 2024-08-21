import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Animated,
  Pressable,
} from 'react-native';
import FetchData from "../Admin/FetchData";
import React, { useEffect, useState, useRef } from "react";
import md5 from 'md5';
import Header from "../Admin/Header";
import LottieView from 'lottie-react-native';

const ButtonAnim = Animated.createAnimatedComponent(Text);
const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function ConnectScreen({navigation}) {
  const [value, setValue] = useState();

  const [passAdmin, setPassAdmin] = useState('');
  const [showPassAdmin, setShowPassAdmin] = useState(true);
  const [passStaff, setPassStaff] = useState('');
  const [showPassStaff, setShowPassStaff] = useState(true);

  // adherent animation
  const [opacityAnimAd, setOpacityAnimAd] = useState(new Animated.Value(1));
  const [iconPressedAd, setIconPressedAd] = useState(false);
  const iconOpacityAd = opacityAnimAd.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

  // staff animation
  const [opacityAnimStaff, setOpacityAnimStaff] = useState(new Animated.Value(1));
  const [iconPressedStaff, setIconPressedStaff] = useState(false);
  const iconOpacityStaff = opacityAnimStaff.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

  // admin animation
  const [opacityAnimAdmin, setOpacityAnimAdmin] = useState(new Animated.Value(1));
  const [iconPressedAdmin, setIconPressedAdmin] = useState(false);
  const iconOpacityAdmin = opacityAnimAdmin.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

  // Eye animation
  const Eye1Ref = useRef();
  const Eye2Ref = useRef();

  useEffect(() => {
    let eye1Manager = false;
    let eye2Manager = false;
    closeEye1();
    closeEye2();
  }, []);

  const closeEye1 = () => {
    Eye1Ref?.current?.play(100,101);
    eye1Manager = false;
    setShowPassStaff(true);
  }
  const openEye1 = () => {
    Eye1Ref?.current?.play(190,290);
    eye1Manager = true;
    setShowPassStaff(false);
  }
  const manageEye1 = () => {
    eye1Manager == true ? closeEye1() : openEye1();
  }

  const closeEye2 = () => {
    eye2Manager = false;
    setShowPassAdmin(true);
    Eye2Ref?.current?.play(100,101);
  }
  const openEye2 = () => {
    eye2Manager = true;
    setShowPassAdmin(false);
    Eye2Ref?.current?.play(190,290);
  }
  const manageEye2 = () => {
    eye2Manager == true ? closeEye2() : openEye2();
  }

  // Fetch data from Google Sheets
  useEffect(() => {
    let data = async () => {
      setValue(await FetchData(process.env.EXPO_PUBLIC_WORKSHEET_NAME_MDP));
    };
    data();
  }, []);
  if (!value) {
    return (
      <Text></Text>
    );
  }

  // Get the passwords from the Google Sheets
  let ADMIN_PASS = value[0][0];
  let STAFF_PASS = value[0][1];
  
  function checkPassAdmin() {
    if (md5(passAdmin) == String(ADMIN_PASS)) {
      navigation.navigate('Home');
    }
    else {
      alert('Mot de passe incorrect');
    }
  }

  function checkPassStaff() {
    if (md5(passStaff) == String(STAFF_PASS)) {
      navigation.navigate('HomeStaff');
    }
    else {
      alert('Mot de passe incorrect');
    }
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
    <SafeAreaView>
      <View style={styles.page}>
        <Header value={"Compte"}/>
        <View style={styles.connect}>
          <Text style={styles.title}>Se connecter en tant que :</Text>
          
          <ButtonAnim style={[styles.button,{opacity: iconOpacityAd}]} onPress={() => {setIconPressedAd(!iconPressedAd); changeOpacity(opacityAnimAd, iconPressedAd, 'HomeAd');}} >Adhérant</ButtonAnim>
          
          <ButtonAnim style={[styles.button,{opacity: iconOpacityStaff}]} onPress={() => {setIconPressedStaff(!iconPressedStaff); changeOpacity(opacityAnimStaff, iconPressedStaff, 'None');checkPassStaff();}}>Staff</ButtonAnim>
          <View style={styles.adminPass}>
            <TextInput
              selectionColor={'#79b1db'}
              style={styles.input}
              autoComplete='current-password'
              onChangeText={(e) => setPassStaff(e)}
              placeholder="Mot de passe Staff"
              secureTextEntry={showPassStaff}
            />
            <Pressable style={styles.eyes} onPress={manageEye1}>
              <LottieView
                ref={Eye1Ref}
                onAnimationLoaded={() => Eye1Ref.current.play(100,101)}
                style={styles.eye}
                source={require('../../lottie/passwordEyes.json')}
                loop={false}
                autoPlay={false}
              />
            </Pressable>
            
          </View>
          
          <ButtonAnim style={[styles.button,{opacity: iconOpacityAdmin}]} onPress={() => {setIconPressedAdmin(!iconPressedAdmin); changeOpacity(opacityAnimAdmin, iconPressedAdmin, 'None');checkPassAdmin();}}>Administrateur</ButtonAnim>
          <View style={styles.adminPass}>
            <TextInput
              selectionColor={'#79b1db'}
              style={styles.input}
              autoComplete='current-password'
              onChangeText={(e) => setPassAdmin(e)}
              placeholder="Mot de passe Administrateur"
              secureTextEntry={showPassAdmin}
            />
            <Pressable style={styles.eyes} onPress={manageEye2}>
              <LottieView
                ref={Eye2Ref}
                onAnimationLoaded={() => Eye2Ref.current.play(100,101)}
                style={styles.eye}
                source={require('../../lottie/passwordEyes.json')}
                loop={false}
                autoPlay={false}
              />
            </Pressable>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
  connect: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '27%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    fontWeight: '600',
    backgroundColor: '#79b1db',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '60%',
    margin: 8,
    padding: 8,
    borderRadius: 10,
  },
  input: {
    borderColor: '#79b1db',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '60%',
    margin: 8,
    padding: 4,
    borderRadius: 10,
  },
  adminPass: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    flex: 1,
  },
  eyes: {
    position: 'absolute',
    left: '63%',
    bottom: '-10%',
    height: '100%',
    width: '10%',
  },
});