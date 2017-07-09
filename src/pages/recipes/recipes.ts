import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { RecipeService } from "../../services/recipe-service";
import { Recipe } from "../../models/recipe";
import { RecipePage } from "../recipe/recipe";

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
        private recipeService : RecipeService) {
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
}
