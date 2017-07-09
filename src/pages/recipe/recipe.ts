import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from "../../models/recipe";
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { ShoppingListService } from "../../services/shopping-list-service";
import { RecipeService } from "../../services/recipe-service";

@IonicPage()
@Component({
    selector: 'page-recipe',
    templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
    public recipe: Recipe;
    public index: number;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private shoppingListService: ShoppingListService,
        private recipeService: RecipeService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RecipePage');
    }

    ngOnInit() {
        this.recipe = this.navParams.get("recipe");
        this.index = this.navParams.get("index");
    }

    onEditRecipe() {
        this.navCtrl.push(EditRecipePage, { mode: "Edit", recipe: this.recipe, index: this.index });
    }

    onAddIngredients() {
        this.shoppingListService.addItems(this.recipe.ingredients);
    }

    onDeleteRecipe() {
        this.recipeService.removeRecipe(this.index);
        this.navCtrl.popToRoot();
    }
}