import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth-service";
import "rxjs/Rx";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [];

    constructor(
        private http: Http,
        private auth: AuthService) {
    }

    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
        console.log("Recipes after add:", this.recipes);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.auth.getActiveUser().uid;
        return this.http
            .put("https://ionic2-recipebook-5efc8.firebaseio.com/" + userId + '/' + 'recipeList.json?auth=' + token, this.recipes)
            .map((response: Response) => {
                console.log("Store list - response from firebase: ", response.json);
                return response.json;
            });
    }

    fetchList(token: string) {
        const userId = this.auth.getActiveUser().uid;
        let url = "https://ionic2-recipebook-5efc8.firebaseio.com/" + userId + '/' + 'recipeList.json?auth=' + token;
        console.log(url);

        return this.http
            .get(url)
            .map((response: Response) => {
                console.log("Fetch list - response from firebase: ", response.text());
                return response.text();
            })
            .do(data => {
                console.log("Loaded data (do function): ", data);
                this.recipes = JSON.parse(data);
            });
    }
}