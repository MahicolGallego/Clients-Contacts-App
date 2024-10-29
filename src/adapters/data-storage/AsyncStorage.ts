import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import uuid from 'react-native-uuid';

//Interfaces
export interface IContact {
  id?: string;
  name: string;
  phone: string;
  email: string;
  type: ContactType;
  photo?: string;
  location: string;
}

export type IUpdateContact = Omit<Partial<IContact>, 'id'>;

export interface IStoreContactData {
  header: string;
  contacts: IContact[];
}

//enums
export enum ContactType {
  client = 'client',
  employee = 'employee',
}

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

    let existingContacts: IStoreContactData[] | undefined =
      await DataStorage.getAllContacts();

    // Se retorna vacio ya que si viene undefined es por que hay error al consultar
    // los datos desde el async storage, es error y no que no hay data
    if (existingContacts === undefined) {
      return [];
    }

    if (!existingContacts.length) {
      existingContacts = [{header: headerOfUser, contacts: [newContact]}];
    } else {
      const contactListWithHeaderOfUser: IStoreContactData | undefined =
        existingContacts.find(
          listContact => listContact.header === headerOfUser,
        );
      if (!contactListWithHeaderOfUser) {
        existingContacts.push({header: headerOfUser, contacts: [newContact]});
      } else {
        const existingContact = contactListWithHeaderOfUser.contacts.find(
          contact => contact.name === newContact.name,
        );
        if (existingContact) {
          Alert.alert('Contact already exists');
          return [];
        }

        contactListWithHeaderOfUser.contacts.push(newContact);
      }
      //sort contacts list by header
      existingContacts.sort((a, b) => a.header.localeCompare(b.header, 'es'));

      //sort contacts by user names
      existingContacts.forEach(contactList => {
        return contactList.contacts.sort((a, b) =>
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

  static async getAllContacts(): Promise<IStoreContactData[] | undefined> {
    try {
      const data = await AsyncStorage.getItem('contacts');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error to get data from AsyncStorage:', e);
      Alert.alert('Error to get data');
      return undefined; // Devuelve un arreglo vacío en caso de error
    }
  }

  static async updateContact(contact_id: string, data: IUpdateContact) {
    const {existingContacts, contactList} =
      await this.searchContactListOfContactById(contact_id);

    if (existingContacts === undefined) {
      return;
    }

    if (!contactList) {
      return Alert.alert('Contact to update not found');
    }

    if (data.name) {
      if (!headerRegex.test(data.name.toLowerCase())) {
        return Alert.alert(
          'Invalid name. Contact name should start with a letter',
          'Contact name has not been updated',
        );
      }
      data.name = this.capitalizeName(data.name);
    }

    if (data.phone) {
      if (!phoneRegex.test(data.phone)) {
        return Alert.alert(
          'Invalid Phone Number',
          'Please enter a valid phone number in one of the following formats:\n' +
            '- 1234567\n' +
            '- +1234567\n' +
            '- 123-456-7890\n' +
            '- +1 234-567-8901\n' +
            'Phone number has not been updated',
        );
      }
    }

    if (data.email) {
      if (!emailRegex.test(data.email.toLowerCase())) {
        return Alert.alert(
          'Invalid Email Address',
          'Please enter a valid email address in one of the following formats:\n' +
            '- example@example.com\n' +
            '- user.name@domain.co\n' +
            '- first.last@subdomain.domain.com\n' +
            '- user123@domain.com\n' +
            '- user-name@domain.com\n' +
            'Email address has not been updated',
        );
      }
      data.email = data.email.toLowerCase();
    }

    contactList.contacts = contactList.contacts.map(contact =>
      contact.id === contact_id ? {...contact, ...data} : contact,
    );

    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(existingContacts));
      Alert.alert('Contact updated successfully');
    } catch (e) {
      console.error('Error al guardar los datos en AsyncStorage:', e);
    }
  }
  static async deleteContact(contact_id: string) {
    const {existingContacts, contactList} =
      await this.searchContactListOfContactById(contact_id);

    if (existingContacts === undefined) {
      return;
    }

    if (!contactList) {
      return Alert.alert('Contact to delete not found');
    }

    contactList.contacts = contactList.contacts.filter(
      contact => contact.id !== contact_id,
    );

    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(existingContacts));
      Alert.alert('Contact deleted successfully');
    } catch (e) {
      console.error('Error al guardar los datos en AsyncStorage:', e);
    }
  }

  static async searchContactListOfContactById(contact_id: string): Promise<{
    existingContacts: IStoreContactData[] | undefined;
    contactList: IStoreContactData | undefined;
  }> {
    const existingContacts: IStoreContactData[] | undefined =
      await DataStorage.getAllContacts();

    if (existingContacts === undefined) {
      return {
        existingContacts: undefined,
        contactList: undefined,
      };
    }

    // Encontrar la lista de contactos que contiene el contacto a actualizar
    const contactList = existingContacts.find(listContact =>
      listContact.contacts.some(contact => contact.id === contact_id),
    );

    return {existingContacts, contactList};
  }

  static capitalizeName(nameToCapitalize: string): string {
    return nameToCapitalize
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join the words back into a string
  }
}
