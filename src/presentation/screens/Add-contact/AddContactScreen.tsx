import {useEffect, useState} from 'react';
import {Modal, Platform, Pressable, ScrollView, View} from 'react-native';
import {Avatar, FAB, Text} from 'react-native-paper';
import {Colors, GlobalStyles} from '../../theme/global.styles';
import {DynamicTextInput} from '../../components/shared/DinamicTextInput';
import {useAddContact} from '../../hooks/useAddContact';
import {DropdownContactTypes} from '../../../constants/dropdown-data';
import {DropdownComponent} from '../../components/shared/Dropdown';
import {ContactType} from '../../../interfaces/entities/contact/contact.interfaces';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export const AddContactScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    newContact,
    updateTempFullName,
    updateTempPhotoTakingPhoto,
    updateTempPhotoUploadFromMediaLbrary,
    updateTempEmail,
    updateTempPhoneNumber,
    updateTempType,
    deleteTempPhoto,
    deleteTempLocation,
    requestLocationPermissions,
    resetNewContact,
    addContact,
  } = useAddContact();

  useEffect(() => {
    return () => {
      resetNewContact();
    };
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={GlobalStyles.container}>
          {/*pressable image*/}
          <Pressable
            style={({pressed}) => [
              {
                ...GlobalStyles.buttonSecondary,
                ...GlobalStyles.pressableCircle,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              },
              pressed && {
                ...GlobalStyles.buttonPrimary,
                ...GlobalStyles.pressableCircle,
              },
            ]}
            onPress={() => setIsVisible(!isVisible)}>
            {newContact.photo ? (
              <>
                <Avatar.Image
                  size={200}
                  source={{uri: newContact.photo}}
                  style={GlobalStyles.pressableCircle}
                />
                <FAB
                  icon="trash"
                  color={Colors.primary}
                  style={GlobalStyles.fabDelete}
                  onPress={deleteTempPhoto}
                />
              </>
            ) : (
              <>
                <Avatar.Icon
                  size={64}
                  icon="image"
                  style={{backgroundColor: Colors.secondary}}
                />
                <Text style={GlobalStyles.title}>+ Add photo</Text>
              </>
            )}
          </Pressable>

          {/*modal*/}

          <Modal visible={isVisible} animationType="slide">
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: Colors.secondaryBackground,
              }}>
              <View style={GlobalStyles.modalContainer}>
                <FAB
                  icon="camera"
                  color="white"
                  label="Photo"
                  style={{
                    ...GlobalStyles.buttonPrimary,
                    ...GlobalStyles.modalButton,
                  }}
                  onPress={() => {
                    setIsVisible(!isVisible);
                    updateTempPhotoTakingPhoto();
                  }}
                />
                <FAB
                  icon="image"
                  color="white"
                  label="Gallery"
                  style={{
                    ...GlobalStyles.buttonPrimary,
                    ...GlobalStyles.modalButton,
                  }}
                  onPress={() => {
                    setIsVisible(!isVisible);
                    updateTempPhotoUploadFromMediaLbrary();
                  }}
                />
              </View>

              <View style={{flex: 1}} />

              <FAB
                icon="close"
                color="white"
                label="Close"
                style={{
                  ...GlobalStyles.buttonPrimary,
                  ...GlobalStyles.modalButton,
                  width: '100%',
                }}
                onPress={() => {
                  setIsVisible(!isVisible);
                }}
              />
            </View>
          </Modal>

          {/*inputs*/}
          <DynamicTextInput
            label="Full name"
            contentValue={newContact.name}
            placeholder="full name..."
            icon="person-outline"
            onChangeText={updateTempFullName}
          />
          <DynamicTextInput
            label="Email"
            contentValue={newContact.email ? newContact.email : ''}
            placeholder="email address..."
            keyboardType="email-address"
            icon="mail-outline"
            onChangeText={updateTempEmail}
          />
          <DynamicTextInput
            label="Phone number"
            contentValue={newContact.phone}
            placeholder="phone number..."
            keyboardType="phone-pad"
            icon="call-outline"
            onChangeText={updateTempPhoneNumber}
          />

          {/*Select for assign label*/}
          <DropdownComponent
            label="Contact type"
            contentValue={newContact.type}
            iconName="pricetag-outline"
            data={DropdownContactTypes}
            onChange={value => updateTempType(value as ContactType)}
          />

          {/*pressable location*/}
          {newContact.latitude && newContact.longitude ? (
            <>
              <Pressable
                style={[
                  GlobalStyles.locationContainer,
                  {width: '100%', height: 300},
                ]}
                onPress={requestLocationPermissions}>
                <View
                  style={[
                    GlobalStyles.locationContainer,
                    {width: '100%', height: 300},
                  ]}>
                  {/* Display small map of the location */}

                  <MapView
                    showsUserLocation={false}
                    provider={
                      Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE
                    } // remove if not using Google Maps
                    style={{flex: 1}}
                    region={{
                      latitude: newContact.latitude,
                      longitude: newContact.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}>
                    <Marker
                      coordinate={{
                        latitude: newContact.latitude,
                        longitude: newContact.longitude,
                      }}
                    />
                  </MapView>
                </View>
              </Pressable>
              {/* Button to delete location */}
              <FAB
                label="delete location"
                icon="trash"
                color="white"
                style={GlobalStyles.deleteLocationButton}
                onPress={deleteTempLocation}
              />
            </>
          ) : (
            <Pressable
              style={({pressed}) => [
                {
                  ...GlobalStyles.buttonSecondary,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                },
                pressed && {
                  ...GlobalStyles.buttonPrimary,
                },
              ]}
              onPress={requestLocationPermissions}>
              <Avatar.Icon
                size={28}
                icon="location"
                style={{backgroundColor: Colors.primary}}
              />
              <Text style={{...GlobalStyles.title, fontSize: 18}}>
                Assign Location
              </Text>
            </Pressable>
          )}

          {/*pressable save*/}
          <FAB
            icon="save"
            color="white"
            label="Save contact"
            style={{
              ...GlobalStyles.buttonPrimary,
              alignSelf: 'flex-end',
              marginTop: 20,
            }}
            onPress={() => {
              addContact(newContact);
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};
