/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides class object model for single User profile
 * and collection of Users profiles as an array.
 * **************************************************************/
export class UserModel {
  imagepath: string;
  _id: string;
  email: string;
  role: string;
  forename: string;
  surename: string;
  displayname: string;
  department: string;
  companyid: string;
  isfirstlogin: string;
  description: string;
  designation:string;
  about:string;
  jobtitle:string;
  
  constructor() {}
  
  setUser(user){
    this._id = user._id;
    this.email = user.email;
    this.role = user.role;
    this.forename = user.forename;
    this.surename = user.surname;
    this.department = user.department;
    this.companyid = user.companyid;
    this.displayname = user.displayname;
    this.isfirstlogin = user.isfirstlogin;
    this.imagepath = user.imagepath;
    this.about =  user.about;
    this.jobtitle =  user.jobtitle;
  }

}
export class ProfilesModel {
  users: Array<UserModel> = [];
}
