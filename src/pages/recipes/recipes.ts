import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, LoadingController } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { RecipeService } from "../../services/recipe-service";
import { Recipe } from "../../models/recipe";
import { RecipePage } from "../recipe/recipe";
import { DbOptionsPage } from "../db-options/db-options";
import { AuthService } from "../../services/auth-service";

@IonicPage()
@Component({
    selector: 'page-recipes',
    templateUrl: 'recipes.html',
})
export class RecipesPage {
    public recipes: Recipe[] = [];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private recipeService: RecipeService,
        private popoverCtrl: PopoverController,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private auth: AuthService) {
    }

    private refreshRecipes() {
        this.recipes = this.recipeService.getRecipes();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RecipesPage');
    }

    ionViewWillEnter() {
        this.refreshRecipes();
    }

    onNewRecipe() {
        console.log("onNewRecipe clicked");
        this.navCtrl.push(EditRecipePage, { mode: 'New' } );
    }

    onLoadRecipe(recipe: Recipe, index: number) {
        this.navCtrl.push(RecipePage, { recipe: recipe, index: index });
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
                        this.recipeService.fetchList(token)
                            .subscribe((data) => {
                                console.log("Success");
                                if (data)
                                    this.recipes = JSON.parse(data);
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
                        this.recipeService.storeList(token)
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
