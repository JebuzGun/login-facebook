import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-recuerdos',
  templateUrl: 'recuerdos.html',
})
export class RecuerdosPage {

  constructor(public navCtrl: NavController) {
  }

  addMemory() {
    this.navCtrl.push('RecuerdoPage');
  }
  editMemory() {

  }

}
