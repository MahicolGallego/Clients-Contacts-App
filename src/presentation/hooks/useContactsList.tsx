/* eslint-disable curly */
import {useState} from 'react';
import {DataStorage} from '../../adapters/data-storage/AsyncStorage';
import {RootStackParamsList} from '../../routes/StackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackActions, useNavigation} from '@react-navigation/native';
import {IStorageContactData} from '../../interfaces/data-storage.interfaces';
import {IContact} from '../../interfaces/contact.interfaces';

export const useContactsList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const [contacts, setContacts] = useState<IStorageContactData[]>([]);

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

  const removeContact = async (contact_id: string) => {
    const contactsListUpdated = await DataStorage.deleteContact(contact_id);
    if (contactsListUpdated === undefined) return;
    setContacts(contactsListUpdated);
  };

  return {
    // Properties
    contacts,

    // Methods
    addContact,
    loadContacts,
    removeContact,
  };
};
