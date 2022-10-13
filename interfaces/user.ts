import { IAuthor } from "./topic";

export interface IUser {
  loginname:      string;
  avatar_url:     string;
  githubUsername: string;
  create_at:      Date;
  score:          number;
  recent_topics:  IRecent[];
  recent_replies: IRecent[];
}

export interface IRecent {
  id:            string;
  author:        IAuthor;
  title:         string;
  last_reply_at: Date;
}