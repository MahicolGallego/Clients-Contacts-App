// interfaces
export interface IContact {
  id?: string;
  name: string;
  phone: string;
  email: string;
  type: ContactType;
  photo?: string;
  location?: {latitude: number | null; longitude: number | null};
}

// types
export type IUpdateContact = Omit<Partial<IContact>, 'id'>;

//enums
export enum ContactType {
  Client = 'Client',
  Employee = 'Employee',
}
