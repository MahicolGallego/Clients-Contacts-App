/* eslint-disable curly */
import {useEffect, useState} from 'react';
import {
  IContact,
  IStoreContactData,
  DataStorage,
} from '../../adapters/data-storage/AsyncStorage';
import {RootStackParamsList} from '../../routes/StackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackActions, useNavigation} from '@react-navigation/native';

export const useContactsList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const [contacts, setContacts] = useState<IStoreContactData[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const contactsList = await DataStorage.getAllContacts();

    if (contactsList === undefined) return;

    setContacts(contactsList);
  };

  const addContact = async ({NewContact}: {NewContact: IContact}) => {
    const headerOfUser = NewContact.name.charAt(0).toUpperCase();
    const updatedContactsList = await DataStorage.createContact({
      headerOfUser,
      NewContact,
    });

    if (!updatedContactsList.length) return;

    setContacts(updatedContactsList);

    navigation.dispatch(StackActions.popToTop());
  };

  const updateContact = async (contact_id: string) => {};

  const removeContact = async (contact_id: string) => {};

  return {
    // Properties
    contacts,

    // Methods
    addContact,
    loadContacts,
    updateContact,
    removeContact,
  };
};
