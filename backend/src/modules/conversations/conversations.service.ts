import { prisma } from "../../utils/prisma";
import { ApiError } from "../../utils/http";

export async function listConversations() {
  return prisma.conversation.findMany({ orderBy: { lastMessageTime: "desc" } });
}

export async function getMessages(conversationId: string) {
  const convo = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!convo) throw new ApiError(404, "Conversation not found");
  return prisma.message.findMany({ where: { conversationId }, orderBy: { createdAt: "asc" } });
}

export async function sendMessage(conversationId: string, senderId: string | null, senderName: string, content: string) {
  const msg = await prisma.message.create({ data: { conversationId, senderId, senderName, content } });
  await prisma.conversation.update({ where: { id: conversationId }, data: { lastMessage: content, lastMessageTime: new Date() } });
  return msg;
}
