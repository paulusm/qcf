/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides class object model for single FAQ
 * and collection of FAQs as an array.
 * **************************************************************/
export class FAQModel {
    _id: string;
    faqtitle:string;
    faq: string;
    imagepath: string;
    companyid: string;
}
export class FAQsModel {
    items: Array<FAQModel>;
}