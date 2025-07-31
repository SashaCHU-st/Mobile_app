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
  friendsId: number;
};

export type deleteFriendBody = {
  friendsId: number;
};
