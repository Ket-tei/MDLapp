import {
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import React from "react";
import { Searchbar } from 'react-native-paper';
import Data from "./DataDonneeEtuStaff.js";
import Header from "../Admin/Header.js";
import Nav from "./NavStaff.js";

export default function ListeScreenStaff({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView>
      <View style={styles.page}>
        {/* Menu */}
        <Nav component={navigation}/>

        {/* Info Etudiant */}
        <View>
          <Header value={"Adhérents"}/>
          {/* SearchBar */}
          <View style={styles.content} >
            <Searchbar
              selectionColor={'#79b1db'}
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
    backgroundColor: '#79b1db',
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