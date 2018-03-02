import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';



import { LoginPage } from '../login/login';

/**
 * Generated class for the NewUserFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-user-form',
  templateUrl: 'new-user-form.html',
})
export class NewUserFormPage {
    @ViewChild(Slides) slides: Slides;
    username = '';
    password = '';
    firstname = '';
    lastname = '';
    email = '';
    userImage = '';
    slideData = [{ image: "../../assets/imgs/001-man-13.png" },
                { image: "../../assets/imgs/002-woman-14.png" },
                { image: "../../assets/imgs/003-woman-13.png" },
                { image: "../../assets/imgs/004-woman-12.png" },
                { image: "../../assets/imgs/005-woman-11.png" },
                { image: "../../assets/imgs/006-woman-10.png" },
                { image: "../../assets/imgs/007-woman-9.png" },
                { image: "../../assets/imgs/008-woman-8.png" },
                { image: "../../assets/imgs/009-woman-7.png" },
                { image: "../../assets/imgs/010-woman-6.png" },
                { image: "../../assets/imgs/011-woman-5.png" },
                { image: "../../assets/imgs/012-woman-4.png" },
                { image: "../../assets/imgs/013-woman-3.png" },
                { image: "../../assets/imgs/014-man-12.png" },
                { image: "../../assets/imgs/015-man-11.png" },
                { image: "../../assets/imgs/016-man-10.png" },
                { image: "../../assets/imgs/017-man-9.png" },
                { image: "../../assets/imgs/018-man-8.png" },
                { image: "../../assets/imgs/019-man-7.png" },
                { image: "../../assets/imgs/020-man-6.png" },
                { image: "../../assets/imgs/021-man-5.png" },
                { image: "../../assets/imgs/022-man-4.png" },
                { image: "../../assets/imgs/023-man-3.png" },
                { image: "../../assets/imgs/024-man-2.png" },
                { image: "../../assets/imgs/025-man-1.png" },
                { image: "../../assets/imgs/026-man.png" },
                { image: "../../assets/imgs/027-boy-6.png" },
                { image: "../../assets/imgs/028-boy-5.png" },
                { image: "../../assets/imgs/029-boy-4.png" },
                { image: "../../assets/imgs/030-boy-3.png" },
                { image: "../../assets/imgs/031-boy-2.png" },
                { image: "../../assets/imgs/032-boy-1.png" },
                { image: "../../assets/imgs/033-boy.png" },
                { image: "../../assets/imgs/034-woman-2.png" },
                { image: "../../assets/imgs/035-woman-1.png" },
                { image: "../../assets/imgs/036-woman.png" }]
      
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http:Http,public loadingCtrl: LoadingController) {  }
    
     
      
    createProfile(){
        let currentIndex = localStorage.avatarNumber;;
        if(currentIndex == undefined){
            currentIndex = 0;
    }
    let info = {"firstname":this.firstname,
                "lastname":this.lastname,
                "username":this.username,
                "password":this.password,
                "email":this.email,
                "imgsrc":currentIndex};
        if(this.firstname == "" || this.firstname == undefined || this.firstname == null){
            let toast = this.toastCtrl.create({
              message: 'Please enter Firstname!!',
              duration: 2000
            });
            toast.present();    
        }else if(this.lastname == "" || this.lastname == undefined || this.lastname == null){
            let toast = this.toastCtrl.create({
              message: 'Please enter Lastname!!',
              duration: 2000
            });
            toast.present();
        }else if(this.email == "" || this.email == undefined || this.email == null){
            let toast = this.toastCtrl.create({
              message: 'Please enter Email!!',
              duration: 2000
            });
            toast.present();
        }else if(this.username == "" || this.username == undefined || this.username == null){
            let toast = this.toastCtrl.create({
              message: 'Please enter Username!!',
              duration: 2000
            });
            toast.present();
        }else if(this.password == "" || this.password == undefined || this.password == null){
            let toast = this.toastCtrl.create({
              message: 'Please enter Password!!',
              duration: 2000
            });
            toast.present();
        }else{
            let loading = this.loadingCtrl.create({
                content: 'Creating Profile......'
              });
            loading.present();
            
             this.http.post(
              'https://api.mlab.com/api/1/databases/celltrak/collections/loginCredentials?apiKey=cAcQAeQrda2NeCXvYdHPoENnfxokPari',
              info
            ).subscribe(data => {
                console.log(data)
                loading.dismiss();
                let toast = this.toastCtrl.create({
                      message: 'New User Created!!',
                      duration: 3000
                    });
                    toast.present();
                this.navCtrl.push(LoginPage);
            })
            
        }
    
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUserFormPage');
    }

}
