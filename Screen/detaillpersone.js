import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Detaille() {
  const [data, setData] = useState([]);

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    axios.get(`https://ef36-41-188-101-189.ngrok-free.app/users/?id=${id}`).then((res) => {
      setData(res.data);
      console.log(id);
    });
  }, []);

  const nav = useNavigation()
  const back =()=>{
    nav.navigate("IN")
  }
  
  return (
    <View style={styles.Alldata}>

    <View style={{width:400, height:"auto"}}>
    <Button  buttonStyle={{
          backgroundColor: '#0A1C7A',
          borderRadius: 10,
          left:240,
          height:33,
          width:70}} 
          titleStyle={{
             left:5,
             height:20,
             top:-3
          }}
          onPress={back}
          title="back"
          />
      </View>    
    <Text style={{fontWeight:"bold", fontSize:25, left:-29,top:20}}>informations Personelle</Text>
    <View style={styles.btndelete} >
      <Icon name="user" size={105} type="material" color="#0A1C7A" />
    </View>
      {data.map((item) => (
        <View style={styles.data} key={item.id}>
        <Text style={{position:"absolute", left:152, top:24, fontSize:25, fontWeight:"bold" }}>Detaille de Famille</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Icon name="map-marker" style={{left:-22 , top:65}} size={22} type="material" color="#0A1C7A" />
          <Text style={styles.place}>{item.place}</Text>
        <Icon name="envelope" style={{left:-22 , top:110}} size={22} type="material" color="#0A1C7A" />
          <View style={styles.line} /> 
          <Text style={styles.Email}>{item.Email}</Text>
          <View style={styles.line} />
          <Text style={styles.Numero}>{item.Numero}</Text>
          <Icon name="phone" style={{left:-22 , top:-2}} size={22} type="material" color="#0A1C7A" />
          <View style={styles.line} />
          <View style={styles.line} />
          
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  Alldata: {
    margin: 50,
    width:"auto",
    padding: 0,
  },
  line: {
    borderBottomWidth: 1,
    top:-40,
    borderColor: '#DAD8D8', // Choose your line color
    marginBottom: 50, // Adjust spacing between lines and Text elements
  },
  data: {
    backgroundColor: 'white',
    width: 410,
    height: 630,
    elevation: 15,
    left: -70,
    borderRadius: 35,
    top:180,
  },
  place: {
    left: -68,
    fontSize:20,
    top: 38,
  },
  Email: {
    left: -68,
    fontSize:20,
    top: 30,
  },
  Numero: {
    left: -68,
    fontSize:20,
    top: 24,
  },

 
  title:{
    top:-120,
    left:-141,
    fontWeight:"bold",
    fontSize:39
  },

  btndelete:{
    top:70,
    left:-100
  }
  
});
