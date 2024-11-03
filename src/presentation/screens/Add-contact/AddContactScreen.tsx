import {useState} from 'react';
import {Modal, Pressable, ScrollView, View} from 'react-native';
import {Avatar, FAB, Text} from 'react-native-paper';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import {Colors, GlobalStyles} from '../../theme/global.styles';
import {DynamicTextInput} from '../../components/shared/DinamicTextInput';
import {Picker} from '@react-native-picker/picker';
import {useAddContact} from '../../hooks/useAddContact';

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
    addContact,
  } = useAddContact();

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
            contentValue={newContact.email}
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
          <View style={GlobalStyles.pickerContainer}>
            <IconMI name="label" size={28} color={Colors.primary} />

            <Picker
              selectedValue={newContact.type}
              onValueChange={updateTempType}
              style={{...GlobalStyles.picker}}
              dropdownIconColor="white">
              <Picker.Item label="Employee" value="Employee" />
              <Picker.Item label="Client" value="Client" />
            </Picker>
          </View>

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
            onPress={() => addContact({NewContact: newContact})}
          />
        </View>
      </ScrollView>
    </>
  );
};
