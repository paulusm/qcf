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
  }

}
export class ProfilePostModel {
  date: Date;
	image: string;
	description: string;
	likes: number = 0;
	comments: number = 0;
	liked: boolean = false;
}

export class ProfileModel {
  user: UserModel = new UserModel();
  following: Array<UserModel> = [];
  followers: Array<UserModel> = [];
  posts: Array<ProfilePostModel> = [];
}
