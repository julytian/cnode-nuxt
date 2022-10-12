export interface ITopic {
  id:            string;
  author_id:     string;
  tab:           string;
  content:       string;
  title:         string;
  last_reply_at: Date;
  good:          boolean;
  top:           boolean;
  reply_count:   number;
  visit_count:   number;
  create_at:     Date;
  author:        IAuthor;
}

export interface IAuthor {
  loginname:  string;
  avatar_url: string;
}