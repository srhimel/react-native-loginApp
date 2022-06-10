import { StyleSheet, Text, View, Image, Dimensions, Pressable, TextInput, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Button from '../components/Button';
import Footer from '../components/Footer';
import Input from '../components/Input';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { auth } from '../../App';

const { width, height } = Dimensions.get('window')

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const googleSignIn = async () => {
    try {
      setLoginLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      showMessage({
        message: ' Success',
        description: 'Signed In',
        type: "success"
      })
    }
    catch (error) {
      console.log(error)
      showMessage({
        message: 'Error',
        description: error.message,
        type: "danger",
      });
    }
    finally {
      setLoginLoading(false)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/login.png')} />
      <View style={styles.form}>
        <Text style={styles.title}>Never Forget Your Notes</Text>
        <Input placeholder="Email Address" onChangeText={(text) => setEmail(text)} autoCapitalize={"none"} />
        <Input placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} autoCapitalize={"none"} />
        <Button customStyle={{ marginTop: 20 }} onPress={googleSignIn}>{loginLoading ? <ActivityIndicator size={13.1} color="#fff" /> : 'Login'} </Button>
      </View>
      <Footer>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.text}>Don't have an account? &nbsp;
            <Text style={{
              color: '#FF5A67',
              fontWeight: 'bold',
              paddingLeft: 5
            }}> Sign Up</Text>
          </Text>
        </Pressable>
      </Footer>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: width,
    height: 200,
    resizeMode: 'contain',
  },
  form: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
  },
})