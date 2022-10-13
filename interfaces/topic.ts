export interface ITopic {
  id: string;
  author_id: string;
  tab: string;
  content: string;
  title: string;
  last_reply_at: Date;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: Date;
  author: IAuthor;
}

export interface IAuthor {
  loginname: string;
  avatar_url: string;
}

export interface ITopicDetail {
  id: string;
  author_id: string;
  tab: string;
  content: string;
  title: string;
  last_reply_at: Date;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: Date;
  author: IAuthor;
  replies: IReply[];
  is_collect: boolean;
}

export interface IReply {
  id: string;
  author: IAuthor;
  content: string;
  ups: string[];
  create_at: Date;
  reply_id: null | string;
  is_uped: boolean;
}

export interface IUserInfo {
  avatar_url: string;
  id: string;
  loginname: string;
  token: string;
}
export interface IAddReplyParams {
  accesstoken: string;
  content: string;
  reply_id?: string;
  topic_id: string;
}
export interface IUpdateTopicParams {
  accesstoken: string;
  title: string;
  tab: string;
  content: string;
  topic_id?: string;
}