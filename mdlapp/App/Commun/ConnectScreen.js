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
  const [passStaff, setPassStaff] = useState('');

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

  const Eye2Ref = useRef();
  let eye2Manager = false;

  useEffect(() => {
    closeEye2();
  }, []);
  const closeEye2 = () => {
    Eye2Ref?.current?.play(100,100);
    eye2Manager = false;
  }
  const openEye2 = () => {
    Eye2Ref?.current?.play(190,290);
    eye2Manager = true;
  }
  const manageEye2 = () => {
    if (!eye2Manager) {
      openEye2();
    } else {
      closeEye2();
    }
  }

  const Eye1Ref = useRef();
  let eye1Manager = false;

  useEffect(() => {
    closeEye1();
  }, []);
  const closeEye1 = () => {
    Eye1Ref?.current?.play(100,100);
    eye1Manager = false;
  }
  const openEye1 = () => {
    Eye1Ref?.current?.play(190,290);
    eye1Manager = true;
  }
  const manageEye1 = () => {
    if (!eye1Manager) {
      openEye1();
    } else {
      closeEye1();
    }
  }

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

  let ADMIN_PASS = value[0][0];
  let STAFF_PASS = value[0][1];
  passStaffManager = false;
  passAdminManager = false;

  function managePassStaff() {
    console.log(eye1Manager);
    if (eye1Manager) {
      return passStaff;
    }
    else {
      return passStaff.replace(/./g, '●');
    }
  }

  function hidePassAdmin() {
    return passAdmin.replace(/./g, '●');
  }
  function showPassAdmin() {
    return passAdmin;
  }
  function managePassAdmin() {
    if (!passAdminManager) {
      showPassAdmin();
    }
    else {
      hidePassAdmin();
    }
  }
  
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
              selectionColor={'#ffc265'}
              style={styles.input}
              autoComplete='current-password'
              onChangeText={(e) => setPassStaff(e)}
              placeholder="Mot de passe Staff"
              value={managePassStaff()}
            />
            <Pressable style={styles.eyes} onPress={manageEye1}>
              <LottieView
                ref={Eye1Ref}
                style={styles.eye}
                source={require('../../lottie/passwordEyes1.json')}
                loop={false}
                autoPlay={true}
              />
            </Pressable>
            
          </View>
          
          <ButtonAnim style={[styles.button,{opacity: iconOpacityAdmin}]} onPress={() => {setIconPressedAdmin(!iconPressedAdmin); changeOpacity(opacityAnimAdmin, iconPressedAdmin, 'None');checkPassAdmin();}}>Administrateur</ButtonAnim>
          <View style={styles.adminPass}>
            <TextInput
              selectionColor={'#ffc265'}
              style={styles.input}
              autoComplete='current-password'
              onChangeText={(e) => setPassAdmin(e)}
              placeholder="Mot de passe Administrateur"
              value={hidePassAdmin()}
            />
            <Pressable style={styles.eyes} onPress={manageEye2}>
              <LottieView
                ref={Eye2Ref}
                style={styles.eye}
                source={require('../../lottie/passwordEyes.json')}
                loop={false}
                autoPlay={true}
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
    backgroundColor: '#ffc265',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '60%',
    margin: 8,
    padding: 8,
    borderRadius: 10,
  },
  input: {
    borderColor: '#ffc265',
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