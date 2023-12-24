import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import BottomSheet from '@gorhom/bottom-sheet';

export default function FmComponent({ data, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.nom}>{data.id}</Text>
        <View style={styles.iconContainer}>
          <View style={styles.prenomContainer}>
            <Icon name="user" size={20} type="font-awesome" color="#0A1C7A" />
          </View>
          <Text style={styles.prenom}>{data.title}</Text>
          <TouchableOpacity style={styles.home}>
              <Icon name="home" size={20}  type="font-awesome" color="#0A1C7A" />
          </TouchableOpacity>
         
        </View>
      </View>
      {/* Ligne ajoutée pour créer une séparation */}
      <View style={styles.separator} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 70,
    paddingBottom: -5,
    marginHorizontal: -5,
    marginTop: 10,
    border: 'none',
  },
  nom: {
    fontSize: 20,
    position:"absolute",
    right:15,
    top:0,
    fontWeight: 'medium',
    marginBottom: 10,
    color: '#2c3e50',
  },
  iconContainer: {
    position:"absolute",
    right:103,
    bottom:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prenomContainer: {
    position:'absolute',
    right:240,
    flexDirection: 'row',
  },
  prenom: {
    fontSize: 16,
    position:"absolute",
    left:-1,
    end:-75,
    color: '#7f8c8d',
  },
  home:{
    position:"absolute",
    left:77
  },
  
  separator: {
    height: 2,
    backgroundColor: 'black', // Vous pouvez changer la couleur selon vos besoins
    marginHorizontal: -5,
  },
});
