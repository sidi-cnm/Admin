import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {  Text,StyleSheet, TextInput ,TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';


// Khatu et Ahlam : Component et page
// Sidi :  Relier le page avec backend et faire le navigation entre le page
// Emani : Valider le fromulaire et recupere le donner de formulaire et envoyer vers backend
// Creation de table de base de donner 
// Etudiant , Enseigent , ..............


export default function Login() {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[data,setData]= useState([]);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

    useEffect(() => {
        axios.get("https://sidi-cnm.github.io/FrontApi/utilisateur.json")
          .then((res) => {
            setData(res.data);
            console.log(res.data)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });

     
      }, []);
    
    
    const Navigation = useNavigation()
    const naviger =()=>{
        Navigation.navigate('IN')
    }

    const showErrorAlert = () => {
        setIsErrorModalVisible(true);
      };

      const closeErrorAlert = () => {
        setIsErrorModalVisible(false);
      };

    const Log=()=>{
        const connecter = data.find((item) => item.Numero_de_telephone == name && item.Psswd === email);
        
        if(connecter){
          if(connecter.etudiant){
            console.log("etudiant")
          }
          else if(connecter.prof){
              //console.log("prof")
              Navigation.navigate('IN')
          }
          else if(connecter.famille){
            console.log("famille")
            // Navigation.navigate('IN')

          }
            
        }
       

        else{
            showErrorAlert();
            setEmail('')
            setName('')
        }
    }

 
  return (
    <View style={styles.container}>

        <View style={styles.header}>
          <Icon name="user" size={100} color="blue" />
        </View>    
        
          
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(parseInt(text, 10))}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={email}
          onChangeText={text=>setEmail(text)}
          secureTextEntry={true}
        />
        
        <TouchableOpacity onPress={Log} style={styles.button} >
          <Text style={styles.buttonText}>Soumettre</Text>
        </TouchableOpacity>
        <View style={styles.linksContainer}>
          <Text onPress ={naviger}style={styles.link}>S'inscrire</Text>
          <Text style={styles.link} >Mot de passe oublié</Text>
        </View>
   

        <TouchableOpacity style={{backgroundColor:'white', borderRadius:10,height:50, borderColor:"#c5c5c5",width:170,marginLeft:70,marginTop:90, borderColor:"black"}}>
             <Icon name="phone" size={40} color="blue" style={{marginTop:3, marginRight:15}} />
            <Text style={{padding:10, marginRight:50 , fontSize: 15, color:'black',marginTop:-45}}>Constacts</Text>
        </TouchableOpacity>


        <Modal isVisible={isErrorModalVisible}>
             <View style={styles.errorModalContainer}>
                <Text style={styles.errorModalText}>Erreur : Vos informations incorrectes.</Text>
                <TouchableOpacity onPress={closeErrorAlert}>
                    <Text style={styles.closeButton}>Fermer</Text>
                </TouchableOpacity>
              </View>
       </Modal>
        
      </View>
      
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 50,
      paddingTop:100,
      borderWidth: 1,
      borderColor: 'white',
      marginTop:0,
      marginBottom:-6,
      borderTopLeftRadius:100,
      borderTopRightRadius:100,
      borderBottomLeftRadius:100,
      borderBottomRightRadius:100,
    },
    
    input: {
      height: 50,
      margin:0,
      borderColor: '#c5c5c5', 
      backgroundColor:'white',
      borderWidth: 1, 
      borderRadius:50,
      marginVertical:5,
      marginBottom: 40,
      paddingRight: 50,
      width:300,
      shadowColor: 'black', 
      shadowOffset: { width: 4, height: 2 }, 
      shadowOpacity: 0.9, 
      shadowRadius: 10, 
      elevation: 5, 
      
    },
    button: {
      backgroundColor: 'blue',
      margin:3,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      width:170,
      marginLeft:70
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    linksContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      padding:40
    },
    link: {
      color: 'blue',
      textDecorationLine: 'underline',
      paddingTop:20
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
      },
      errorModalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      },
      errorModalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'red'
      },
      closeButton: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
      },
  });
