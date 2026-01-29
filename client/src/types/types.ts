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
  id: number;
  name: string;
  image?: string;
  confirmrequest?: number | null;
  requestFrom?: "sent" | "received" | null;
};

export interface Me {
  id: number;
  name: string;
  email: string;
  image?: string;
}

export interface AddFriendProps {
  id: number;
  status?: number | null;
  onFriendAdded?: () => void;
}

export interface DeleteFriendProps {
  id: number;
  onDeleteFriends?: () => void;
}

export interface DeclineFriendProps {
  id: number;
  onDecline?: () => void;
}

export interface ConfirmFriendProps {
  id: number;
  onConfirm?: () => void;
}

export type Food = {
  id: number;
  title: string;
  image?: string;
};

export type DetailedFood = {
  id: number;
  title: string;
  image?: string;
};

export type MyFood = {
  id: number;
  user_id: number;
  food_id: number;
  summary: string;
  image?: string;
  title: string;
};

export type FriendsFood = {
  id: number;
  food_id: number;
  name: string;
  image?: string;
  title: string;
};

export type PropsComments = {
  comments: string;
  setComments: (value: string) => void;
  id: number;
  onAdded: () => void;
};

export type oldComments = {
  id: number;
  comment: string;
  time: string;
  name: string;
};

export type OldCommentsProps = {
  oldComment: oldComments[];
};

export interface SearchUsersProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export type MessageItem = {
  id: number;
  message: string;
};

export type MessageProps = {
  id: string | string[];
  onSent: () => void;
  message: string;
  recivedMessages: string;
  setRecivedMessages: React.Dispatch<React.SetStateAction<MessageItem[]>>;
};

export type UserMessage = { id: number; name: string };

export type RawMessage = {
  id: number;
  from: UserMessage;
  to: UserMessage;
  message: string;
  from_name?: string;
  to_name?: string;
  created_at: string;
};

export type Message = {
  id: number;
  from: UserMessage;
  to: UserMessage;
  message: string;
  created_at: string;
};

export interface ChatInputProps {
  text: string;
  setText: (t: string) => void;
  sendMessage: (text: string) => void;
  markMessagesAsRead: () => void;
}

export interface ChatMessageProps {
  message: Message;
  myId: number | null;
}

export type ChatRouteParams = {
  id: string | number;
  message_id: string | number;
};

export type Chats = {
  id: number;
  message_id: number;
  name: string;
  read: boolean;
  from_friend: number;
};
