import { prisma } from "../../utils/prisma";

export async function listEvents() {
  return prisma.calendarEvent.findMany({ orderBy: { start: "asc" } });
}

export async function createEvent(data: { title: string; start: string; end: string; color?: string; allDay?: boolean }) {
  return prisma.calendarEvent.create({ data: { title: data.title, start: new Date(data.start), end: new Date(data.end), color: data.color ?? "#6366f1", allDay: data.allDay ?? false } });
}
