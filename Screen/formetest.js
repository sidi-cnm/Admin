import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

export default function Nv() {
  const route = useRoute();
  const { formData } = route.params;
  const [formDataArray, setFormDataArray] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    setFormDataArray([formData]);
  }, [formData]);
  
  
  
 console.log("tout le donner : ", formDataArray);

  const handlBack =() => {
  //  console.log("live ???")
    navigation.navigate("Nouvell")
  }
  return (
    <View style={styles.container}>
    <Button title="Nouveau" onPress={handlBack} buttonStyle={{ backgroundColor: '#0A1C7A' , width:96 , height:38 , borderRadius:10 , left:29 }}/>

      <Text style={styles.title}>Liste des formulaires enregistrés :</Text>
      {formDataArray.map((item, index) => (
        <View key={index}>
          <Text style={styles.label}>Nom :</Text>
          <Text style={styles.value}>{item.nom}</Text>
          <Text style={styles.label}>Prénom :</Text>
          <Text style={styles.value}>{item.prenom}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5E5E5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  formDataItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});
