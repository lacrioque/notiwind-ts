import { events } from './events'

let count = 0

const generateId = () => {
  return count++
}

export const notify = (
  notificationData: Notiwind.NotificationGenerator,
  timeout: number
) => {
  const notification: Notiwind.Notification = {
    id: generateId(),
    ...notificationData,
  };
  events.emit("notify", { notification, timeout });

  return () => events.emit("close", notification.id);
};
