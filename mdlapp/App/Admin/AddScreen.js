import {
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import FormScreen from "./FormScreen";
import Data from "./DataSTatutMDL";
import Nav from "./Nav";
import Header from './Header';

export default function OptionScreen({navigation}) {

  return (
    <SafeAreaView>
      <View style={styles.page}>
        {/* Header */}
        <Header value=""/>
        {/* Menu */}
        <Nav component={navigation}/>

        {/* Statut */}
        <View>
          <Data/>
        </View>
        
        {/* test */}
        <FormScreen/>

      </View>
    </SafeAreaView>
  );
};

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
});