import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Button, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import FetchData from "./FetchData";
import { XWing } from '../Commun/XWing';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function FormScreen() {
  const [value, setValue] = useState();
  const [dataVerif, setDataVerif] = useState('None');
  
	const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');
	const [classe, setClasse] = useState('');
	const [tel, setTel] = useState('');
	const [image, setImage] = useState('');
	const [email, setEmail] = useState('');

  const [isRegistered, setIsRegistered] = useState(false);

  let data = async () => {
    setValue(await FetchData(process.env.EXPO_PUBLIC_WORKSHEET_NAME_STATUS));
  };
  if (dataVerif == 'None') {
    data();
    setDataVerif('Done');
  }

	const handleSubmit = async (e) => {
    setIsRegistered(true);
		e.preventDefault();
    
    var acessToken = "";
  
    XWing(acessToken, "DonneeEtu!A"+String(parseInt(value[0][1])+2), [nom, prenom, classe, tel, image, email]);

    XWing(acessToken, "StatutMDL!B2", [parseInt(value[0][1])+1]);
    value[0][1] = (parseInt(value[0][1]) + 1).toString();
    
    setNom('');
    setPrenom('');
    setClasse('');
    setTel('');
    setEmail('');

    await delay(1500);
    setIsRegistered(false);
	};

	return (
		<ScrollView scrollEnabled={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Ajouter un Adhérant</Text>

        <TextInput
          selectionColor={'#79b1db'}
          style={styles.input}
          autoComplete='name'
          onChangeText={(e) => setPrenom(e)}
          placeholder="Prénom"
          value={prenom}
        />
        <TextInput
          selectionColor={'#79b1db'}
          style={styles.input}
          autoComplete='family-name'
          onChangeText={(e) => setNom(e)}
          placeholder="Nom"
          value={nom}
        />
        <TextInput
          selectionColor={'#79b1db'}
          style={styles.input}
          onChangeText={(e) => setClasse(e)}
          placeholder="Classe"
          value={classe}
        />
        <TextInput
          selectionColor={'#79b1db'}
          style={styles.input}
          keyboardType="numeric"
          autoComplete='tel'
          onChangeText={(e) => setTel(e)}
          placeholder="Numéro Tel."
          value={tel}
        />
        <SelectList
          selectionColor={'#79b1db'}
          boxStyles={{
            borderWidth: 2,
            borderColor: '#79b1db',
            borderRadius: 10,
            padding: 10,
            marginBottom: 17,
            width: '80%',
          }}
          dropdownStyles={{
            top: 45,
            position: 'absolute',
            borderWidth: 3,
            borderColor: '#79b1db',
            borderRadius: 10,
            padding: 10,
            width: '80%',
            backgroundColor: 'white',
            zIndex: 1000,
          }}
          inputStyles={{
            color: 'grey',
          }}
          dropdownTextStyles={{
            color: 'grey',
          }}
          dropdownItemStyles={{
            color: 'grey',
          }}
          data={[
            { label: "Autorise le droit à l'image", value: 'Oui' },
            { label: "N'autorise pas le droit à l'image", value: 'Non' },
          ]}
          search={false}
          primaryColor={'#79b1db'}
          setSelected={(e) => setImage(e)}
          placeholder="Droit à l'image"
          value={image}
          save={image}
        />
        <TextInput
          selectionColor={'#79b1db'}
          style={styles.input}
          autoComplete='email'
          onChangeText={(e) => setEmail(e)}
          placeholder="Email"
          value={email}
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
    borderWidth: 2,
    borderColor: '#79b1db',
    borderRadius: 10,
    padding: 10,
    marginBottom: 17,
    width: '80%',
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#79b1db',
    borderRadius: 20,
    width: '70%',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
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