/* eslint-disable curly */
import {useState} from 'react';

import {useContactsList} from './useContactsList';
import {CameraAdapter} from '../../adapters/camera/CameraAdapter';
import {ContactType, IContact} from '../../interfaces/contact.interfaces';

export const useAddContact = () => {
  const {addContact} = useContactsList();
  const [newContact, setNewContact] = useState<IContact>({
    id: undefined,
    name: '',
    phone: '',
    email: '',
    type: ContactType.employee,
    photo: undefined,
  });

  const updateTempPhotoTakingPhoto = async () => {
    const photoUrl = await CameraAdapter.takePhoto();
    if (!photoUrl) return;

    if (newContact.photo !== photoUrl) {
      const newContactPhotoUpdated = {...newContact, photo: photoUrl};
      setNewContact(newContactPhotoUpdated);
    }
  };

  const updateTempPhotoUploadFromMediaLbrary = async () => {
    const photoUrl = await CameraAdapter.uploadPhotoFromLibrary();
    if (!photoUrl) return;

    if (newContact.photo !== photoUrl) {
      const newContactPhotoUpdated = {...newContact, photo: photoUrl};
      setNewContact(newContactPhotoUpdated);
    }
  };

  const deleteTempPhoto = async () => {
    const newContactPhotoDeleted = {...newContact, photo: ''};
    setNewContact(newContactPhotoDeleted);
  };

  const updateTempFullName = (value: string) => {
    const newContactFullnameUpdated = {...newContact, name: value};
    setNewContact(newContactFullnameUpdated);
  };

  const updateTempEmail = (value: string) => {
    const newContactEmailUpdated = {...newContact, email: value};
    setNewContact(newContactEmailUpdated);
  };

  const updateTempPhoneNumber = (value: string) => {
    const newContactPhoneNumberUpdated = {...newContact, phone: value};
    setNewContact(newContactPhoneNumberUpdated);
  };

  const updateTempType = (value: ContactType) => {
    if (value !== newContact.type) {
      const newContactTypeUpdated = {...newContact, type: value};
      setNewContact(newContactTypeUpdated);
    }
  };

  // const updateTempLocation = (value: ContactType) => {
  //   const location = ;
  //   if (location !== newContact.location) {
  //     const newContactLocationUpdated = newContact;
  //     newContactLocationUpdated.location = value;
  //     setNewContact(newContactLocationUpdated);
  //   }
  // };

  return {
    //Properies
    newContact,

    //methods
    addContact,
    updateTempFullName,
    updateTempEmail,
    updateTempPhoneNumber,
    updateTempType,
    updateTempPhotoTakingPhoto,
    updateTempPhotoUploadFromMediaLbrary,
    deleteTempPhoto,
  };
};
