import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ToastController } from 'ionic-angular';
import { Http   } from '@angular/http';
import 'rxjs/add/operator/map';

import { Vibration } from '@ionic-native/vibration';
import { TouchID } from '@ionic-native/touch-id';

import { HomePage } from '../home/home';
import { NewUserFormPage } from '../new-user-form/new-user-form';
import { WorkerMainPage } from '../worker-main/worker-main';




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    username = '';
    password = '';
    isToggled: boolean =  true;

constructor(public navCtrl: NavController, private _platform: Platform, public navParams: NavParams, public toastCtrl: ToastController, private vibration: Vibration, private touchId: TouchID, public http:Http) {
 if(localStorage.appUsername && localStorage.appPassword){
    this.isToggled = true;
     this.username = localStorage.appUsername;
     this.password = localStorage.appPassword;
 }
 else{
    this.isToggled = false;
 }
 this._platform.ready().then(() => {

    if(localStorage.finderprintEnable == "yes"){
        this.touchId.verifyFingerprint('Scan your fingerprint please')
          .then(
            res => this.navCtrl.push(HomePage),
            err => console.error('Error', err)
          );
     }
  });
  
}
  loginCheck(){
    this.http.get('https://api.mlab.com/api/1/databases/aquariaus/collections?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari')
    .map(res => res.json())
    .subscribe(res => {
        //this.user = res.results;
        console.log(res[0])
        for( let i = 0; i < res.length - 1; i++){
            if(this.username == res[i]){
                if(this.password == res[i]){
                    if(this.isToggled == true){
                        localStorage.setItem("appUsername", this.username);
                        localStorage.setItem("appPassword", this.password);
                        this.navCtrl.push(WorkerMainPage);            
                    }else{
                        localStorage.setItem("appUsername", this.username);
                        localStorage.removeItem("appPassword");
                        this.username = "";
                        this.password = "";
                        localStorage.setItem("appuser", this.username);
                        this.navCtrl.push(WorkerMainPage);
                    }
                }
                else{
                    let toast = this.toastCtrl.create({
                          message: 'Username or Password may be wrong!!',
                          duration: 3000
                        });
                        toast.present();
                        this.vibration.vibrate(1000);
                }
            }
        }
    },(err) => {
        console.log("failed");
    })
    
  
  }
  
  newUserPage() {
    this.navCtrl.push(NewUserFormPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //loginWithFingerPrint();
  }
  loadJson(){
    this.http.get('https://api.mlab.com/api/1/databases/celltrak/collections/admin?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari')
    .map(res => res.json())
    .subscribe(res => {
        //this.user = res.results;
        console.log(res.length)
    },(err) => {
        console.log("failed");
    })
  }

}
