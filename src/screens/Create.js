import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Input from '../components/Input';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../App';
import RadioInput from '../components/RadioInput';
import Button from '../components/Button';
import { showMessage } from 'react-native-flash-message';

export default function Create({ navigation, route, user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('blue');
  const [loading, setLoading] = useState(false);

  const createNote = async () => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'notes'), {
        title,
        description,
        color,
        uid: user.uid
      });
      showMessage({
        message: ' Success',
        description: 'Note Created Successfully',
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
      setLoading(false);
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formWrapper}>
        <Input placeholder="Title" onChangeText={(text) => setTitle(text)} />
        <Input placeholder="Description" multiline={true} onChangeText={(text) => setDescription(text)} />
        <Text style={{ marginVertical: 30 }}>Select Color</Text>
        <RadioInput options={['red', 'blue', 'green']} select={color} setSelect={setColor} />
        <Button loading={loading} onPress={createNote} customStyle={{ width: '100%' }}>Create Note</Button>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  formWrapper: {},
})