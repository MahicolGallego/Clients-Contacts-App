import {PermissionStatus} from 'react-native-permissions';
import {create} from 'zustand';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../permissions/location';

interface PermissionsState {
  locationStatus: PermissionStatus | 'undetermined';

  requestLocationPermisions: () => Promise<PermissionStatus | 'undetermined'>;
  checkLocationPermisions: () => Promise<PermissionStatus | 'undetermined'>;
}

export const usePermissionStore = create<PermissionsState>()(set => ({
  locationStatus: 'undetermined',

  requestLocationPermisions: async () => {
    const status = await requestLocationPermission();
    set({locationStatus: status});
    return status;
  },

  checkLocationPermisions: async () => {
    const status = await checkLocationPermission();
    set({locationStatus: status});
    return status;
  },
}));
