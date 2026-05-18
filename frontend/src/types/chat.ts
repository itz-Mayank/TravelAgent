export type Message = {
  role: "user" | "assistant";
  content: any;
};

export type ChatSession = {
  id: string;
  title: string;
  pinned: boolean;
  wishlist: boolean;
  createdAt: string;
  messages: Message[];
};