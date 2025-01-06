/* eslint-disable curly */
import {useContactsList} from './useContactsList';
import {CameraAdapter} from '../../adapters/camera/CameraAdapter';
import {usePermissionStore} from '../../store/permissions/usePermissions';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../routes/StackNavigator';
import {useNewContactStore} from '../../store/contacts/newContactStore';
import {useEffect} from 'react';

export const useAddContact = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const {
    newContact,
    updateTempLocation,
    updateTempPhoto,
    deleteTempPhoto,
    updateTempFullName,
    updateTempEmail,
    updateTempPhoneNumber,
    updateTempType,
    deleteTempLocation,
    resetNewContact,
  } = useNewContactStore();

  useEffect(() => {
    return resetNewContact();
  }, []);

  const {addContact} = useContactsList();

  const {locationStatus, requestLocationPermisions} = usePermissionStore();

  const updateTempPhotoTakingPhoto = async () => {
    const photoUrl = await CameraAdapter.takePhoto();
    if (!photoUrl) return;

    updateTempPhoto(photoUrl);
  };

  const updateTempPhotoUploadFromMediaLbrary = async () => {
    const photoUrl = await CameraAdapter.uploadPhotoFromLibrary();
    if (!photoUrl) return;

    updateTempPhoto(photoUrl);
  };

  const requestLocationPermissions = async () => {
    if (locationStatus === 'granted') {
      navigation.navigate('Map', {
        contact: newContact,
        actionType: 'update-temp-location',
      });
    } else if (locationStatus !== 'undetermined') {
      await requestLocationPermisions();
    }
  };

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
    updateTempLocation,
    deleteTempLocation,
    requestLocationPermissions,
    resetNewContact,
  };
};
