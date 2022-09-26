import { events } from './events'
import type { NotificationGenerator, Notification } from "./notiwind.types";

let count = 0

const generateId = () => {
  return count++
}

export const notify = (
  notificationData: NotificationGenerator,
  timeout: number
) => {
  const notification: Notification = {
    id: generateId(),
    ...notificationData,
  };
  events.emit("notify", { notification, timeout });

  return () => events.emit("close", notification.id);
};
