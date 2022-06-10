import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { auth } from '../../App';
import { signOut } from 'firebase/auth';

function Home({ user, navigation }) {
  return (
    <SafeAreaView>
      <Button onPress={() => signOut(auth)}> signout</Button>
      <Text>Home Screen {user.email}</Text>
    </SafeAreaView>
  );
}

export default Home;