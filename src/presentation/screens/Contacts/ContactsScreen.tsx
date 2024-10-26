import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {RootStackParamsList} from '../../../routes/StackNavigator';

export const ContactsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <>
      <View>
        <Text>Hi from Home Screen</Text>
      </View>
      <FAB
        label="Press me to navigate to add contact screen"
        onPress={() => navigation.navigate('AddContact')}
      />
      <FAB
        label="Press me to navigate to contact datails screen"
        onPress={() => navigation.navigate('ContactDetails', {contact_id: '1'})}
      />
    </>
  );
};
