import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms/forms";
import { AuthService } from "../../services/auth-service";

@IonicPage()
@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html',
})
export class SigninPage {

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private auth: AuthService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SigninPage');
    }

    onSignin(form: NgForm) {
        console.log(form.value);

        const loading = this.loadingCtrl.create({
            content: "Signing you up"
        });
        loading.present();

        this.auth.signin(form.value.email, form.value.password)
            .then(data => {
                console.log(data);
                loading.dismiss();
            })
            .catch(error => {
                console.log(error);
                loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: "Signin failed",
                    message: error.message,
                    buttons: ['OK']
                });
                alert.present();
            });
    }
}
