import { prisma } from "../../utils/prisma";

export async function listCommunityUsers() {
  return prisma.communityUser.findMany({ orderBy: { followers: "desc" } });
}

export async function listFeedPosts() {
  return prisma.feedPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function likeFeedPost(id: string) {
  return prisma.feedPost.update({ where: { id }, data: { likes: { increment: 1 } } });
}

export async function listForumPosts() {
  return prisma.forumPost.findMany({ orderBy: [{ pinned: "desc" }, { lastActivity: "desc" }] });
}

export async function listMeetups() {
  return prisma.meetup.findMany({ orderBy: { date: "asc" } });
}
