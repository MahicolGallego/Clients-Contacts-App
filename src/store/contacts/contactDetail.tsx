import {create} from 'zustand';
import {ContactType, IContact} from '../../interfaces/contact.interfaces';

interface contactDetailState {
  contact: IContact;

  setContact: (contactDetails: IContact) => void;
  deleteLocation: () => void;
  resetContact: () => void;
}

const initialContactDetails: IContact = {
  id: undefined,
  name: '',
  phone: '',
  email: '',
  type: ContactType.Employee,
  photo: undefined,
  location: {latitude: null, longitude: null},
};

export const useContactDetailStore = create<contactDetailState>()(set => ({
  contact: initialContactDetails,
  setContact: contactDetails => set({contact: {...contactDetails}}),
  deleteLocation: () =>
    set(state => ({
      contact: {...state.contact, location: {latitude: null, longitude: null}},
    })),
  resetContact: () =>
    set({
      contact: initialContactDetails,
    }),
}));
