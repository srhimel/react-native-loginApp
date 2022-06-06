import { StyleSheet, Text, View, Image, Dimensions, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Button from '../components/Button';
import Footer from '../components/Footer';
import Input from '../components/Input';
import RadioInput from '../components/RadioInput';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../App'

const { width, height } = Dimensions.get('window')

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const googleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Input placeholder="Email Address" onChangeText={(text) => setEmail(text)} />
        <Input placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
        <Input placeholder="Full Name" />
        <Input placeholder="Age" />
        <Text style={{ marginVertical: 10 }}> Select Gender</Text>
        <RadioInput option={['Male', 'Female']} gender={gender} setGender={setGender} />
        <Button customStyle={{ marginTop: 20 }} onPress={googleSignUp}>Sign Up </Button>
      </View>
      <Footer>
        <Pressable onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.text}>Already have an account? &nbsp;
            <Text style={{
              color: '#FF5A67',
              fontWeight: 'bold',
              paddingLeft: 5
            }}> Sign In</Text>
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