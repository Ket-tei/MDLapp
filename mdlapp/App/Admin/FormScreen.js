import React, { useState } from 'react';
import { View, TextInput, ScrollView, Button, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { XWing } from "../Commun/XWing";

function FormScreen() {
	const [prenom, setPrenom] = useState('');
	const [nom, setNom] = useState('');
	const [classe, setClasse] = useState('');
	const [tel, setTel] = useState('');
	const [image, setImage] = useState('');
	const [email, setEmail] = useState('');

  const [isRegistered, setIsRegistered] = useState(false);

	const handleSubmit = async (e) => {
    setIsRegistered(true);
		e.preventDefault();
    
    var acessToken = "";

    XWing(acessToken, "A7", [nom, prenom, classe, tel, image, email])

    setNom('');
    setPrenom('');
    setClasse('');
    setTel('');
    setEmail('');
	};

	return (
		<ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Ajouter un Adhérant</Text>

        <TextInput
          selectionColor={'#ffc265'}
          style={styles.input}
          autoComplete='name'
          onChangeText={(e) => setPrenom(e)}
          placeholder="Prénom"
          value={prenom}
        />
        <TextInput
          selectionColor={'#ffc265'}
          style={styles.input}
          autoComplete='family-name'
          onChangeText={(e) => setNom(e)}
          placeholder="Nom"
          value={nom}
        />
        <TextInput
          selectionColor={'#ffc265'}
          style={styles.input}
          onChangeText={(e) => setClasse(e)}
          placeholder="Classe"
          value={classe}
        />
        <TextInput
          selectionColor={'#ffc265'}
          style={styles.input}
          keyboardType="numeric"
          autoComplete='tel'
          onChangeText={(e) => setTel(e)}
          placeholder="Numéro Tel."
          value={tel}
        />
        <SelectList
          selectionColor={'#ffc265'}
          boxStyles={{
            borderWidth: 3,
            borderColor: '#ffc265',
            borderRadius: 10,
            padding: 10,
            marginBottom: 17,
            width: '80%',
          }}
          dropdownStyles={{
            top: 45,
            position: 'absolute',
            borderWidth: 3,
            borderColor: '#ffc265',
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
          pl
          data={[
            { label: "Autorise le droit à l'image", value: 'Oui' },
            { label: "N'autorise pas le droit à l'image", value: 'Non' },
          ]}
          search={false}
          primaryColor={'#ffc265'}
          setSelected={(e) => setImage(e)}
          placeholder="Droit à l'image"
          value={image}
          save={image}
        />
        <TextInput
          selectionColor={'#ffc265'}
          style={styles.input}
          keyboardType="email"
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