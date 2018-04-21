/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides class object model for single Activity
 * and collection of Activities as an array.
 * **************************************************************/

export class ActivityModel {
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
    targethours:number;
    totalamount:number;
    targetamount:number;
    totalhours:number;
    feedback:string;
    status:string[];

  }
  /**
 * 
 */
  export class ActivitiessModel {
    items: Array<ActivityModel>;
  }