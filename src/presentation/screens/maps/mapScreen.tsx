import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Map} from '../../components/maps/Map';
import {useMaps} from '../../hooks/useMaps';

export const MapScreen = () => {
  const {contact, OnPressFunction} = useMaps();

  return (
    <View style={styles.container}>
      <Map
        markerOnMap={
          contact.location?.latitude && contact.location?.longitude
            ? {
                latitude: contact.location.latitude,
                longitude: contact.location.longitude,
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
