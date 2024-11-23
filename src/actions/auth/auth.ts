import {CloseToYouAPI} from '../../config/api/CloseToYouAPI';
import {ILoginResponse} from '../../interfaces/api-responses/auth-responses';

export const authLogin = async (email: string, password: string) => {
  try {
    console.log(email, password);
    const {data} = await CloseToYouAPI.post<ILoginResponse>('/auth/login', {
      email,
      password,
    });

    const {user, accessToken} = data;
    return {
      user,
      token: accessToken,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const auhtRegister = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    console.log(name, email, password);
    const {data} = await CloseToYouAPI.post<ILoginResponse>('/auth/register', {
      name,
      email,
      password,
    });

    const {user, accessToken} = data;
    return {
      user,
      token: accessToken,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
