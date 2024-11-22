import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import uuid from 'react-native-uuid';
import {IContact, IUpdateContact} from '../../interfaces/contact.interfaces';
import {IStorageContactData} from '../../interfaces/data-storage.interfaces';

//regex to validate contact info
const headerRegex = /^[a-z].*$/;
const phoneRegex = /^\+?(\d[\d- ]{7,}\d)$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class DataStorage {
  static async createContact({
    headerOfUser,
    NewContact,
  }: {
    headerOfUser: string;
    NewContact: IContact;
  }) {
    if (!headerRegex.test(NewContact.name.toLowerCase())) {
      Alert.alert('Invalid name. Name of contact should start with a letter');
      return [];
    }

    if (!phoneRegex.test(NewContact.phone)) {
      Alert.alert(
        'Invalid Phone Number',
        'Please enter a valid phone number in one of the following formats:\n' +
          '- 1234567\n' +
          '- +1234567\n' +
          '- 123-456-7890\n' +
          '- +1 234-567-8901\n' +
          'The number should only contain digits and may include the "+" symbol for international formats.',
      );
      return [];
    }

    if (!emailRegex.test(NewContact.email.toLowerCase())) {
      Alert.alert(
        'Invalid Email Address',
        'Please enter a valid email address in one of the following formats:\n' +
          '- example@example.com\n' +
          '- user.name@domain.co\n' +
          '- first.last@subdomain.domain.com\n' +
          '- user123@domain.com\n' +
          '- user-name@domain.com\n',
      );
      return [];
    }

    NewContact.name = this.capitalizeName(NewContact.name);
    NewContact.email = NewContact.email.toLowerCase();

    // add id as uuid
    const newContact: IContact = {...NewContact, id: uuid.v4() as string};

    let existingContacts: IStorageContactData[] | undefined =
      await DataStorage.getAllContacts();

    // Se retorna vacio ya que si viene undefined es por que hay error al consultar
    // los datos desde el async storage, es error y no que no hay data
    if (existingContacts === undefined) {
      return [];
    }

    if (!existingContacts.length) {
      existingContacts = [{title: headerOfUser, data: [newContact]}];
    } else {
      const contactListWithHeaderOfUser: IStorageContactData | undefined =
        existingContacts.find(
          listContact => listContact.title === headerOfUser,
        );
      if (!contactListWithHeaderOfUser) {
        existingContacts.push({title: headerOfUser, data: [newContact]});
      } else {
        const existingContact = contactListWithHeaderOfUser.data.find(
          contact => contact.name === newContact.name,
        );
        if (existingContact) {
          Alert.alert('Contact already exists');
          return [];
        }

        contactListWithHeaderOfUser.data.push(newContact);
      }
      //sort contacts list by header
      existingContacts.sort((a, b) => a.title.localeCompare(b.title, 'es'));

      //sort contacts by user names
      existingContacts.forEach(contactList => {
        return contactList.data.sort((a, b) =>
          a.name.localeCompare(b.name, 'es'),
        );
      });
    }
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(existingContacts));
      Alert.alert('Contact created successfully');
      return existingContacts;
    } catch (e) {
      console.error('Error al guardar los datos en AsyncStorage:', e);
      return [];
    }
  }

  static async getAllContacts(): Promise<IStorageContactData[] | undefined> {
    try {
      const data = await AsyncStorage.getItem('contacts');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error to get data from AsyncStorage:', e);
      Alert.alert('Error to get data');
      return undefined;
    }
  }

  static async updateContact(
    contact_id: string,
    newContactData: IUpdateContact,
  ) {
    const {existingContacts, contactList} =
      await this.searchContactListOfContactById(contact_id);

    if (existingContacts === undefined) {
      return;
    }

    if (!contactList) {
      Alert.alert('Contact to update not found');
      return;
    }

    if (newContactData.name) {
      if (!headerRegex.test(newContactData.name.toLowerCase())) {
        Alert.alert(
          'Invalid name. Contact name should start with a letter',
          'Contact name has not been updated',
        );
        return;
      }
      newContactData.name = this.capitalizeName(newContactData.name);
    }

    if (newContactData.phone) {
      if (!phoneRegex.test(newContactData.phone)) {
        Alert.alert(
          'Invalid Phone Number',
          'Please enter a valid phone number in one of the following formats:\n' +
            '- 1234567\n' +
            '- +1234567\n' +
            '- 123-456-7890\n' +
            '- +1 234-567-8901\n' +
            'Phone number has not been updated',
        );
        return;
      }
    }

    if (newContactData.email) {
      if (!emailRegex.test(newContactData.email.toLowerCase())) {
        Alert.alert(
          'Invalid Email Address',
          'Please enter a valid email address in one of the following formats:\n' +
            '- example@example.com\n' +
            '- user.name@domain.co\n' +
            '- first.last@subdomain.domain.com\n' +
            '- user123@domain.com\n' +
            '- user-name@domain.com\n' +
            'Email address has not been updated',
        );
        return;
      }
      newContactData.email = newContactData.email.toLowerCase();
    }

    let updatedContact;

    contactList.data = contactList.data.map(contact => {
      if (contact.id === contact_id) {
        updatedContact = {...contact, ...newContactData};
        return updatedContact;
      }
      return contact;
    });

    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(existingContacts));
      return updatedContact;
    } catch (e) {
      Alert.alert('Error to save data to storage');
      console.error('Error to save data to storage to AsyncStorage:', e);
      return;
    }
  }
  static async deleteContact(contact_id: string) {
    let {existingContacts, contactList} =
      await this.searchContactListOfContactById(contact_id);

    if (existingContacts === undefined) {
      return;
    }

    if (!contactList) {
      return Alert.alert('Contact to delete not found');
    }

    contactList.data = contactList.data.filter(
      contact => contact.id !== contact_id,
    );

    if (!contactList.data.length) {
      existingContacts = existingContacts.filter(
        listContact => listContact.title !== contactList.title,
      );
    }

    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(existingContacts));
      Alert.alert('Contact deleted successfully');
      return existingContacts;
    } catch (e) {
      Alert.alert('error to delete data to storage');
      console.error('Error to delete data to storage: ', e);
      return;
    }
  }

  static async searchContactListOfContactById(contact_id: string): Promise<{
    existingContacts: IStorageContactData[] | undefined;
    contactList: IStorageContactData | undefined;
  }> {
    const existingContacts: IStorageContactData[] | undefined =
      await DataStorage.getAllContacts();

    if (existingContacts === undefined) {
      return {
        existingContacts: undefined,
        contactList: undefined,
      };
    }

    // Encontrar la lista de contactos que contiene el contacto a actualizar
    const contactList = existingContacts.find(listContact =>
      listContact.data.some(contact => contact.id === contact_id),
    );

    return {existingContacts, contactList};
  }

  static capitalizeName(nameToCapitalize: string): string {
    return nameToCapitalize
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join the words back into a string
  }

  static async setFirstAccess(): Promise<void> {
    await AsyncStorage.setItem('first-access', 'false');
    return;
  }

  static async checkFirstAccess(): Promise<boolean> {
    const firstAccess = await AsyncStorage.getItem('first-access');
    if (firstAccess === null || firstAccess === 'true') {
      return true;
    }
    return false;
  }
}
