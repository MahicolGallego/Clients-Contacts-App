import {RouteProp, useRoute} from '@react-navigation/native';
import {Dispatch, SetStateAction, useState} from 'react';
import {RootStackParamsList} from '../../routes/StackNavigator';
import {CameraAdapter} from '../../adapters/camera/CameraAdapter';
import {DataStorage} from '../../adapters/data-storage/AsyncStorage';
import {IUpdateContact} from '../../interfaces/contact.interfaces';
import {Alert} from 'react-native';

export const useContactDetails = () => {
  // Extract the param from the navigation state properties
  // RouteProp -> define type of navigation params
  const {params} = useRoute<RouteProp<RootStackParamsList, 'ContactDetails'>>();
  // console.log(params);
  const {item} = params;

  const [contact, setContact] = useState(item);

  // for temporary storage of the new values to update
  const [tempNewFullName, setTempNewFullName] = useState<string>(contact.name);
  const [tempNewEmail, setTempNewEmail] = useState<string>(contact.email);
  const [tempNewPhoneNumber, setTempNewPhoneNumber] = useState<string>(
    contact.phone,
  );

  // functions for update the temporary new values
  const updateTempNewFullName = (value: string) => {
    setTempNewFullName(value);
  };

  const updateTempNewEmail = (value: string) => {
    setTempNewEmail(value);
  };

  const updateTempNewPhoneNumber = (value: string) => {
    setTempNewPhoneNumber(value);
  };

  // console.log(JSON.stringify(contact, null, 2));

  // const onChangeContact = (key: any, value: any) => {
  //   setContact({
  //     ...contact,
  //     [key]: value,
  //   });
  // };

  const onChangeText = (
    value: string,
    setDataFunction?: Dispatch<SetStateAction<any>>,
  ) => {
    if (!setDataFunction) {
      Alert.alert('Error to try interaction with the contact data.');
      console.error('No setDataFunction provided');
      return;
    }
    setDataFunction(value);
  };

  const updateContactData = async (newData: IUpdateContact) => {
    const updatedContact = await DataStorage.updateContact(
      contact.id as string,
      newData,
    );

    console.log('update contact function activated');

    //If the update is not executed, the temporary contact details to be updated
    //will be reassigned to the existing contact details
    if (updatedContact === undefined) {
      if (newData.name) {
        setTempNewFullName(contact.name);
      }

      if (newData.email) {
        setTempNewEmail(contact.email);
      }

      if (newData.phone) {
        setTempNewPhoneNumber(contact.phone);
      }
      return;
    }

    // if the update is successful, update the contact
    setContact(updatedContact);
  };

  const updateContactPhotoTakingPhoto = async () => {
    const photoUrl = await CameraAdapter.takePhoto();
    if (!photoUrl) return;

    if (contact.photo === photoUrl) return;

    const updatedContact = await DataStorage.updateContact(
      contact.id as string,
      {
        photo: photoUrl,
      },
    );

    if (updatedContact === undefined) return;

    setContact(updatedContact);
  };

  const updateContactPhotoUploadFromMediaLbrary = async () => {
    const photoUrl = await CameraAdapter.uploadPhotoFromLibrary();
    if (!photoUrl) return;

    if (contact.photo === photoUrl) return;

    const updatedContact = await DataStorage.updateContact(
      contact.id as string,
      {
        photo: photoUrl,
      },
    );

    if (updatedContact === undefined) return;

    setContact(updatedContact);
  };

  const deleteContactPhoto = async () => {
    const updatedContact = await DataStorage.updateContact(
      contact.id as string,
      {
        photo: '',
      },
    );

    if (updatedContact === undefined) return;

    setContact(updatedContact);
  };

  return {
    // Properties
    contact,
    tempNewFullName,
    tempNewEmail,
    tempNewPhoneNumber,

    // Methodss
    updateContactData,
    updateContactPhotoTakingPhoto,
    updateContactPhotoUploadFromMediaLbrary,
    deleteContactPhoto,
    updateTempNewFullName,
    updateTempNewEmail,
    updateTempNewPhoneNumber,
    onChangeText,
  };
};
