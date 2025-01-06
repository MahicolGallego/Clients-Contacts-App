import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Map} from '../../components/maps/Map';
import {useMaps} from '../../hooks/useMaps';
import {INewContact} from '../../../interfaces/entities/contact/contact.interfaces';
import {IContactResponse} from '../../../interfaces/api-responses/contacts-responses';

export const MapScreen = () => {
  const {contact, OnPressFunction} = useMaps();

  //Type guard for validate the type of contact
  const isAnExistingContact = (
    contactToValid: INewContact | IContactResponse,
  ): contactToValid is IContactResponse => {
    return (contactToValid as IContactResponse).id !== undefined;
  };

  // set the properties of latitude and longitude depending on the type of contact
  let contactLatitude: number | undefined;
  let contactLongitude: number | undefined;

  if (isAnExistingContact(contact)) {
    contactLatitude = contact.location?.latitude;
    contactLongitude = contact.location?.longitude;
  } else {
    contactLatitude = contact.latitude;
    contactLongitude = contact.longitude;
  }

  return (
    <View style={styles.container}>
      <Map
        markerOnMap={
          contactLatitude && contactLongitude
            ? {
                latitude: contactLatitude,
                longitude: contactLongitude,
              }
            : undefined
        }
        onPressHandler={OnPressFunction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
