import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http   } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Observable } from 'Rxjs/rx';
import { Calendar } from '@ionic-native/calendar';

//import * as $ from "jquery";



/**
 * Generated class for the WorkerMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-worker-main',
  templateUrl: 'worker-main.html'
})
export class WorkerMainPage {
    username = '';
    data = '';
    workerName = localStorage.appUsername;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public toastCtrl: ToastController, private calendar: Calendar) {
    let username = localStorage.appUsername;
    this.http.get('https://api.mlab.com/api/1/databases/aquariaus/collections/'+username+'?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari')
    .map(res => res.json())
    .subscribe(res => {
        this.data = res;
    },(err) => {
        console.log("failed");
    });  
    //Observable.interval(3000).subscribe(()=>{});
        this.http.get('https://api.mlab.com/api/1/databases/aquariaus/collections/'+username+'?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari')
        .map(res => res.json())
        .subscribe(res => {
            this.data = res;

            for(let i = 0 ; i < res.length; i++){
                let title = res[i].clientName;
                let location = res[i].clientAddress;
                let notes = "Appointment ID - "+res[i]._id.$oid;
                let startDate = new Date( new Date(res[i].startDate).getTime() + Math.abs(new Date(res[i].startDate).getTimezoneOffset()*60000) );
               
                let startTime = res[i].startTime.split(":");
                let startTimeHours = startTime[0];
                let startTimeMinutes = startTime[1];
                startDate.setHours(startTimeHours);
                startDate.setMinutes(startTimeMinutes);
                
               
                let endDate = new Date( new Date(res[i].startDate).getTime() + Math.abs(new Date(res[i].startDate).getTimezoneOffset()*60000) );
              
                let endTime = res[i].endTime.split(":");
                let endTimeHours = endTime[0];
                let endTimeMinutes = endTime[1];
                endDate.setHours(endTimeHours);
                endDate.setMinutes(endTimeMinutes);
                
                this.calendar.hasReadWritePermission().then((result)=>{
                    if(result === false){
                        this.calendar.requestReadWritePermission().then((v)=>{
                            this.calendar.deleteEvent(title, location, notes, startDate, endDate).then(res => {
                                    this.addEvent(title, location, notes, startDate, endDate);
                                }, err => {
                                  let toast = this.toastCtrl.create({
                                                  message: err,
                                                  duration: 2000
                                                });
                                                toast.present();
                                });
                            
                            
                        },(r)=>{
                            console.log("Rejected");
                        })
                    }
                    else
                    {
                      
                        this.calendar.deleteEvent(title, location, notes, startDate, endDate).then(res => {
                                    this.addEvent(title, location, notes, startDate, endDate);
                                }, err => {
                                  let toast = this.toastCtrl.create({
                                                  message: err,
                                                  duration: 2000
                                                });
                                                toast.present();
                                });
                    }
                })
            
            }
            
        },(err) => { 
            console.log("failed");
        });
    
    

  }
  
  openCalendar(){
        this.calendar.openCalendar(new Date()).then(
            (msg) => { console.log(msg); },
            (err) => { console.log(err); }
        );
    }
    
    addEvent(title, location, notes, startDate, endDate){
       
        this.calendar.createEvent(title, location, notes, startDate, endDate).then(res => {
        }, err => {
          let toast = this.toastCtrl.create({
                          message: err,
                          duration: 2000
                        });
                        toast.present();
        });
    }
  checkIn(id){
    let checkInDate = new Date().toJSON().slice(0,10);
    let checkInTime = new Date().toLocaleTimeString().slice(0,5);
    let info = { "$set" : {  "status": "Check-In",
                            "checkInDate": checkInDate,
                            "checkInTime": checkInTime } };
    this.http.put(
              'https://api.mlab.com/api/1/databases/aquariaus/collections/'+id.workerName+'/'+id._id.$oid+'?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari',
              info
            ).subscribe(data => {
                let toast = this.toastCtrl.create({
                      message: 'Checked In!!',
                      duration: 3000
                    });
                    toast.present();
            })
  }
  checkOut(id){
    let checkOutDate = new Date().toJSON().slice(0,10);
    let checkOutTime = new Date().toLocaleTimeString().slice(0,5);
    let info = { "$set" : {  "status": "Check-Out",
                            "checkOutDate": checkOutDate,
                            "checkOutTime": checkOutTime } };
    this.http.put(
              'https://api.mlab.com/api/1/databases/aquariaus/collections/'+id.workerName+'/'+id._id.$oid+'?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari',
              info
            ).subscribe(data => {
                let toast = this.toastCtrl.create({
                      message: 'Checked Out!!',
                      duration: 3000
                    });
                    toast.present();
            })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkerMainPage');
  }

}
