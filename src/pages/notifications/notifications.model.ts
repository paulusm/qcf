export class NotificationModel {
  image: string;
  about: string;
  name: string;
  designation: string;
}

export class NotificationsModel {
  users: Array<NotificationModel> = [];
}
