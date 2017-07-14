import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth-service";

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private auth: AuthService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    onSignup(form: NgForm) {
        // console.log("Form data:", form);

        const loading = this.loadingCtrl.create({
            content: "Signing you up"
        });
        loading.present();

        this.auth.signup(form.value.email, form.value.password)
            .then(data => {
                console.log(data);
                loading.dismiss();
            })
            .catch(error => {
                console.log(error);
                loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: "Signup failed",
                    message: error.message,
                    buttons: ['OK']
                });
                alert.present();
            });
    }
}