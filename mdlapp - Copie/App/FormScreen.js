import React, { useEffect, useCallback, useState } from 'react';
import { View, TextInput, ScrollView, Button, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import Dropdown from 'react-native-input-select';
import axios from 'axios';

function FormScreen() {
	const [no, setNo] = useState('');
	const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');
	const [classe, setClasse] = useState('');
	const [tel, setTel] = useState('');
	const [image, setImage] = useState('');
	const [membre, setMembre] = useState('');

  const [isRegistered, setIsRegistered] = useState(false);

	const handleSubmit = async (e) => {
    setIsRegistered(true);
    setNo(6)
		e.preventDefault();

		const objt = { no, nom, prenom, classe, tel, image, membre };
    console.log(objt);

    try {
      const response = await axios.post('https://sheets.googleapis.com/v4/spreadsheets/1tJ8tZx0B9V9tzbIuFpom1u6545r-uvE6We7E8tCUtQI:batchUpdate', objt);
      
      console.log(response.data);
      
    } catch (error) {
      
      console.error("Error", error);
      
    }
	};

	return (
		<ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Ajouter un Adhérant</Text>
        <TextInput
          style={styles.input}
          autoComplete='name'
          placeholder="Prénom"
          onChange={(e) => setPrenom(e.target.value)}
        />
        <TextInput
          style={styles.input}
          autoComplete='family-name'
          placeholder="Nom"
          onChange={(e) => setNom(e.target.value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Classe"
          onChange={(e) => setClasse(e.target.value)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          autoComplete='tel'
          placeholder="Numéro Tel."
          onChange={(e) => setTel(e.target.value)}
        />
        <Dropdown
          style={styles.input}
          dropdownContainerStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          dropdownStyle={{
            borderWidth: 3,
            borderColor: '#ffc265',
            borderRadius: 10,
            width: '80%',
          }}
          placeholderStyle={{
            color: 'grey',
          }}
          placeholder="Droit à l'image"
          options={[
            { label: "Autorise le droit à l'image", value: 'Oui' },
            { label: "N'autorise pas le droit à l'image", value: 'Non' },
          ]}
          primaryColor={'#ffc265'}
          onValueChange={(e) => setImage(e.target)}
        />
        <Dropdown
          style={styles.input}
          dropdownContainerStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          dropdownStyle={{
            borderWidth: 3,
            borderColor: '#ffc265',
            borderRadius: 10,
            marginBottom: 10,
            width: '80%',
          }}
          placeholderStyle={{
            color: 'grey',
          }}
          placeholder="Adhérant"
          options={[
            { label: "Oui", value: 'Oui' },
            { label: "Non", value: 'Non' },
          ]}
          primaryColor={'#ffc265'}
          onValueChange={(e) => setMembre(e.target)}
        />
        <Text style={styles.submitButton} onPress={handleSubmit}>Ajouter</Text>
          
        {isRegistered && <Text style={styles.successText}>Adhérant Ajouté ! </Text>}

      </View>
      <View style={styles.pad}></View>
    </ScrollView>
	);
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: '#ffc265',
    borderRadius: 10,
    padding: 10,
    marginBottom: 17,
    width: '80%',
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#ffc265',
    borderRadius: 20,
    width: '70%',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successText: {
    color: 'green',
    fontSize: 17,
    paddingTop: 15,
  },
  pad: {
    padding: '20%',
  },
});

export default FormScreen;