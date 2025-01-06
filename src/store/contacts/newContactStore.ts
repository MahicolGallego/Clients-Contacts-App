import {create} from 'zustand';
import {
  ContactType,
  INewContact,
} from '../../interfaces/entities/contact/contact.interfaces';
import {ILocation} from '../../interfaces/entities/location/location';

interface newContactState {
  newContact: INewContact;

  updateTempLocation: (location: ILocation) => void;
  updateTempPhoto: (photo: string) => void;
  deleteTempPhoto: () => void;
  updateTempFullName: (name: string) => void;
  updateTempEmail: (email: string) => void;
  updateTempPhoneNumber: (phone: string) => void;
  updateTempType: (type: ContactType) => void;
  deleteTempLocation: () => void;
  resetNewContact: () => void;
}

const initialContactState: INewContact = {
  name: '',
  phone: '',
  email: null,
  type: ContactType.employee,
  photo: null,
  latitude: null,
  longitude: null,
};

export const useNewContactStore = create<newContactState>()(set => ({
  newContact: initialContactState,
  updateTempLocation: location =>
    set(state => ({newContact: {...state.newContact, ...location}})),
  updateTempPhoto: photo =>
    set(state => ({newContact: {...state.newContact, photo}})),
  deleteTempPhoto: () =>
    set(state => ({newContact: {...state.newContact, photo: null}})),
  updateTempFullName: name =>
    set(state => ({newContact: {...state.newContact, name}})),
  updateTempEmail: email =>
    set(state => ({newContact: {...state.newContact, email}})),
  updateTempPhoneNumber: phone =>
    set(state => ({newContact: {...state.newContact, phone}})),
  updateTempType: type =>
    set(state => ({newContact: {...state.newContact, type}})),
  deleteTempLocation: () =>
    set(state => ({
      newContact: {
        ...state.newContact,
        latitude: null,
        longitude: null,
      },
    })),
  resetNewContact: () =>
    set({
      newContact: initialContactState,
    }),
}));
