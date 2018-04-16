/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides class object model for single User
 * and collection of Users as an array.
 * **************************************************************/
export class NotificationModel {
  displayname : string;
  email : string;
  department : string;
  imagepath : string;
  jobtitle: string;
  about : string; 
  role : string;
  companyid: string;
  forename: string;
  surname: string;
  displayImage: string;
}

export class NotificationsModel {
  users: Array<NotificationModel> = [];
}
