export interface user {
  name: string;
  surname: string;
  personalNumber: string;
  phoneNumber: string;
  username: string;
  password: string;
}
export interface registeredUser extends user {
  id: string;
}
export interface userData {
  personalNumber: string;
  phoneNumber: string;
  username: string;
}
