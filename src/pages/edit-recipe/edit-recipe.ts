import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { RecipeService } from "../../services/recipe-service";
import { Recipe } from "../../models/recipe";
import { Ingredient } from "../../models/ingredient";

@IonicPage()
@Component({
    selector: 'page-edit-recipe',
    templateUrl: 'edit-recipe.html',
})
export class EditRecipePage {

    mode: string = "New";
    selectOptions: string[] = ["Easy", "Medium", "Difficult"];
    recipeForm: FormGroup;
    recipe: Recipe;
    index: number;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private recipeService: RecipeService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditRecipePage');
    }

    ngOnInit() {
        this.mode = this.navParams.get("mode");
        console.log("Edit recipe on init");
        console.log("Mode: ", this.mode);
        if (this.mode == "Edit") {
            this.recipe = this.navParams.get("recipe");
            if (!this.recipe.ingredients)
                this.recipe.ingredients = [];

            this.index = this.navParams.get("index");
        }

        this.initForm();
    }
     
    private initForm()
    {
        this.recipeForm = new FormGroup({
            'title': new FormControl(this.recipe ? this.recipe.title : null, Validators.required),
            'description': new FormControl(this.recipe ? this.recipe.description : null, Validators.required),
            'difficulty': new FormControl(this.recipe ? this.recipe.difficulty : "Medium", Validators.required),
            "ingredients": this.recipe ?
                new FormArray(this.recipe.ingredients.map(ingr => {
                    return new FormControl(ingr.name, Validators.required);
                })) :
                new FormArray([])
        });
    }

    onSubmit() {
        const val: Recipe = <Recipe>this.recipeForm.value;
        let ingredients = [];
        if (val.ingredients.length > 0) {
            ingredients = val.ingredients.map(n => { return { name: n, amount: 1 } });
        }

        if (this.mode != "Edit")
            this.recipeService.addRecipe(val.title, val.description, val.difficulty, ingredients);
        else
            this.recipeService.updateRecipe(this.index, val.title, val.description, val.difficulty, ingredients);

        this.recipeForm.reset();
        this.navCtrl.popToRoot();

        // console.log(this.recipeForm);
    }

    private createNewIngredientAlert() {
        const newIngrAlert = this.alertCtrl.create({
            title: "Add ingredient",
            inputs: [
                { name: "name", placeholder: "Name"}
            ],
            buttons: [ 
                {
                    text: "cancel",
                    role: "cancel",
                    handler: data => {
                    }
                },
                {
                    text: "Add",
                    handler: data => {
                        if (data.name == null || data.name.trim() == "") {
                            const toast = this.toastCtrl.create({
                                message: "Please enter a valid value!",
                                duration: 2000,
                                position: "bottom"
                            });
                            toast.present();
                            return;
                        }

                        (<FormArray>this.recipeForm.get("ingredients")).push(new FormControl(data.name, Validators.required));

                        const toast = this.toastCtrl.create({
                            message: "Item added!",
                            duration: 1000,
                            position: "bottom"
                        });
                        toast.present();
                    }
                }
            ]
        });

        return newIngrAlert;
    }

    onManageIngredients() {
        const actionSheet = this.actionSheetCtrl.create({
            title: "What do you what to do?",
            buttons: [
                {
                    text: "Add ingredient",
                    handler: () => {
                        actionSheet.onDidDismiss(() => {
                            this.createNewIngredientAlert().present();
                        });
                    }
                },
                {
                    text: "Remove ingredients",
                    role: "destructive",
                    handler: () => {
                        const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
                        const len = formArray.length;
                        for (let i = len - 1; i >= 0; i--)
                            formArray.removeAt(i);
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        });

        actionSheet.present();
    }
}
