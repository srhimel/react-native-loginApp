import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Create from './src/screens/Create';
import Update from './src/screens/Update';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import FlashMessage from "react-native-flash-message";
import { View, ActivityIndicator } from 'react-native';

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
export const db = getFirestore(app);

const Stack = createNativeStackNavigator();
const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  }

}

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        setUser(user)
      }
      catch (error) {
        console.log(error)
        setUser(null)
      }
      finally {
        setLoading(false)
      }

    })
    return unsubscribe;
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF5A67" />
      </View>
    )
  }

  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator edges={['top', 'left', 'right']}>
        {user
          ?
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }} >
              {props => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create">
              {props => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Update">
              {props => <Update {...props} user={user} />}
            </Stack.Screen>
          </>
          :
          <>
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        }

      </Stack.Navigator>

      <FlashMessage position="bottom" duration={3000} icon="auto" statusBarHeight={30} />
    </NavigationContainer>
  );
}

export default App;