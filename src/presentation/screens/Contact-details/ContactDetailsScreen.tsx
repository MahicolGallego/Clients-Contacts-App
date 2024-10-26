import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {RootStackParamsList} from '../../../routes/StackNavigator';

export const ContactDetailsScreen = () => {
  // Extract the param from the navigation state properties
  // RouteProp -> define type of navigation params
  const params = useRoute<RouteProp<RootStackParamsList, 'ContactDetails'>>();

  console.log(params);

  return (
    <>
      <View>
        <Text>Hi from Details Contact Screen</Text>
      </View>
    </>
  );
};
