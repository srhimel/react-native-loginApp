import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Input from '../components/Input';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../App';
import RadioInput from '../components/RadioInput';
import Button from '../components/Button';
import { showMessage } from 'react-native-flash-message';

export default function Update({ navigation, route, user }) {
  const note = route.params.note;
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [color, setColor] = useState(note.color);
  const [loading, setLoading] = useState(false);

  const updateNote = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'notes', note.key);
      await updateDoc(docRef, {
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
        <Input placeholder="Title" onChangeText={(text) => setTitle(text)} value={title} />
        <Input placeholder="Description" multiline={true} onChangeText={(text) => setDescription(text)} value={description} />
        <Text style={{ marginVertical: 30 }}>Select Color</Text>
        <RadioInput options={['red', 'blue', 'green']} select={color} setSelect={setColor} />
        <Button loading={loading} onPress={updateNote} customStyle={{ width: '100%' }}>Create Note</Button>
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