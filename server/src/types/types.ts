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

export type ProfileBody = {
  name: string;
  password: string;
  image?: string | null;
};

export type declineFriendBody = {
  friendsId: number;
};


export type addFavoriteBody = {
  userId: number;
  image?: string | null;
  food_id:number;
  title:string;
  summary:string;
};

export type friendsFavoriteBody = {
  userId: number;
};