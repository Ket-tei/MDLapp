import * as React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import Data from "./DataDonneeEtu";
import Header from "./Header";

export default function ListeScreen({navigation}) {

  const [searchQuery, setSearchQuery] = React.useState('');
  
  return (
    <SafeAreaView>
      <View style={styles.page}>
        {/* Menu */}
        <View style={styles.nav} color="#ffc265">
          <View style={styles.add}>
              <Ionicons onPress={() => navigation.navigate('Add')} name="add-outline" size={50} color="#ffc265"/>
          </View>
          <View style={styles.liste}>
            <Ionicons onPress={() => navigation.navigate('Liste')} name="person-circle-outline" size={40} color="#ffc265"/>
          </View>
          <View style={styles.home}>
            <Ionicons onPress={() => navigation.navigate('Home')} name="home-outline" size={40} color="#ffc265"/>
          </View>
          <View style={styles.home}>
            <Ionicons onPress={() => navigation.navigate('Option')} name="settings-outline" size={40} color="#ffc265"/>
          </View>
        </View>

        {/* Info Etudiant */}
        <View>
          <Header/>
          {/* SearchBar */}
          <View style={styles.content} >
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
            />
          </View>
          <Data value={searchQuery}/>
        </View>
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
  content: {
    backgroundColor: '#ffc265',
  },
  searchbar: {
    width: '90%',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: '#fbebc7',
  },
});