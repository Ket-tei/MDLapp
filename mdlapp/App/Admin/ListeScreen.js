import {
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import React from "react";
import { Searchbar } from 'react-native-paper';
import Data from "./DataDonneeEtu";
import Header from "./Header";
import Nav from "./Nav.js";

export default function ListeScreen({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView>
      <View style={styles.page}>
        <Header value={"Adhérents"}/>
        {/* Menu */}
        <Nav component={navigation}/>

        {/* Info Etudiant */}
        <View>
          {/* SearchBar */}
          <View style={styles.content} >
            <Searchbar
              selectionColor={'#ffc265'}
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
            />
          </View>
          {/* Block of Data */}
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
    backgroundColor: '#d4ebfc',
    borderRadius: 50,
    left: '47.5%',
    bottom: 58,
  },
  content: {
    backgroundColor: '#79b1db',
  },
  searchbar: {
    width: '90%',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: '#d4ebfc',
  },
});