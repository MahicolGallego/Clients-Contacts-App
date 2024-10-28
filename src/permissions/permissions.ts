import {Alert, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const requestCameraPermission = async () => {
  // Select the appropriate camera permission based on the platform
  const cameraPermission = Platform.select({
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA,
  });

  if (!cameraPermission) {
    Alert.alert('Error', 'Camera permission not supported on this platform.');
    console.error('Camera permission not supported on this platform.');
    return null;
  }

  try {
    // Request the camera permission and get its status
    const cameraPermissionStatus = await request(cameraPermission);

    // Check the status and log the result
    switch (cameraPermissionStatus) {
      case RESULTS.GRANTED:
        console.log('Camera permission granted');
        break;
      case RESULTS.DENIED:
        console.warn('Camera permission denied');
        break;
      case RESULTS.BLOCKED:
        console.warn('Camera permission blocked');
        break;
      case RESULTS.UNAVAILABLE:
        console.warn('Camera permission unavailable on this platform');
        break;
      default:
        console.warn('Unexpected camera permission status');
    }

    // Return the camera permission status
    return cameraPermissionStatus;
  } catch (error) {
    Alert.alert('Error', 'Error requesting camera permission.');
    console.error('Error requesting camera permission:', error);
    return null;
  }
};

export const requestMediaLibraryPermission = async () => {
  // Select the appropriate media library permission based on the platform
  const mediaLibraryPermission = Platform.select({
    android:
      parseInt(Platform.Version as string, 10) >= 30
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
  });

  if (!mediaLibraryPermission) {
    Alert.alert(
      'Error',
      'Media library permission not supported on this platform.',
    );
    console.error('Media library permission not supported on this platform.');
    return null;
  }

  try {
    // Request the media library permission and get its status
    const mediaLibraryPermissionStatus = await request(mediaLibraryPermission);

    // Check the status and log the result
    switch (mediaLibraryPermissionStatus) {
      case RESULTS.GRANTED:
        console.log('Media library permission granted');
        break;
      case RESULTS.DENIED:
        console.warn('Media library permission denied');
        break;
      case RESULTS.BLOCKED:
        console.warn('Media library permission blocked');
        break;
      case RESULTS.UNAVAILABLE:
        console.warn('Media library permission unavailable on this platform');
        break;
      default:
        console.warn('Unexpected media library permission status');
    }

    // Return the camera permission status
    return mediaLibraryPermissionStatus;
  } catch (error) {
    Alert.alert('Error', 'Error requesting media library permission.');
    console.error('Error requesting media library permission:', error);
    return null;
  }
};
