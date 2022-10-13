export interface IMessage {
  has_read_messages:    IMessageItem[];
  hasnot_read_messages: IMessageItem[];
}

export interface IMessageItem {
  id:        string;
  type:      string;
  has_read:  boolean;
  author:    IMessageAuthor;
  topic:     IMessageTopic;
  reply:     IMessageReply;
  create_at: Date;
}

export interface IMessageAuthor {
  loginname:  string;
  avatar_url: string;
}

export interface IMessageReply {
  id:        string;
  content:   string;
  ups:       any[];
  create_at: Date;
}

export interface IMessageTopic {
  id:            string;
  title:         string;
  last_reply_at: Date;
}
