import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
import { Geolocation } from "@ionic-native/geolocation";

@IonicPage()
@Component({
  selector: 'page-recuerdo',
  templateUrl: 'recuerdo.html',
})
export class RecuerdoPage {

  private name:string='';
  private location:string='';
  edit:boolean = false;
  private _info:any;

  private rememberImage:string;
  private rememberName:string = '';
  private rememberPlace:any = {
    latitude: Number,
    longitude: Number
  };
  private index:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private _camera:Camera,
              private _geolocation:Geolocation,
              public toastCtrl: ToastController,
              private _loadingCtrl: LoadingController,
              private _alertCtrl: AlertController) {
    let memory = this.navParams.get('remember');
    console.log('obtenido desde editar',memory);
    if(memory) {
      this.edit = true;
      this.rememberImage = memory.remember.img;
      this.rememberPlace.latitude = memory.remember.latitude;
      this.rememberPlace.longitude = memory.remember.longitude;
      this.rememberName = memory.remember.name;
      this.index = memory.index;
    }
  }

  editMemory() {
    let alert = this._alertCtrl.create({
      title: 'Edición de '+this.rememberName,
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Editar',
          handler: () => {
            let data:any[] = JSON.parse(localStorage.getItem('remembers'));
            let jsonHelper = {
              latitude: this.rememberPlace.latitude,
              longitude: this.rememberPlace.longitude,
              name: this.rememberName,
              img: this.rememberImage
            } ;
            data[this.index] = jsonHelper;
            localStorage.setItem('remembers', JSON.stringify(data));
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }

  deleteMemory() {
    let data = JSON.parse(localStorage.getItem('remembers'));
    console.log(data);
    console.log(this.index);
    data.splice(this.index,1);
    localStorage.setItem('remembers',JSON.stringify(data));
    this.navCtrl.popToRoot().then(() => {
      let toast= this.toastCtrl.create({
        message: 'Recuerdo '+this.rememberName+' eliminado',
        duration: 1500
      });
      toast.present();
    })
  }


  getPicture() {
    this._camera.getPicture({
      sourceType: this._camera.PictureSourceType.CAMERA,
      encodingType: this._camera.EncodingType.JPEG,
      destinationType: this._camera.DestinationType.DATA_URL,
      mediaType: this._camera.MediaType.PICTURE,
      quality: 50
    }).then((imageData:any) => {
      this.rememberImage = imageData;
    });
  }

  getLocation() {
    let loading = this._loadingCtrl.create({
      content: 'Obteniendo ubicaón'
    });
    loading.present();
    this._geolocation.getCurrentPosition().then((position) => {
      this.rememberPlace.latitude = position.coords.latitude;
      this.rememberPlace.longitude = position.coords.longitude;
      console.log(this.rememberPlace);
      loading.dismissAll();
    }, (err:any) => {
      loading.dismissAll();
      let toast = this.toastCtrl.create({
        duration: 1500,
        position: 'bottom',
        message: 'Sin permisos para obtener posición'
      });
      toast.present();
    }).catch(() => {
      loading.dismissAll();
      let toast = this.toastCtrl.create({
        duration: 1500,
        position: 'bottom',
        message: 'Error al obtener la posición'
      });
      toast.present();
    });
  }

  insertToMemory() {
    let jsonHelper = {
      latitude: this.rememberPlace.latitude,
      longitude: this.rememberPlace.longitude,
      name: this.rememberName,
      img: this.rememberImage
    } ;
    let memory:any[] = JSON.parse(localStorage.getItem('remembers'));
    console.log('dataObtenida', memory);
    if(memory) {
      memory.push(jsonHelper);
    }
    console.log('data',memory);
    console.log('dara',jsonHelper);
    localStorage.setItem('remembers', JSON.stringify(memory));
    this.navCtrl.popToRoot().then(() => {
    });
  }
}
