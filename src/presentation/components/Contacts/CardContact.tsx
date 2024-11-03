import React, {useState} from 'react';
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import {Avatar, FAB, Text} from 'react-native-paper';
import {IContact} from '../../../interfaces/contact.interfaces';
import {DynamicTextInput} from '../shared/DinamicTextInput';
import {Colors} from '../../theme/global.styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../../routes/StackNavigator';

interface props {
  item: IContact;
  removeContact: (contact_id: string) => void;
}

export const CardContact = ({item, removeContact}: props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ContactDetails', {item})}>
      <View style={{...styles.cardContainer}}>
        {item.photo ? (
          <Avatar.Image size={60} source={{uri: item.photo}} />
        ) : (
          <Avatar.Icon
            icon="person"
            size={60}
            color={Colors.textPrimary}
            style={{backgroundColor: Colors.border}}
          />
        )}
        <DynamicTextInput
          contentValue={item.name}
          label={item.type}
          width={'75%'}
          editable={false}
          iconWithAction={{
            icon: 'trash-outline',
            action: () => {
              setModalVisible(!modalVisible);
            },
          }}
        />
        {/*modal*/}

        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure to delete the contact {item.name}?
              </Text>
              <FAB
                color="white"
                label="Close"
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
              <FAB
                color="white"
                label="Delete"
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  removeContact(item.id as string);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    padding: 10,
    alignContent: 'center',
    justifyContent: 'flex-end',
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBackground,
    paddingHorizontal: 20,
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: Colors.primaryBackground,
    borderRadius: 20,
    padding: 35,
    borderColor: Colors.border,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: 100,
    elevation: 2,
    position: 'absolute',
    bottom: -30,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    left: 60,
  },
  buttonDelete: {
    backgroundColor: '#f50606',
    right: 60,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.textPrimary,
  },
});
