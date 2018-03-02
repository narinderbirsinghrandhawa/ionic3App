import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController } from 'ionic-angular';
import * as moment from 'moment';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  isToggled: boolean =  true;
  username = '';
  password = '';
 
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public toastCtrl: ToastController) {
    if(localStorage.finderprintEnable == "yes"){
        this.isToggled = true;
         this.username = localStorage.appUsername;
         this.password = localStorage.appPassword;
     }
     else{
        this.isToggled = false;
     }
  }
 
  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        if(data.title == undefined){
            let toast = this.toastCtrl.create({
              message: 'Please enter the name of person you want to book',
              duration: 3000
            });
            toast.present();
        }
        else{
            eventData.startTime = new Date(data.startTime);
            eventData.endTime = new Date(data.endTime);

            let events = this.eventSource;
            events.push(eventData);
            this.eventSource = [];
     
            
            setTimeout(() => {
              this.eventSource = events;
              let toast = this.toastCtrl.create({
                  message: 'Appointment booked to given name person.',
                  duration: 3000
                });
                toast.present();
            });
        } 
      }
    });
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
  onEnableFingerPrint(){
    if(this.isToggled){
        let alert = this.alertCtrl.create({
          title: 'Fingerprint Enabled',
          subTitle: 'Saved Fingerprint in device is used to login for particular user.',
          buttons: ['OK']
        })
        alert.present();
        localStorage.setItem("finderprintEnable", "yes");
    }else{
        let alert = this.alertCtrl.create({
          title: 'Fingerprint Disabled',
          subTitle: 'Fingerprint Login is Disabled',
          buttons: ['OK']
        })
        alert.present();
        localStorage.setItem("finderprintEnable", "no");
    }
    
  }
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    //loginWithFingerPrint();
  }
}