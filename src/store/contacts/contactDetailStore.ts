import {create} from 'zustand';
import {ContactType} from '../../interfaces/entities/contact/contact.interfaces';
import {IContactResponse} from '../../interfaces/api-responses/contacts-responses';

interface contactDetailState {
  contact: IContactResponse;

  setContact: (contactDetails: IContactResponse) => void;
  resetContact: () => void;
}

const initialContactDetails: IContactResponse = {
  id: '',
  name: '',
  id_user: '',
  phone: '',
  email: null,
  type: ContactType.employee,
  photo: null,
  location: null,
};

export const useContactDetailStore = create<contactDetailState>()(set => ({
  contact: initialContactDetails,
  setContact: contactDetails => set({contact: {...contactDetails}}),
  resetContact: () =>
    set({
      contact: initialContactDetails,
    }),
}));
