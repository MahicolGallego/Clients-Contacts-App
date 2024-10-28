import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {RootStackParamsList} from '../../../routes/StackNavigator';
import {GlobalStyles} from '../../theme/global.styles';

export const ContactsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <>
      <View style={GlobalStyles.container}>
        <Text>Hi from Home Screen</Text>
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
