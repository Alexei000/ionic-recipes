import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from "../pages/tabs/tabs";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { AuthService } from "../services/auth-service";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;
    signinPage: any = SigninPage;
    signupPage: any = SignupPage;
    isAuthenticated: boolean = false;

    @ViewChild("navRef")
    private navRef: NavController;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private menuCtrl: MenuController,
        private authService: AuthService) {

        firebase.initializeApp({
            apiKey: "AIzaSyBm-MlCmJE0KGo-BPxLBBmtmTBYi09_efU",
            authDomain: "ionic2-recipebook-5efc8.firebaseapp.com",
        });

        // console.log(firebase);

        firebase.auth().onAuthStateChanged(user => {
            // authenticated
            if (user) {
                this.isAuthenticated = true;
                this.navRef.setRoot(this.rootPage);
            } else {
                this.isAuthenticated = false;
                this.navRef.setRoot(this.signinPage);
            }
        });


        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    onLoad(page: any) {
        this.navRef.setRoot(page);
        this.menuCtrl.close();
    }

    onLogOut() {
        this.authService.logout();
    }
}

