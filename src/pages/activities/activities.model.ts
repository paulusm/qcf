export class ActivityModel {
   /*  title: string;
    published: string;
    details: string;
    url: string; */


    _id: string;
    updatedAt: string;
    createdAt: string;
    activityname: string;
    activitydescription: string;
    activityowner: string;
    companyid: string;
    enddate: string;
    startdate: string;
    mydonateurl: string;
    sponsors: string[];
    volunteers: string[];
    likes: string[];
    approved: boolean;
    donationmatch: number;
    activitytype: string;
    address:string;
    filename:string;
    displayImage:string;
  }
  export class ActivitiessModel {
    items: Array<ActivityModel>;
  }