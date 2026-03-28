export type ChatRole = "system" | "user" | "assistant";
export type UserAssistantChatRole = Exclude<ChatRole, "system">;

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface UserAssistantChatMessage {
  role: UserAssistantChatRole;
  content: string;
}

export interface ExplainLikeI5Response {
  simpleExplanation: string;
  stepByStep: string[];
  exampleInputOutput: {
    input: string;
    output: string;
  };
}

