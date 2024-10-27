import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export class CameraAdapter {
  static async takePhoto(): Promise<string> {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.7,
      cameraType: 'front',
      saveToPhotos: true,
    });

    if (result.assets && result.assets[0].uri) {
      return result.assets[0].uri;
    }

    return '';
  }

  static async uploadPhotoFromLibrary(): Promise<string> {
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
