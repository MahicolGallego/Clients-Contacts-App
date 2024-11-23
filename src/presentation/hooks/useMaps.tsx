import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamsList} from '../../routes/StackNavigator';
import {ILocation} from '../../interfaces/entities/location/location';
import {useContactDetails} from './useContactDetails';
import {useNewContactStore} from '../../store/contacts/newContactStore';
export const useMaps = () => {
  const {params} = useRoute<RouteProp<RootStackParamsList, 'Map'>>();

  const {contact, actionType} = params;

  const {updateTempLocation} = useNewContactStore();
  const {updateLocation} = useContactDetails();

  //   const {updateLocation} = useContactDetails();

  let OnPressFunction: ({latitude, longitude}: ILocation) => void =
    actionType === 'update-temp-location' ? updateTempLocation : updateLocation;

  return {contact, OnPressFunction};
};
