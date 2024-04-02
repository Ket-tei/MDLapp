import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import Header from "../Admin/Header";
import Nav from "./NavAd";

export default function OptionScreenAd({navigation}) {

  state = {
    isOnDefaultToggleSwitch: true,
    isOnLargeToggleSwitch: false,
    isOnBlueToggleSwitch: false
  };

  return (
    <SafeAreaView>
      <View style={styles.page}>
        {/* Menu */}
        <Nav component={navigation}/>

        <Header value={"Options"}/>
        <View style={styles.options}>
          <View style={styles.dark}>
            <ToggleSwitch
              disabled={true}
              isOn={false}
              onColor="black"
              offColor="lightgrey"
              label="Dark Mode"
              labelStyle={{ color: "black", fontWeight: "600" }}
              size="large"

              onToggle={isOn => isOn=false}
            />
          </View>
          <View style={styles.deco}>
           <Button 
            color="red"
            title='Déconnexion'
            onPress={() => {navigation.navigate('Connect')}}
            />
          </View>
          <Text style={styles.credit}>Created by Kettei : kettei.fr</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
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
  options: {
    marginTop: 50,
    height: '100%',
  },
  deco: {
    position: 'absolute',
    width: '80%',
    bottom: 250,
    right: 40,
  },
  dark: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  credit: {
    position: 'absolute',
    bottom: 300,
    textAlign: 'center',
    width: '100%',
    color: 'grey',
  }
});