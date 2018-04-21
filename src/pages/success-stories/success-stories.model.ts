/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides class object model for single success-story
 * and collection of success-stories as an array.
 * **************************************************************/
/**
 * 
 */
export class SuccessStoryModel {
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
/**
 * 
 */
export class SuccessStoriesModel {
      items: Array<SuccessStoryModel>;
}