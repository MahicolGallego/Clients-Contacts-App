import React, {useState} from 'react';
import {Alert, Modal, Platform, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {ILocation} from '../../../interfaces/entities/location/location';
import {FAB, Text} from 'react-native-paper';
import {Colors} from '../../theme/global.styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../../routes/StackNavigator';
import {useNavigation} from '@react-navigation/native';

interface MapProps {
  showUserLocation?: boolean;
  markerOnMap?: ILocation;
  onPressHandler: ({latitude, longitude}: ILocation) => void; // La función que recibirá las coordenadas y actualizará el estado
}
export const Map = ({markerOnMap = undefined, onPressHandler}: MapProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [marker, setMarker] = useState(markerOnMap);
  return (
    <>
      <MapView
        showsUserLocation={false}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{flex: 1}}
        initialRegion={{
          latitude: marker ? marker.latitude : 37.78825,
          longitude: marker ? marker.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={e => {
          const {latitude, longitude} = e.nativeEvent.coordinate;
          setMarker({latitude, longitude});
          if (!modalVisible) {
            setModalVisible(true);
          }
        }}>
        {marker && (
          <Marker
            coordinate={marker}
            title="Ubicacion seleccionada para el contacto"
          />
        )}
      </MapView>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Want to save this location as the contact's?
            </Text>
            <FAB
              color="white"
              label="Close"
              style={[styles.button, styles.buttonCancel]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
            <FAB
              color="white"
              label="save"
              style={[styles.button, styles.buttonSave]}
              onPress={() => {
                setModalVisible(!modalVisible);
                if (marker) {
                  const {latitude, longitude} = marker;
                  onPressHandler({latitude, longitude});
                  navigation.goBack();
                } else {
                  Alert.alert('Not selected marker');
                  console.warn('Marker is undefined, cannot save location');
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // Asegura que el modal se pegue al fondo
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fondo translúcido
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50, // Lo colocamos en la parte inferior
    right: 20, // Alineado a la derecha
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 16,
  },
  button: {
    borderRadius: 20,
    width: 120,
    elevation: 2,
    position: 'absolute',
    bottom: -30,
  },
  buttonCancel: {
    backgroundColor: '#2196F3',
    left: 50,
  },
  buttonSave: {
    backgroundColor: '#4CAF50',
    right: 50,
  },
});
