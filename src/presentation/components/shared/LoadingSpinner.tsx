import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={Colors.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute', // Hace que el contenedor ocupe toda la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 3,
  },
});
