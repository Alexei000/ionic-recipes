import { Ingredient } from "../models/ingredient";

export class ShoppingListService {
    private ingredients: Ingredient[] = [];

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
}