/* eslint-disable curly */
import {useState} from 'react';
import {DataStorage} from '../../adapters/data-storage/AsyncStorage';
import {RootStackParamsList} from '../../routes/StackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackActions, useNavigation} from '@react-navigation/native';

import {
  ContactType,
  IContact,
} from '../../interfaces/entities/contact/contact.interfaces';
import {ISectionListContactData} from '../../interfaces/for-components/section-list-data.interfaces';

export const useContactsList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const [contacts, setContacts] = useState<ISectionListContactData[]>([]);
  const [filterByText, setFilterByText] = useState('');
  const [filterByContactType, setFilterByContactType] = useState<
    ContactType | 'All'
  >('All');

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

  const filterContacts = async (
    byText: string,
    byType: ContactType | 'All',
  ) => {
    await loadContacts();

    // logic is used within the hook's setContact function as a callback
    // to queue this 2nd setContacts right after the setContact function of
    // loadContacts to update the contact list, ensuring that you have
    // always up-to-date data and avoid problems with the consistency of the
    // Data due to asynchrony
    setContacts(prevContacts => {
      let filteredContacts = prevContacts;
      if (byText) {
        // First check by list of contacts
        filteredContacts = filteredContacts.filter(contactsList =>
          contactsList.data.some(
            contact =>
              contact.email.toLowerCase().includes(byText.toLowerCase()) ||
              contact.name.toLowerCase().includes(byText.toLowerCase()) ||
              contact.phone.includes(byText.toLowerCase()),
          ),
        );

        // Then check by individual contacts and insert them
        filteredContacts = filteredContacts.map(filteredList => {
          filteredList.data = filteredList.data.filter(
            contact =>
              contact.email.toLowerCase().includes(byText.toLowerCase()) ||
              contact.name.toLowerCase().includes(byText.toLowerCase()) ||
              contact.phone.includes(byText.toLowerCase()),
          );
          return filteredList;
        });
      }

      if (byType !== 'All') {
        // check if in the contact list there are any contacts with this type
        filteredContacts = filteredContacts.filter(contactsList =>
          contactsList.data.some(contact => contact.type === byType),
        );

        // Then check by individual contacts and insert them
        filteredContacts = filteredContacts.map(filteredList => {
          filteredList.data = filteredList.data.filter(
            contact => contact.type === byType,
          );
          return filteredList;
        });
      }

      // return filtered contacts if we don't have any contacts return empty list
      return filteredContacts.length ? filteredContacts : [];
    });
  };

  return {
    // Properties
    contacts,
    filterByText,
    filterByContactType,

    // Methods
    addContact,
    loadContacts,
    removeContact,
    setFilterByText,
    setFilterByContactType,
    filterContacts,
  };
};
