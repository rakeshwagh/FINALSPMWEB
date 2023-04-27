export interface IUser {
  _id?: any;
  name?: string;
  password?: string;
  email: string;
  isAdmin?: boolean;
  token?: string;
  phone?: string;
}

interface UName {
  firstName: string;
  lastName: string;
}

export interface IUserInfo {
  userInformation: IUser | null;
}

//RootState interface=> used for state type in useSelector hook

export interface IUserInfoRootState {
  userInfo: IUserInfo;
}
