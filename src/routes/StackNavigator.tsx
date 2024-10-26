import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ContactsScreen} from '../presentation/screens/Contacts/ContactsScreen';
import {AddContactScreen} from '../presentation/screens/Add-contact/AddContactScreen';
import {ContactDetailsScreen} from '../presentation/screens/Contact-details/ContactDetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

export type RootStackParamsList = {
  Contacts: undefined;
  ContactDetails: {contact_id: string};
  AddContact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerTitle: () => (
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>Contacts</Text>
              <Icon name="people" size={24} color="black" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContactScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerTitle: () => (
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>New</Text>
              <Icon name="person-add" size={24} color="black" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerTitle: () => (
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Icon name="person" size={24} color="black" />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
