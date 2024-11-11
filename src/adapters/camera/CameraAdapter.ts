import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  requestCameraPermission,
  requestMediaLibraryPermission,
} from '../../permissions/camera';
import {RESULTS} from 'react-native-permissions';
import {Alert} from 'react-native';

export class CameraAdapter {
  static async takePhoto(): Promise<string> {
    const cameraPermission = await requestCameraPermission();

    if (
      (cameraPermission !== RESULTS.GRANTED &&
        cameraPermission !== RESULTS.LIMITED) ||
      cameraPermission === null
    ) {
      if (cameraPermission === RESULTS.BLOCKED) {
        Alert.alert(
          'Camera permission was previously rejected. Please enable it from device settings.',
        );
      }
      return '';
    }

    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.7,
      cameraType: 'front',
      saveToPhotos: false,
    });

    if (result.assets && result.assets[0].uri) {
      return result.assets[0].uri;
    }

    return '';
  }

  static async uploadPhotoFromLibrary(): Promise<string> {
    const mediaLibraryPermission = await requestMediaLibraryPermission();

    if (
      (mediaLibraryPermission !== RESULTS.GRANTED &&
        mediaLibraryPermission !== RESULTS.LIMITED) ||
      mediaLibraryPermission === null
    ) {
      if (mediaLibraryPermission === RESULTS.BLOCKED) {
        Alert.alert(
          'Media library permission was previously rejected. Please enable it from device settings.',
        );
      }
      return '';
    }
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 1,
    });

    if (result.assets && result.assets[0].uri) {
      return result.assets[0].uri;
    }

    return '';
  }
}
