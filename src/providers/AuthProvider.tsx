import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PropsWithChildren, useEffect} from 'react';
import {RootStackParamsList} from '../routes/StackNavigator';
import {useAuthStore} from '../store/auth/authStore';

export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const {is_authenticated, checkStatus} = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (is_authenticated !== null) {
      if (!is_authenticated) {
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
      } else if (is_authenticated) {
        navigation.reset({index: 0, routes: [{name: 'Contacts'}]});
      }
    }
  }, [is_authenticated]);

  return <>{children}</>;
};
