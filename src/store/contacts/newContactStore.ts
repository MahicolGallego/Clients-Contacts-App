import {create} from 'zustand';
import {
  ContactType,
  IContact,
} from '../../interfaces/entities/contact/contact.interfaces';
import {ILocation} from '../../interfaces/entities/location/location';

interface newContactState {
  newContact: IContact;

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

const initialContactState: IContact = {
  id: undefined,
  name: '',
  phone: '',
  email: '',
  type: ContactType.employee,
  photo: undefined,
  location: {latitude: null, longitude: null},
};

export const useNewContactStore = create<newContactState>()(set => ({
  newContact: initialContactState,
  updateTempLocation: location =>
    set(state => ({newContact: {...state.newContact, location}})),
  updateTempPhoto: photo =>
    set(state => ({newContact: {...state.newContact, photo}})),
  deleteTempPhoto: () =>
    set(state => ({newContact: {...state.newContact, photo: ''}})),
  updateTempFullName: name =>
    set(state => ({newContact: {...state.newContact, name}})),
  updateTempEmail: email =>
    set(state => ({newContact: {...state.newContact, email}})),
  updateTempPhoneNumber: phone =>
    set(state => ({newContact: {...state.newContact, phone}})),
  updateTempType: type =>
    set(state => ({newContact: {...state.newContact, type}})),
  deleteTempLocation: () =>
    set(state => ({newContact: {...state.newContact, location: undefined}})),
  resetNewContact: () =>
    set({
      newContact: initialContactState,
    }),
}));
