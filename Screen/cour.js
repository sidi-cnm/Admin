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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    heur: '',
    dater:'',
    Nbrseance:null,
    Status:''
    
  });

  useEffect(() => {
    axios.get(`https://ef36-41-188-101-189.ngrok-free.app/cours/?id_prenant=${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Erreur de requête:', error);
      });

  }, [id]);


  const handleEdit = (item)=>{
    console.log(item.name);
    setFormData({
      ...formData, 
      heur:item.heur,
      dater:item.dater,
      Nbrseance:item.Nbrseance.toString(),
      Status:item.Status


    })
    setShowForm(true);
  }
  const renderItem = ({ item }) => {
    return (
      <CrComponent data={item} handleDelete={() => handleEdit(item)} />
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
      
     { showForm && (
      <View style={styles.formulaire}>
           <TextInput
            placeholder='name'
            value={formData.heur}
            onChangeText={(text) => setFormData({ ...formData, heur: text })}
            style={styles.inp1}
           />

           <TextInput
            placeholder='name'
            value={formData.dater}
            onChangeText={(text) => setFormData({ ...formData, dater: text })}
            style={styles.inp2}
           />

        <TextInput
            placeholder='name'
            value={formData.Nbrseance}
            onChangeText={(text) => setFormData({ ...formData, Nbrseance: text })}
            style={styles.inp3}
           />

       <TextInput
            placeholder='name'
            value={formData.Status}
            onChangeText={(text) => setFormData({ ...formData, Status: text })}
            style={styles.inp4}
           />

      <View style={styles.btnsubmit} >
       <Button title="Submit"  buttonStyle={{color:"black" , left:4, top:-1, width:290 , height:50 , borderRadius:10 }}  />    
       </View>      
      </View>
     )}
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
  },
  formulaire:{
    position:"absolute",
    backgroundColor:"white",
    borderRadius:20,
    top:120,
    left: 40,
    height:450,
    width:300,
    zIndex: 1,
  },
  inp1:{
    top:70,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },

  inp2:{
    position:"absolute",
    top:140,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  inp3:{
    position:"absolute",
    top:210,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  inp4:{
    position:"absolute",
    top:275,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  btnsubmit:{
    width:"auto",
    height:'auto',
    top:300
  },
});
