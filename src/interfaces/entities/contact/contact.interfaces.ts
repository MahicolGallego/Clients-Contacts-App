// interfaces
export interface INewContact {
  name: string;
  phone: string;
  email?: string | null;
  type: ContactType;
  photo?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

// types
export type IUpdateContact = Partial<INewContact>;

//enums
export enum ContactType {
  client = 'client',
  employee = 'employee',
}
