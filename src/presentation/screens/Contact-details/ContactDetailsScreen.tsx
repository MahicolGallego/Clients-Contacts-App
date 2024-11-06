import React, {useState} from 'react';
import {View, Modal, ScrollView, Pressable} from 'react-native';
import {Avatar, FAB, Text} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GlobalStyles} from '../../theme/global.styles';
import {useContactDetails} from '../../hooks/useContactDetails';
import {DynamicTextInputSaveDataOnBlur} from '../../components/contactDetails/DinamicTextInputSaveDataOnBlur';
import {ContactType} from '../../../interfaces/contact.interfaces';
import {DropdownComponent} from '../../components/shared/Dropdown';
import {DropdownContactTypes} from '../../../constants/dropdown-data';

export const ContactDetailsScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    contact,
    tempNewFullName,
    tempNewEmail,
    tempNewPhoneNumber,
    updateContactData,
    updateContactPhotoTakingPhoto,
    updateContactPhotoUploadFromMediaLbrary,
    deleteContactPhoto,
    updateTempNewFullName,
    updateTempNewEmail,
    updateTempNewPhoneNumber,
    onChangeText,
  } = useContactDetails();

  return (
    <>
      <ScrollView contentContainerStyle={{flex: 1}}>
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
            {contact.photo ? (
              <>
                <Avatar.Image
                  size={200}
                  source={{uri: contact.photo}}
                  style={GlobalStyles.pressableCircle}
                />
                <FAB
                  icon="trash"
                  color={Colors.primary}
                  style={GlobalStyles.fabDelete}
                  onPress={deleteContactPhoto}
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
                    updateContactPhotoTakingPhoto();
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
                    updateContactPhotoUploadFromMediaLbrary();
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
          <DynamicTextInputSaveDataOnBlur
            label="Full name"
            valueToInput={tempNewFullName}
            placeholder="full name..."
            icon="person-outline"
            // if the user is editing the property value, disabled must be the opposite case
            onChangeText={value => onChangeText(value, updateTempNewFullName)}
            onBlurFunction={(value: string) => {
              updateContactData({name: value});
            }}
          />
          <DynamicTextInputSaveDataOnBlur
            label="email"
            valueToInput={tempNewEmail}
            placeholder="Enter your email"
            icon="person-outline"
            // if the user is editing the property value, disabled must be the opposite case
            onChangeText={value => onChangeText(value, updateTempNewEmail)}
            onBlurFunction={(value: string) => {
              updateContactData({email: value});
            }}
          />
          <DynamicTextInputSaveDataOnBlur
            label="Phone number"
            valueToInput={tempNewPhoneNumber}
            placeholder="phone number..."
            keyboardType="phone-pad"
            icon="call-outline"
            // if the user is editing the property value, disabled must be the opposite case
            onChangeText={value =>
              onChangeText(value, updateTempNewPhoneNumber)
            }
            onBlurFunction={(value: string) => {
              updateContactData({phone: value});
            }}
          />

          {/*Select for assign label*/}
          <DropdownComponent
            label="Contact type"
            iconName="pricetag-outline"
            data={DropdownContactTypes}
            contentValue={contact.type}
            onChange={value => updateContactData({type: value as ContactType})}
          />

          {/*pressable location*/}
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
            onPress={() => {}}>
            <Avatar.Icon
              size={28}
              icon="location"
              style={{backgroundColor: Colors.primary}}
            />
            <Text style={{...GlobalStyles.title, fontSize: 18}}>Location</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};
