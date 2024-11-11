import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {RootStackParamsList} from '../../routes/StackNavigator';
import {CameraAdapter} from '../../adapters/camera/CameraAdapter';
import {DataStorage} from '../../adapters/data-storage/AsyncStorage';
import {IUpdateContact} from '../../interfaces/contact.interfaces';
import {Alert} from 'react-native';
import {ILocation} from '../../interfaces/location';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {usePermissionStore} from '../../store/permissions/usePermissions';
import {useContactDetailStore} from '../../store/contacts/contactDetail';

export const useContactDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  // Extract the param from the navigation state properties
  // RouteProp -> define type of navigation params
  const {params} = useRoute<RouteProp<RootStackParamsList, 'ContactDetails'>>();
  // console.log(params);
  const {item} = params;

  const {locationStatus, requestLocationPermisions} = usePermissionStore();

  const {contact, setContact, deleteLocation, resetContact} =
    useContactDetailStore();

  // for temporary storage of the new values to update
  const [tempNewFullName, setTempNewFullName] = useState<string>('');
  const [tempNewEmail, setTempNewEmail] = useState<string>('');
  const [tempNewPhoneNumber, setTempNewPhoneNumber] = useState<string>('');

  useEffect(() => {
    if (item) {
      setContact(item);
    }
  }, []);

  // funcion para setear los datos cuando setContact(asincrono) termine
  useEffect(() => {
    if (contact) {
      setTempNewFullName(contact.name || '');
      setTempNewEmail(contact.email || '');
      setTempNewPhoneNumber(contact.phone || '');
    }
  }, [contact]); // ejecutar cada vez que `contact` cambia para sincronizar los datos

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

  const updateContactData = async (newData: IUpdateContact) => {
    const updatedContact = await DataStorage.updateContact(
      contact.id as string,
      newData,
    );

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
      if (newData.location) {
      }
      return;
    }

    // if the update is successful, update the contact
    setContact(updatedContact);
  };

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

  const updateLocation = async (value: ILocation) => {
    if (
      value.latitude !== contact.location?.latitude &&
      value.longitude !== contact.location?.longitude
    ) {
      await updateContactData({location: value});
    }
  };

  const requestLocationPermissions = async () => {
    if (locationStatus === 'granted') {
      navigation.navigate('Map', {
        contact,
        actionType: 'update-location',
      });
    } else if (locationStatus !== 'undetermined') {
      await requestLocationPermisions();
    }
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
    updateLocation,
    deleteLocation,
    requestLocationPermissions,
    resetContact,
    onChangeText,
  };
};
