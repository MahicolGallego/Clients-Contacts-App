import {Alert, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export const requestLocationPermission = async (): Promise<
  PermissionStatus | 'undetermined'
> => {
  let status: PermissionStatus = 'unavailable';
  const locationPermission = Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  });

  if (!locationPermission) {
    Alert.alert('Error', 'Location permission not supported on this platform.');
    throw new Error('Location permission not supported on this platform.');
  }

  status = await request(locationPermission);

  if (status === 'blocked') {
    await openSettings();
    return await checkLocationPermission();
  }

  return status;
};

export const checkLocationPermission = async (): Promise<
  PermissionStatus | 'undetermined'
> => {
  let status: PermissionStatus = 'unavailable';

  const locationPermission = Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  });

  if (!locationPermission) {
    Alert.alert('Error', 'Location permission not supported on this platform.');
    throw new Error('Location permission not supported on this platform.');
  }

  status = await check(locationPermission);

  return status;
};
