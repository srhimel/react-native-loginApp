import { View, Text, StyleSheet, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { auth, db } from '../../App';
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';

function Home({ user, navigation, route }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const noteListener = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), key: doc.id })));
    });
    setLoading(false);
    console.log(notes);
    return noteListener;
  }, [])

  const handleDelete = async (key) => {
    await deleteDoc(doc(db, "notes", key))
    showMessage({
      message: ' Success',
      description: 'Item removed Successfully',
      type: "success"
    })
  }

  const handleRenderItem = ({ item }) => {
    return (
      <Pressable style={{
        backgroundColor: item.color,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
      }}
        onPress={() => navigation.navigate('Update', { note: item })}>

        <View>
          <Pressable
            onPress={() => handleDelete(item.key)}
            style={{
              position: 'absolute',
              top: 0,
              right: 5,
              zIndex: 9
            }}>
            <MaterialCommunityIcons name="delete-circle" size={24} color="white" />
          </Pressable>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <Text style={styles.noteDescription}>{item.description}</Text>
        </View>
      </Pressable>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <Button onPress={() => signOut(auth)}> signout</Button> */}
      <View style={styles.header}>
        <Text style={styles.headerText}> My Notes</Text>
        <Pressable onPress={() => navigation.navigate('Create')}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.list}>
        {
          loading ? <ActivityIndicator /> : <FlatList
            data={notes}
            renderItem={handleRenderItem}
            keyExtractor={(_, i) => i} />

        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  list: {
    marginTop: 20
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff'
  },
  noteDescription: {
    color: '#fff'
  }
})

export default Home;