/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying details of selected User
 * User get render on page initiation.
 ****************************************************************/

import { Component } from '@angular/core';
import { NavController, NavParams ,ActionSheetController } from 'ionic-angular';
import { ActivitiessModel } from '../activities/activities.model';
import { ActivitiesService } from '../activities/activities.service';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { UserModel } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';


@Component({
  selector: 'page-other-user-details',
  templateUrl: 'other-user-details.html',
})
/**
 * Class representing Other User Details Page
 */
export class OtherUserDetailsPage {
  item: any;
  colorTheme: any;
  colorThemeHeader:any;
  activities: ActivitiessModel = new ActivitiessModel();
  currentRole:any;
  profile: UserModel = new UserModel();
  roleStatus:boolean=true;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param navCtrl 
   * @param navParams 
   * @param activitiesService 
   * @param appThemeColorProvider 
   * @param actionSheetCtrl 
   * @param authService 
   * @param nav 
   * @param profileService 
   */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public activitiesService:ActivitiesService,
    public appThemeColorProvider:AppThemeColorProvider,
    public actionSheetCtrl:ActionSheetController,
    public authService: AuthenticationProvider,
    public nav: NavController,
    public profileService: ProfileService) {

    this.item = navParams.get("newItem");
    this.currentRole = this.item.role;

    this.profileService.getData().then((user)=>{ 
      this.profile = user;
      if(this.profile.role==="BusinessAdmin"){
        this.roleStatus=false;
        
      } 
    }); 

    this.activitiesService
            .getActivities()
            .then(data => {
              let  tempArray1 = JSON.parse(data['_body']);
              let tempArray2=[];
              for(let t of tempArray1){
                      if(t.sponsors.indexOf(this.item.email)!= -1 || t.volunteers.indexOf(this.item.email)!= -1){
                          t.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+t.filename;
                          tempArray2.push(t);    
                      }
              }  
              this.activities.items = tempArray2;
              
            });   
    
    /**
     * Initializing color-theme for app's header navbar,menu and tabs
     */        
    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      if(value===null){
        this.colorTheme = 'app-color-theme-4';
        this.colorThemeHeader = 'ion-header-4';
      }else if(value==='app-color-theme-1'){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-2'){
        this.colorTheme = 'app-color-theme-2';
        this.colorThemeHeader = 'ion-header-2';
      }else if(value==='app-color-theme-3'){
        this.colorTheme = 'app-color-theme-3';
        this.colorThemeHeader = 'ion-header-3';
      }else if(value==='app-color-theme-4'){
        this.colorTheme = 'app-color-theme-4';
        this.colorThemeHeader = 'ion-header-4';
      }
    });
  }

  ionViewDidLoad() {}
/**
 * Method to edit role of user
 */
  editRole(newRole){
    this.item.role = newRole;
    this.authService.updateAccount(this.item).then((result) => {
      this.nav.insert(0,TabsNavigationPage);
      this.nav.popToRoot();

    }, (err: any) => {
          alert(`status: ${err.status}, ${err.statusText}`);
    });
  }
/**
 * Method to present Action Sheet to present user options of roles
 */
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Current Role: '+ this.currentRole,
      buttons: [
        {
          text: 'Change it to Business Admin',
          handler: () => {
            this.editRole("BusinessAdmin");
          }
        },
        {
          text: 'Chnage it to Employee',
          handler: () => {
            this.editRole("Employee");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present(); 
  }

}
