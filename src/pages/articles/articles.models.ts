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
    }
    export class ArticlesModel {
      items: Array<ArticleModel>;
    }