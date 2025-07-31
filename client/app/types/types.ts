export interface LoginProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  login: boolean;
  setLogin: (value: boolean) => void;
}

export interface AuthProps {
  email: string;
  setEmail: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  login: boolean;
  setLogin: (value: boolean) => void;
}

export type User = {
  id:number,
  name:string;
}
export interface Me  {
  id:number,
  name:string;
  email:string;
  password:string;
}

export interface AddFriendProps {
  id: number;
}

export interface DeleteFriendProps {
  id: number;
}
