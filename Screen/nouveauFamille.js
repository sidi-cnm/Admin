import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NouveauFamille() {
  const [formData, setFormData] = useState({ nom: '', prenom: '' });
  const navigation = useNavigation();

  const handleSubmit = () => {
   // navigation.navigate('Forme', { formData });
    navigation.navigate('Forme', { formData });
  };

  const handleVoir =()=>{
    navigation.navigate('Forme');
  }

  return (
    <View style={styles.container}>

      
     {/* <TouchableOpacity style={styles.submitButton} onPress={handleVoir}>
        <Text style={styles.submitButtonText}>Voir</Text>
      </TouchableOpacity>    */}
      <TextInput
        style={styles.input}
        value={formData.nom}
        onChangeText={(text) => setFormData({ ...formData, nom: text })}
        placeholder="Votre nom"
      />

      <TextInput
        style={styles.input}
        value={formData.prenom}
        onChangeText={(text) => setFormData({ ...formData, prenom: text })}
        placeholder="Votre prénom"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Soumettre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 60,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#0A1C7A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
