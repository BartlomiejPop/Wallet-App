import { httpAuth } from '../config/services';

export const authApi = {
  loginUser: async (userData) => {
    const { data } = await httpAuth.post(`/login`, {
      email: userData.email,
      password: userData.password,
    });
    console.log(data);
    return data;
  },
};
