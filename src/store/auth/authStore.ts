import {create} from 'zustand';
import {User} from '../../interfaces/entities/user/user.interface';
import {auhtRegister, authLogin} from '../../actions/auth/auth';
import {DataStorage} from '../../adapters/data-storage/AsyncStorage';

interface AuthState {
  is_authenticated: boolean | null;
  token?: string;
  user?: User;

  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(set => ({
  is_authenticated: null,
  token: undefined,
  user: undefined,

  register: async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    const response = await auhtRegister(name, email, password);
    if (!response) {
      set({is_authenticated: null, token: undefined, user: undefined});
      return false;
    }

    set({
      is_authenticated: true,
      token: response.token,
      user: response.user,
    });

    await DataStorage.setItem('token', response.token);
    await DataStorage.setItem('user', JSON.stringify(response.user));

    return true;
  },

  login: async (email: string, password: string): Promise<boolean> => {
    const response = await authLogin(email, password);
    if (!response) {
      set({is_authenticated: false, token: undefined, user: undefined});
      return false;
    }

    set({
      is_authenticated: true,
      token: response.token,
      user: response.user,
    });

    await DataStorage.setItem('token', response.token);
    await DataStorage.setItem('user', JSON.stringify(response.user));

    return true;
  },

  checkStatus: async (): Promise<boolean> => {
    const token = await DataStorage.getItem('token');
    const userString = await DataStorage.getItem('user');

    if (token && userString) {
      const user = JSON.parse(userString);
      set({is_authenticated: true, token, user});
      return true;
    }

    set({is_authenticated: false, token: undefined, user: undefined});
    return false;
  },

  logout: async () => {
    await DataStorage.removeItem('token');
    await DataStorage.removeItem('user');
    set({is_authenticated: false, token: undefined, user: undefined});
  },
}));
