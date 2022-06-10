import { StyleSheet, Text, View, Image, Dimensions, Pressable, TextInput, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Button from '../components/Button';
import Footer from '../components/Footer';
import Input from '../components/Input';
import RadioInput from '../components/RadioInput';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../App';
import {
  addDoc,
  collection,
  getDoc,
  doc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { showMessage } from 'react-native-flash-message';

const { width, height } = Dimensions.get('window')

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loginLoading, setLoginLoading] = useState(false)

  const googleSignUp = async () => {
    try {
      setLoginLoading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, 'users'), {
        name,
        email,
        age,
        gender,
        uid: result.user.uid
      })
      showMessage({
        message: ' Success',
        description: 'Signed Up Successfully',
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
      <View style={styles.form}>
        <Input placeholder="Email Address" onChangeText={(text) => setEmail(text)} autoCapitalize={"none"} />
        <Input placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} autoCapitalize={"none"} />
        <Input placeholder="Full Name" onChangeText={(text) => setName(text)} autoCapitalize={"words"} />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />
        <Text style={{ marginVertical: 10 }}> Select Gender</Text>
        <RadioInput option={['Male', 'Female']} gender={gender} setGender={setGender} />
        <Button customStyle={{ marginTop: 20 }} onPress={googleSignUp}>{loginLoading ? <ActivityIndicator size={13.1} color="#fff" /> : 'Sign Up'} </Button>
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