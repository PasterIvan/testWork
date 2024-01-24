import {instance} from './instances';

export const usersAPI = {
  getUsers(params: {seed: string; results: number; page: number}) {
    return instance.get('', {params});
  },
};
