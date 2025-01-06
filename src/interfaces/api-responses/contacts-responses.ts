import {ContactType} from '../entities/contact/contact.interfaces';

export interface IContactResponse {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  type: ContactType;
  photo: string | null;
  id_user: string;
  location: Location | null;
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  id_contact: string;
}

export interface IDeleteContactResponse {
  mesagge: string;
}
