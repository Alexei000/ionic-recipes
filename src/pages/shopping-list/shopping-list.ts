import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list-service";
import { Ingredient } from "../../models/ingredient";

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
        public shoppingListService: ShoppingListService) {
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

}
