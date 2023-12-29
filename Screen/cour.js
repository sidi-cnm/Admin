import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import CrComponent from "../component/cours-component"
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Cours() {
  const route = useRoute();
  const { id } = route.params;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`https://4c61-41-188-104-99.ngrok-free.app/cours/?id_prenant=${id}`)
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

  const nav = useNavigation()
  const back =()=>{
    nav.navigate("IN")
  }

  return (
    <View style={styles.container}>

       <Button  buttonStyle={{
          backgroundColor: '#0A1C7A',
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          left:280,
          height:33,
          width:80}} 
          titleStyle={{
             left:5,
             height:20,
             top:-3
          }}
          onPress={back}
          title="back"

          />
       <Text style={{top:-38, left:-160, fontSize:29, fontWeight:"bold"}}>Cours</Text>
       <TextInput
         placeholder='name'
         style={styles.inpt}
         />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flat}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:"100%",
    flex: 1, 
    marginTop:110,
  },

  flat:{
    display:"flex",
    height:"100%"
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
