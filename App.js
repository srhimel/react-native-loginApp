import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/screens/Home';
import Create from './src/screens/Create';
import Update from './src/screens/Update';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAV1mXU4689L0lxInOpfkoSWYnUKqYQVRo",
  authDomain: "native-login-102aa.firebaseapp.com",
  projectId: "native-login-102aa",
  storageBucket: "native-login-102aa.appspot.com",
  messagingSenderId: "962660439809",
  appId: "1:962660439809:web:0bedd6f89980058e68ed00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const Stack = createNativeStackNavigator();
const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  }

}

function App() {
  const user = false;
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={myTheme}>
        <Stack.Navigator edges={['top', 'left', 'right']}>
          {user
            ?
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Create" component={Create} />
              <Stack.Screen name="Update" component={Update} />
            </>
            :
            <>
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          }

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;