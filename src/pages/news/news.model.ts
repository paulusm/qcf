/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides class object model for single News
 * and collection of News as an array.
 * **************************************************************/
export class NewsModel {
  approved: boolean;
  createdAt: string;
  imagepath: string;
  likes:  string[];
  publisheddate: string;
  story: string;
  storyauthor: string;
  storytitle: string;
  type: string;
  updatedAt: string;
  _id: string;
  displayImage:string;
  }
  export class NewssModel {
    
    items: Array<NewsModel>;
  }