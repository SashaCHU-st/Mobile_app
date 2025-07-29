export type SignUpBody = {
  email: string;
  name: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type addFriendBody = {
  userId: number;
  friendsId: number;
};