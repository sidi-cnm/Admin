
import { useEffect, useState } from 'react';
import {  Text,StyleSheet, TextInput ,FlatList ,TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import BottomSheet from '@gorhom/bottom-sheet';
import FmComponent from '../component/famille-component'
import { Button } from 'react-native-elements';
import React, { useMemo, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Test(){

    const[data , setData] = useState([])
    const [search, setSearch] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const[change, setIschange]=useState(false);
    const [showForm, setShowForm] = useState(false);
    const[ajouter, setAjouter]=useState({
      title:""
    })
  
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    

    const handleDelte=()=>{
      
      console.log("c`est bon sa marche");
    }

    useEffect(() => {
      axios
        .get(`https://cb66-41-188-105-168.ngrok-free.app/users/?page=${currentPage}`)
        .then((res) => {
          console.log("Data from API:", res.data);
          setData((prevData) => (currentPage === 1 ? res.data : [...prevData, ...res.data]));
          setTotalPages(res.data.totalPages, () => {
            console.log(totalPages);
          });
          //console.log(totalPages);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [currentPage, change]);
    


  const snapPoints = useMemo(() => ['15%', '50%'], []);
  const refBottomSheet = useRef(null);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
   // console.log(userId)
    refBottomSheet.current?.expand();
  };
  

  const handleAdd = () => {
    if (ajouter.title === "") {
      console.log("Saisissez des données ici");
    } else {
      axios.post("https://cb66-41-188-105-168.ngrok-free.app/users", ajouter)
        .then(() => {
          // Fetch the updated data after adding a new user
          return axios.get("https://cb66-41-188-105-168.ngrok-free.app/users/");
        })
        .then((res) => {
          setData(res.data);
          setShowForm(false);
          setAjouter({ title: "" });
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };
  
  const handleDelete = () => {
    if (selectedUserId !== null) {
      axios.delete(`https://cb66-41-188-105-168.ngrok-free.app/users/${selectedUserId}`)
        .then(() => {
          // Fetch the updated data after deleting the user
          return axios.get("https://cb66-41-188-105-168.ngrok-free.app/users/");
        })
        .then((res) => {
          setData(res.data);
          refBottomSheet.current?.close();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } else {
      console.warn("No user selected for deletion");
      refBottomSheet.current?.close();
    }
  };
  
 

  

  const handleShowForm = () => {
    console.log("hello")
    setShowForm(true);
  };

  const handleCloseform=()=>{
    setShowForm(false);
  }

 

  const handleLoadMore = () => {
    console.log('Loading more data...');
    console.log(totalPages)
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    setCurrentPage(1); 
    const filteredData = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
    //  setData(filteredData);
    //setData(text.trim() === '' ? data : filteredData);
    console.log(text);

    if (text.trim() === '') {
      setIschange(!change);
    } else {
     // const filteredData = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
      setData(filteredData);
    }
    
  };
  
      
    
    
  const renderItem = ({ item }) => (
  <FmComponent data={item} onPress={() => handleSelectUser(item.id)} /> 
      );

  
    const Navigation = useNavigation()
    const handlecour = ()=>{
      console.log(selectedUserId);
      Navigation.navigate('cour' , { id: selectedUserId } );
    }

    return(

      <GestureHandlerRootView >
        <View style={styles.container}>

        <Text style={{fontSize: 28,  marginTop:50 , marginRight:40}}>Liste des familles</Text>

          <View style={styles.inputContainer}>
           <Button title="+" onPress={handleShowForm} buttonStyle={{ backgroundColor: '#0A1C7A' , width:46 , height:38 , borderRadius:10 }}/>
           <TextInput 
            style={styles.input} 
            placeholder="Search" 
            value={search}
            onChangeText={(text) => handleSearch(text)}
           />
          </View>

          {showForm && (
          <View style={styles.overlay}>
          <View style={styles.formulaire}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseform}>
              <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
            <Text style={{color:"black" , position:"absolute", left:100, fontSize:29,fontWeight:"bold" , bottom:190}}>Add users</Text>
            <TextInput
             value={ajouter.name}
             onChangeText={(text) => setAjouter({ ...ajouter, title: text })}
             placeholder='name'
             style={styles.inputadd}
             />
             <View style={styles.btnsubmit} >
             <Button title="Submit" onPress={handleAdd} style={{color:"black"}}  />
             </View>
          </View>
          </View>
        )}
      
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={<View style={styles.headerSpace}
        ListFooterComponent={() => (
        <Button
          title="Load More"
          onPress={handleLoadMore}
          disabled={currentPage >= totalPages}
        />
      )}
        
         />}
          />

        
        <BottomSheet style={styles.bottoms} index={0} ref={refBottomSheet} snapPoints={snapPoints}>
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.delte} onPress={handleDelete}>
               <Icon name="delete" style={styles.btndelete} size={35} type="material" color="#0A1C7A" />
               <Text style={styles.textdelte}>Supprimer</Text>
            </TouchableOpacity>

            <View style={styles.infoper}>
               <Icon name="info" style={styles.btninfo} size={35} type="material" color="#0A1C7A" />
               <Text style={styles.textinfo}>Info pers</Text>
            </View>

            <TouchableOpacity onPress={handlecour} style={styles.cour}>
               <Icon name="info" style={styles.btncour} size={35} type="material" color="#0A1C7A" />
               <Text style={styles.textcour}>Info cour</Text>
            </TouchableOpacity>
           
            
          </View>
        </BottomSheet>
    
      </View>
    </GestureHandlerRootView> 
    );
}

const styles = StyleSheet.create({
  container: {
   height:1233,
   width:'auto'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond sombre semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginRight:10,
    marginTop:20
  },
  input: {
    flex: 1,
    height: 50,
    width:282,
    borderRadius:10,
    borderWidth: 0,
    marginRight: 10,
    marginLeft:15,
    paddingRight:40,
    backgroundColor:'#D7E4EF'
    
  },
 
  headerSpace: {
    height: 0,
  },
  bottoms:{
    position: 'absolute',
  },

  delte:{
    position:"absolute",
    width:120,
    height:80,
    backgroundColor:"#F1F1F1",
    bottom:-130,
    borderRadius:20,
    left:259
  },
  btndelete:{
    marginLeft:10,
    marginTop:15,
  },
  textdelte:{
    marginRight:25,
    fontSize:16,
    fontStyle:"normal",
    fontWeight:"bold"
  },
  infoper:{
    position:"absolute",
    width:120,
    height:80,
    backgroundColor:"#F1F1F1",
    borderRadius:20,
    bottom:-130,
    left:133
  },
  btninfo:{
    marginLeft:10,
    marginTop:15,
  },
  textinfo:{
    marginRight:25,
    fontSize:16,
    fontStyle:"normal",
    fontWeight:"bold"
  },
  cour:{
    position:"absolute",
    width:120,
    height:80,
    backgroundColor:"#F1F1F1",
    borderRadius:20,
    bottom:-130,
    left:5
  },

  btncour:{
    marginLeft:10,
    marginTop:15,
  },

  textcour:{
    marginRight:25,
    fontSize:16,
    fontStyle:"normal",
    fontWeight:"bold"
  },
  formulaire:{
    position:"absolute",
    backgroundColor:"white",
    borderRadius:20,
    top:250,
    left: 40,
    height:250,
    width:300,
    zIndex: 1,
  },

  inputadd:{
    position:"absolute",
    top:80,
    left:10,
    backgroundColor:"#F1F1F1",
    width:280,
    height:50,
    borderRadius:10
  },
  btnsubmit:{
    position:"absolute",
    top:160,
    left:20,
    borderWidth: 1, 
    borderColor: 'black', // Couleur de la bordure
    borderRadius: 5, // Rayon de la bordure pour arrondir les coins (optionnel)
    padding: 0,
    width:250
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 250,
  },
  closeButtonText:{
    fontSize: 30,
    color: 'red',
  }

});


  
