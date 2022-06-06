import { StyleSheet, Text, View, Image, Dimensions, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Button from '../components/Button';
import Footer from '../components/Footer';
import Input from '../components/Input';

const { width, height } = Dimensions.get('window')

export default function SignIn({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/login.png')} />
      <View style={styles.form}>
        <Text style={styles.title}>Never Forget Your Notes</Text>
        <Input placeholder="Email Address" />
        <Input placeholder="Password" secureTextEntry={true} />
        <Button customStyle={{ marginTop: 20 }}>Login </Button>
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