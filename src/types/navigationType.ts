import {NativeStackScreenProps} from 'react-native-screens/native-stack';

export type RootParamList = {
  Users: undefined;
  User: {imageURL: string};
};
export type UsersScreenProps = NativeStackScreenProps<RootParamList, 'Users'>;
export type UserScreenProps = NativeStackScreenProps<RootParamList, 'User'>;
