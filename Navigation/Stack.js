import { createStackNavigator } from '@react-navigation/stack';
import Login  from '../Screen/Login';
import Test from '../Screen/test';
import Cours from '..//Screen/cour'; 
import Detaille from '..//Screen/detaillpersone'
import NouveauFamille from '..//Screen/nouveauFamille'
import Nv from '..//Screen/formetest'


const Stack = createStackNavigator();


export default function HomeStack() {
  return (
            <Stack.Navigator screenOptions={{
                headerShown: false, 
              }}>
               <Stack.Screen name="Home" component={Login} />
               <Stack.Screen name="IN" component={Test} />
               <Stack.Screen name="cour" component={Cours} />
               <Stack.Screen name="detaille" component={Detaille} />
               <Stack.Screen name="Nouvell" component={NouveauFamille} />
               <Stack.Screen name="Forme" component={Nv} />
            </Stack.Navigator>
  );
}