import {Alert} from 'react-native';
import {CloseToYouAPI} from '../../config/api/CloseToYouAPI';
import {
  IContactResponse,
  IDeleteContactResponse,
} from '../../interfaces/api-responses/contacts-responses';
import {
  INewContact,
  IUpdateContact,
} from '../../interfaces/entities/contact/contact.interfaces';
import {ISectionListContactData} from '../../interfaces/for-components/section-list-data.interfaces';

const firstLetterRegex = /^[a-z].*$/;
const phoneRegex = /^\d{7,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createContact = async (
  newContact: INewContact,
): Promise<IContactResponse | null> => {
  try {
    if (!firstLetterRegex.test(newContact.name.toLowerCase())) {
      Alert.alert('Invalid name. Name of contact should start with a letter');
      return null;
    }
    if (newContact.email) {
      if (!emailRegex.test(newContact.email.toLowerCase())) {
        Alert.alert('Invalid email address');
        return null;
      }
    } else {
      // set as null to prevent response error from the backend server
      newContact.email = null;
    }
    if (!phoneRegex.test(newContact.phone)) {
      Alert.alert('Invalid phone');
      return null;
    }

    newContact.name = capitalizeName(newContact.name);

    const {data} = await CloseToYouAPI.post<IContactResponse>(
      '/contacts',
      newContact,
    );
    Alert.alert('Contact created successfully');

    return data;
  } catch (error) {
    Alert.alert('Error creating contact');
    console.error(error);
    return null;
  }
};

export const updateContact = async (
  id_contact: string,
  updateContactData: IUpdateContact,
): Promise<IContactResponse | null | undefined> => {
  try {
    if (updateContactData.name) {
      if (!firstLetterRegex.test(updateContactData.name.toLowerCase())) {
        Alert.alert(
          'Invalid name. Contact name should start with a letter',
          'Contact name has not been updated',
        );
        return;
      }
      updateContactData.name = capitalizeName(updateContactData.name);
    }

    if (updateContactData.phone) {
      if (updateContactData.phone === '') {
        Alert.alert(
          'The contact must have a phone number\n' +
            'Phone number has not been updated',
        );
        return;
      }
      if (!phoneRegex.test(updateContactData.phone)) {
        Alert.alert(
          'Invalid Phone Number',
          'Please enter a valid phone number minimum with 7 digits\n' +
            'Phone number has not been updated',
        );
        return;
      }
    }

    if (updateContactData.email === '') {
      updateContactData.email = null;
    }

    if (updateContactData.email) {
      if (!emailRegex.test(updateContactData.email.toLowerCase())) {
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
      updateContactData.email = updateContactData.email.toLowerCase();
    }

    const {data} = await CloseToYouAPI.patch<IContactResponse>(
      `contacts/${id_contact}`,
      updateContactData,
    );
    return data;
  } catch (error) {
    Alert.alert('Error updating contact data');
    console.error(error);
    return null;
  }
};

export const deleteContact = async (
  contact_id: string,
  contacts: ISectionListContactData[],
): Promise<ISectionListContactData[] | null> => {
  try {
    await CloseToYouAPI.delete<IDeleteContactResponse>(
      `/contacts/${contact_id}`,
    );

    Alert.alert('Contact deleted successfully');

    const listOfDeletedContacts = contacts.find(contactList =>
      contactList.data.some(contact => contact.id === contact_id),
    );

    if (!listOfDeletedContacts)
      throw new Error(
        'Contact deleted was not found in the list of contacts to shown in contact section list',
      );

    listOfDeletedContacts.data = listOfDeletedContacts?.data.filter(
      contact => contact.id !== contact_id,
    );

    if (!listOfDeletedContacts.data.length) {
      contacts = contacts.filter(
        contactList => contactList.title !== listOfDeletedContacts.title,
      );
    }

    return contacts;
  } catch (error) {
    Alert.alert('Error deleting contact');
    console.error(error);
    return null;
  }
};

export const findAllContacts = async (): Promise<
  ISectionListContactData[] | null
> => {
  try {
    const {data} = await CloseToYouAPI.get<IContactResponse[]>('/contacts');

    if (!data.length) return [];

    return formatAndSortContactListForSectionList(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findOneContact = async (
  id_contact: string,
): Promise<IContactResponse | null> => {
  try {
    const {data} = await CloseToYouAPI.get<IContactResponse>(
      `/contacts/${id_contact}`,
    );

    return data;
  } catch (error) {
    Alert.alert('Error getting contact');
    console.error(error);
    return null;
  }
};

const formatAndSortContactListForSectionList = (
  contacts: IContactResponse[],
): ISectionListContactData[] => {
  let contactsWithSectionListFormat: ISectionListContactData[] = [];

  contacts.forEach(contact => {
    const headerOfUser = contact.name.charAt(0).toUpperCase();
    const contactListWithHeaderUser = contactsWithSectionListFormat.find(
      contactList => contactList.title === headerOfUser,
    );

    if (!contactListWithHeaderUser) {
      contactsWithSectionListFormat.push({
        title: headerOfUser,
        data: [contact],
      });
    } else {
      contactListWithHeaderUser.data.push(contact);
    }
  });

  contactsWithSectionListFormat = sortContactList(
    contactsWithSectionListFormat,
  );

  return contactsWithSectionListFormat;
};

const capitalizeName = (nameToCapitalize: string): string => {
  return nameToCapitalize
    .split(' ') // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' '); // Join the words back into a string
};

const sortContactList = (
  contacts: ISectionListContactData[],
): ISectionListContactData[] => {
  //sort contacts list by header
  contacts.sort((a, b) => a.title.localeCompare(b.title, 'es'));

  //sort contacts by user names
  contacts.forEach(contactList => {
    return contactList.data.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  });

  return contacts;
};
