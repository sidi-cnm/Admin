import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Detaille() {
  const [data, setData] = useState([]);

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    axios.get(`https://4c61-41-188-104-99.ngrok-free.app/users/?id=${id}`).then((res) => {
      setData(res.data);
      console.log(id);
    });
  }, []);

  return (
    <View style={styles.Alldata}>

    <View style={styles.btndelete} >
      <Icon name="user" size={105} type="material" color="#0A1C7A" />
    </View>
      {data.map((item) => (
        <View style={styles.data} key={item.id}>
        <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.place}>{item.place}</Text>
          <View style={styles.line} /> 
          <Text style={styles.Email}>{item.Email}</Text>
          <View style={styles.line} />
          <Text style={styles.Numero}>{item.Numero}</Text>
          <View style={styles.line} />
          {/* <Text style={styles.title}>{item.title}</Text> */}
          <View style={styles.line} />
          
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  Alldata: {
    margin: 50,
    padding: 0,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#DAD8D8', // Choose your line color
    marginBottom: 50, // Adjust spacing between lines and Text elements
  },
  data: {
    backgroundColor: 'white',
    width: 410,
    height: 590,
    elevation: 15,
    left: -40,
    borderRadius: 35,
    top: 290,
  },
  place: {
    left: 40,
    top: 45,
  },
  Email: {
    left: 40,
    top: 45,
  },
  Numero: {
    left: 40,
    top: 45,
  },
  title: {
    left: 40,
    top: 35,
  },
  
  btndelete:{
    top:102,
    left:120
  },

  title:{

    top:-160,
    left:140,
    fontWeight:"bold",
    fontSize:30
  }
  
});
