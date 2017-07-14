import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list-service";
import { Ingredient } from "../../models/ingredient";
import { AuthService } from "../../services/auth-service";
import { DbOptionsPage } from "../db-options/db-options";

@IonicPage()
@Component({
    selector: 'page-shopping-list',
    templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

    listItems: Ingredient[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public shoppingListService: ShoppingListService,
        private popoverCtrl: PopoverController,
        private auth: AuthService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ShoppingListPage');
    }

    private refreshItems() {
        this.listItems = this.shoppingListService.getItems();
    }

    ionViewWillEnter () {
        this.refreshItems();
    }

    onAddItem(form: NgForm) {
        this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
        this.refreshItems();
    }

    removeItem(index: number) {
        console.log("Removing index " + index);
        this.shoppingListService.removeItem(index);
        this.refreshItems();
    }

    onShowOptions(event: MouseEvent) {
        const popover = this.popoverCtrl.create(DbOptionsPage);
        popover.present({ ev: event });

        popover.onDidDismiss(data => {
            if (!data)
                return;

            console.log("Dismissed the popover with action " + data.action);
            var loading = this.loadingCtrl.create({
                content: "Please wait..."
            });

            if (data.action === "load") {
                loading.present();

                this.auth.getActiveUser().getToken()
                    .then((token: string) => {
                        console.log("Load data - token = ", token);
                        loading.dismiss();
                        this.shoppingListService.fetchList(token)
                            .subscribe((data) => {
                                console.log("Success");
                                if (data)
                                    this.listItems = JSON.parse(data);
                            },
                            error => this.handleError(error.json().error)
                            );
                    });
            }
            else if (data.action == "store") {
                loading.present();

                this.auth.getActiveUser().getToken()
                    .then((token: string) => {
                        console.log("Store data - token = ", token);
                        loading.dismiss();
                        this.shoppingListService.storeList(token)
                            .subscribe(
                            () => console.log("Success"),
                            error => this.handleError(error.json().error)
                            );
                    });
            }
        });
    }

    handleError(errorMessage: string) {
        const alert = this.alertCtrl.create({
            title: "An error has occurred",
            message: errorMessage,
            buttons: ["OK"]
        });

        alert.present();
    }
}
