
import { useEffect, useState } from 'react';
import {  Text,StyleSheet, TextInput ,FlatList , ScrollView ,TouchableOpacity, View } from 'react-native';
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
      title:"",
      place:"",
      Email:"",
      Numero:null,
      Id_infant:null,
    })
  
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const Navigation = useNavigation()
    

    

    useEffect(() => {
      axios.get("https://ef36-41-188-101-189.ngrok-free.app/users/")
        .then((res) => {
          console.log("hello")
          console.log("Data from API:", res.data);
          setData(res.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

   
    }, [change]);
    


  const snapPoints = useMemo(() => ['1%', '22%'], []);
  const refBottomSheet = useRef(null);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
   // console.log(userId)
    refBottomSheet.current?.expand();
  };
  
  

  const handleAdd=() =>{

    if(ajouter.title === ""){
      console.log("saisi des donner ici");
    }
    else{
      axios.post("https://ef36-41-188-101-189.ngrok-free.app/users" , ajouter);
      setIschange(!change);
      setShowForm(false);
      setAjouter({title:""})
    }
   
  }

  const handleDelete = () => {
    if (selectedUserId !== null) {
      axios.delete(`https://ef36-41-188-101-189.ngrok-free.app/users/${selectedUserId}`)
        .then((response) => {
          if (response.status === 200) {
            console.log("User with ID", selectedUserId, "has been deleted");
            
            const newData = data.filter((item) => item.ID !== selectedUserId);
            
            setIschange(!change);
          } 
          else {
            console.error("Failed to delete user. API response:", response);
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        })
        .finally(() => {
         
          refBottomSheet.current?.close();
        });
    } else {
      console.warn("No user selected for deletion");
      refBottomSheet.current?.close();
    }
  };
 

  

  const handleShowForm = () => {
    //console.log("hello")
    setShowForm(true);
  };

  const handleCloseform=()=>{
    setShowForm(false);
  }

  const handleInfo =()=>{
    Navigation.navigate("detaille",  { id: selectedUserId });
  }

 

  

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
    console.log(text);

    if (text.trim() === '') {
      setIschange(!change);
    } else {
      setData(filteredData);
    }
    
  };
  
      
    
    
    const renderItem = ({ item }) => (
    
      <FmComponent data={item} onPress={() => handleSelectUser(item.id)} /> 
   
      );


      const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
    
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
          // L'utilisateur a atteint le bas, chargez plus de données
          if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        }
      };

  
  
    const handlecour = ()=>{
      console.log(selectedUserId);
      Navigation.navigate('cour' , { id: selectedUserId } );
    }

    const handleNouvell =()=>{
      Navigation.navigate('Nouvell');
    }

    return(

      
    
      <GestureHandlerRootView >
        <View style={styles.container}>
              

        <Text style={{fontSize: 28,  marginTop:50 , marginRight:40}}>Liste des familles</Text>
          
        <Button title="Nouveau" onPress={handleNouvell} buttonStyle={{ backgroundColor: '#0A1C7A' , width:96 , height:38 , borderRadius:10 , left:29 }}/>
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
            <Text style={{color:"black" , position:"absolute", left:95, fontSize:29,fontWeight:"bold" , bottom:390}}>Add users</Text>
            <TextInput
             value={ajouter.name}
             onChangeText={(text) => setAjouter({ ...ajouter, title: text })}
             placeholder='title'
             style={styles.inputadd}
             />
             
             <TextInput
               value={ajouter.place}
               onChangeText={(text)=>setAjouter({...ajouter,place:text})}
               placeholder='place'
               style={styles.inputplace}
               />

             <TextInput
               value={ajouter.Email}
               onChangeText={(text)=>setAjouter({...ajouter,Email:text})}
               placeholder='Email'
               style={styles.inputemail}
               />

             <TextInput
               value={ajouter.Numero}
               onChangeText={(text)=>setAjouter({...ajouter,Numero:text})}
               placeholder='Numero'
               style={styles.inputNumero}
               />
             <View style={styles.btnsubmit} >
             <Button title="Submit" onPress={handleAdd} buttonStyle={{color:"black" , left:4, width:290 , height:45 , borderRadius:10 }}  />
             </View>
          </View>
          </View>
        )}
      
        {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View style={styles.headerSpace}
        
         />}
          /> */}
    
      <ScrollView>
             {data.map((item) => (
                 <FmComponent key={item.id} data={item} onPress={() => handleSelectUser(item.id)} />
              ))}  
       </ScrollView>
        
        <BottomSheet style={styles.bottoms} index={0} ref={refBottomSheet} snapPoints={snapPoints}>
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.delte} onPress={handleDelete}>
               <Icon name="delete" style={styles.btndelete} size={35} type="material" color="#0A1C7A" />
               <Text style={styles.textdelte}>Supprimer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleInfo} style={styles.infoper}>
               <Icon name="info" style={styles.btninfo} size={35} type="material" color="#0A1C7A" />
               <Text style={styles.textinfo}>Info pers</Text>
            </TouchableOpacity>

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
   height:"100%",
   width:'auto'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
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
    top:120,
    left: 40,
    height:450,
    width:300,
    zIndex: 1,
  },

  inputadd:{
    position:"absolute",
    top:80,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  inputplace:{
    position:"absolute",
    top:140,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  inputemail:{
    position:"absolute",
    top:200,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  
  inputNumero:{
    position:"absolute",
    top:260,
    left:20,
    paddingRight:35,
    backgroundColor:"#F1F1F1",
    width:265,
    height:50,
    borderRadius:10
  },
  btnsubmit:{
    width:"auto",
    top:350
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


  
