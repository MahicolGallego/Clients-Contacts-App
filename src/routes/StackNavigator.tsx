import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ContactsScreen} from '../presentation/screens/Contacts/ContactsScreen';
import {AddContactScreen} from '../presentation/screens/Add-contact/AddContactScreen';
import {ContactDetailsScreen} from '../presentation/screens/Contact-details/ContactDetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Colors} from '../presentation/theme/global.styles';
import {IContact} from '../interfaces/entities/contact/contact.interfaces';
import {MapScreen} from '../presentation/screens/Maps/MapScreen';
import React from 'react';
import {RegisterScreen} from '../presentation/screens/Auth/RegisterScreen';
import {LoginScreen} from '../presentation/screens/Auth/LoginScreen';
import {LoadingScreen} from '../presentation/screens/Loading/LoadingScreen';

export type RootStackParamsList = {
  Loading: undefined;
  Register: undefined;
  Login: undefined;
  Contacts: undefined;
  ContactDetails: {item: IContact};
  AddContact: undefined;
  Map: {
    contact: IContact;
    actionType: 'update-location' | 'update-temp-location';
  };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.secondaryBackground,
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{headerShown: false, animation: 'fade'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false, animation: 'slide_from_left'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerTitle: () => (
            <View style={styles.container}>
              <Text style={styles.headerText}>Contacts</Text>
              <Icon name="people" size={24} color="white" />
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
            <View style={styles.container}>
              <Text style={styles.headerText}>New</Text>
              <Icon name="person-add" size={24} color="white" />
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
            <View style={styles.container}>
              <Icon name="person" size={24} color="white" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerTitle: () => (
            <View style={styles.container}>
              <Text style={styles.headerText}>Location</Text>
              <Icon name="map-outline" size={24} color="white" />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  headerText: {fontSize: 20, fontWeight: '700', color: 'white'},
});
