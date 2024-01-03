import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

export default function CrComponent({ data, handleDelete }) {
  return (
    
    <View style={styles.c1}>
      <View style={styles.container}>
        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.heur}>Heur: {data.heur}</Text>
          <Text style={styles.date}>Date: {data.dater}</Text>
          <Text style={styles.nbr}>Nbr-seance: {data.Nbrseance}</Text>
          <Text style={styles.status}>Status: {data.Status}</Text>
          <Button title="Edit" onPress={() => handleDelete(data)} buttonStyle={{borderRadius:15, backgroundColor:"#0A1C7A"}}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowRadius: 20,
    shadowOffset: { width: 10, height: 9 },
    elevation: 15,
    borderRadius: 20,
    width: 350,
    marginTop:20,
    marginBottom:5,
    left:10
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    right:80
  },
  heur: {
    fontSize: 19,
    color: 'black',
    left:-25
  },
  date: {
    fontSize: 19,
    color: 'black',
    top:20,
    left:-25
  },
  nbr: {
    fontSize: 19,
    color: 'black',
    top:-53,
    left:-199
  },
  status: {
    fontSize: 19,
    color: 'black',
    left:-199,
    top:-29,
  },
});
