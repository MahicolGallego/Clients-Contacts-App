import {useState} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, View} from 'react-native';
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
                ...styles.pressableCircle,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              },
              pressed && {
                ...GlobalStyles.buttonPrimary,
                ...styles.pressableCircle,
              },
            ]}
            onPress={() => setIsVisible(!isVisible)}>
            {newContact.photo ? (
              <>
                <Avatar.Image
                  size={200}
                  source={{uri: newContact.photo}}
                  style={styles.pressableCircle}
                />
                <FAB
                  icon="trash"
                  color={Colors.primary}
                  style={styles.fab}
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
                <Text style={GlobalStyles.headerText}>+ Add photo</Text>
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
              <View style={styles.modalContainer}>
                <FAB
                  icon="camera"
                  color="white"
                  label="Photo"
                  style={styles.modalButton}
                  onPress={() => {
                    setIsVisible(!isVisible);
                    updateTempPhotoTakingPhoto();
                  }}
                />
                <FAB
                  icon="image"
                  color="white"
                  label="Gallery"
                  style={styles.modalButton}
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
                style={{...styles.modalButton, width: '100%'}}
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
          <View style={styles.pickerContainer}>
            <IconMI name="label" size={28} color={Colors.primary} />

            <Picker
              selectedValue={newContact.type}
              onValueChange={updateTempType}
              style={{...styles.picker}}
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
            <Text style={{...GlobalStyles.headerText, fontSize: 18}}>
              Location
            </Text>
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

const styles = StyleSheet.create({
  pressableCircle: {
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.secondaryBackground,
    paddingHorizontal: 10,
  },
  picker: {
    width: '90%',
    color: Colors.textPrimary, // Color del texto
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  modalButton: {
    ...GlobalStyles.buttonPrimary,
    width: '40%',
    alignSelf: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: 8,
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    backgroundColor: Colors.secondaryBackground,
    borderColor: Colors.border,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
