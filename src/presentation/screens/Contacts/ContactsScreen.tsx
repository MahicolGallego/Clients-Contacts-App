import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Alert, Text, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {RootStackParamsList} from '../../../routes/StackNavigator';
import {GlobalStyles} from '../../theme/global.styles';
import {useContactsList} from '../../hooks/useContactsList';

export const ContactsScreen = () => {
  const {contacts} = useContactsList();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <>
      <View style={GlobalStyles.container}>
        {contacts[0] ? (
          <Text>
            Welcome, {contacts[0].contacts[0].name}, {contacts[0].header}tu
            header es: te has registrado con exito
          </Text>
        ) : (
          <Text>'there arent contacts regiter yet'</Text>
        )}
        <FAB
          label="Press me to navigate to add contact screen"
          onPress={() => navigation.navigate('AddContact')}
        />
        <FAB
          label="Press me to navigate to contact datails screen"
          onPress={() =>
            navigation.navigate('ContactDetails', {contact_id: '1'})
          }
        />
      </View>
    </>
  );
};
