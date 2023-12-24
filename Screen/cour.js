import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import CrComponent from "../component/cours-component"
import { TextInput } from 'react-native-gesture-handler';

export default function Cours() {
  const route = useRoute();
  const { id } = route.params;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`https://cb66-41-188-105-168.ngrok-free.app/cours/?id_prenant=${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Erreur de requête:', error);
      });

  }, [id]);

  const renderItem = ({ item }) => {
    return (
      <CrComponent data={item} />
    )
  };

  return (
    <View style={styles.container}>
       
       <TextInput
         placeholder='name'
         style={styles.inpt}
         />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop:110,
  },

  inpt:{
    backgroundColor:"grey",
    width:350,
    left:20,
    height:50,
    borderRadius:20,
    paddingRight: 50,
    paddingTop:-5,
    top:-15
  }
});
