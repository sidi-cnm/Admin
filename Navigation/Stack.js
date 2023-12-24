import { createStackNavigator } from '@react-navigation/stack';
import Login  from '../Screen/Login';
import Test from '../Screen/test';
import Cours from '..//Screen/cour';


const Stack = createStackNavigator();


export default function HomeStack() {
  return (
            <Stack.Navigator screenOptions={{
                headerShown: false, 
              }}>
               <Stack.Screen name="Home" component={Login} />
               <Stack.Screen name="IN" component={Test} />
               <Stack.Screen name="cour" component={Cours} />
            </Stack.Navigator>
  );
}