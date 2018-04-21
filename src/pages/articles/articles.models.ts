/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides class object model for single Article
 * and collection of Articles as an array.
 * **************************************************************/

export class ArticleModel {
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
  themeid: string;
    }
    export class ArticlesModel {
      items: Array<ArticleModel>;
    }