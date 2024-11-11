import {PropsWithChildren, useEffect} from 'react';
import {AppState} from 'react-native';
import {usePermissionStore} from '../store/permissions/usePermissions';

export const PermissionsChecker = ({children}: PropsWithChildren) => {
  //verify app states and privileges

  const {checkLocationPermisions} = usePermissionStore();

  useEffect(() => {
    checkLocationPermisions(); // check location permissions when app starts up
  }, []);

  useEffect(() => {
    // event for app state change between active and background
    const subscription = AppState.addEventListener('change', NextAppState => {
      // console.log('AppState', NextAppState);
      if (NextAppState === 'active') {
        checkLocationPermisions();
      }
    });

    // Remove subscription
    return () => {
      subscription.remove();
    };
  }, []);
  return <>{children}</>;
};
