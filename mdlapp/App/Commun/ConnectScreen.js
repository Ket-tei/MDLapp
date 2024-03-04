import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";

export default function ConnectScreen({navigation}) {
  const [passAdmin, setPassAdmin] = useState('');
  const [passStaff, setPassStaff] = useState('');
  
  function checkPassAdmin() {
    if (passAdmin === 'admin') {
      navigation.navigate('Home');
    }
    else {
      alert('Mot de passe incorrect');
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.page}>
        <View style={styles.connect}>
          <Text style={styles.title}>Se connecter en tant que :</Text>
          <Text style={styles.button}>Adhérant</Text>
          <Text style={styles.button}>Staff</Text>
          <TextInput
            selectionColor={'#ffc265'}
            style={styles.input}
            autoComplete='current-password'
            onChangeText={(e) => setPassStaff(e)}
            placeholder="Mot de passe Staff"
            value={passStaff}
          />
          <Text style={styles.button} onPress={() => {checkPassAdmin();}}>Administrateur</Text>
          <TextInput
            selectionColor={'#ffc265'}
            style={styles.input}
            autoComplete='current-password'
            onChangeText={(e) => setPassAdmin(e)}
            placeholder="Mot de passe Administrateur"
            value={passAdmin}
          />
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
});