export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isCaregiving: boolean;
  isAdmin: boolean;
  expectedFee?: number;
  location?: string;
  bio: string;
  tags: string[];
  experience: string;
  homeEnvironment: string;
  profilePicture?: string;
}
