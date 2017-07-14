import { Ingredient } from "../models/ingredient";
import { HttpModule, Http, Response } from "@angular/http";
import { AuthService } from "./auth-service";
import "rxjs/Rx";
import { Inject } from "@angular/core"; 

export class ShoppingListService {
    private ingredients: Ingredient[] = []; // Ingredient[] = [];

    constructor(
        @Inject(Http) private http: Http,
        @Inject(AuthService) private auth: AuthService) {
    }

    // no overloading allowed
    //addItem(ingredient: Ingredient) {
    //    this.ingredients.push(ingredient);
    //}

    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    getItems() {
        // copy the array
        return this.ingredients.slice();
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.auth.getActiveUser().uid;
        return this.http
            .put("https://ionic2-recipebook-5efc8.firebaseio.com/" + userId + '/' + 'shoppingList.json?auth=' + token, this.ingredients)
            .map((response: Response) => {
                console.log("Store list - response from firebase: ", response.json);
                return response.json;
            });
    }

    fetchList(token: string) {
        const userId = this.auth.getActiveUser().uid;
        let url = "https://ionic2-recipebook-5efc8.firebaseio.com/" + userId + '/' + 'shoppingList.json?auth=' + token;
        console.log(url);

        return this.http
            .get(url)
            .map((response: Response) => {
                console.log("Fetch list - response from firebase: ", response.text());
                return response.text();
            })
            .do(data => {
                console.log("Loaded data (do function): ", data);
                this.ingredients = JSON.parse(data);
            });
    }
}