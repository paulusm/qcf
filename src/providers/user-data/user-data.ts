import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_WALKTHROUGH = 'hasSeenWalkthrough';

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    //alert("logging out");
   /*  this.storage.set(this.HAS_SEEN_WALKTHROUGH, false);
    this.storage.set('token', '');
    this.storage.remove('token');
    this.storage.set('userModel','');
    this.storage.remove('userModel'); */
    //this.storage.remove(this.HAS_LOGGED_IN);

    //this.storage.remove(this.HAS_SEEN_WALKTHROUGH);
    
    //this.storage.remove('username');
    //alert("User Logged Out!!!");
    //this.events.publish('user:logout');

  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_WALKTHROUGH).then((value) => {
      return value;
    });
  };
}
