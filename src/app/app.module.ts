import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, Http } from '@angular/http';

import { MyApp } from './app.component';
import { EditRecipePage } from "../pages/edit-recipe/edit-recipe";
import { RecipesPage } from "../pages/recipes/recipes";
import { RecipePage } from "../pages/recipe/recipe";
import { ShoppingListPage } from "../pages/shopping-list/shopping-list";
import { TabsPage } from "../pages/tabs/tabs";
import { ShoppingListService } from "../services/shopping-list-service";
import { RecipeService } from "../services/recipe-service";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { AuthService } from "../services/auth-service";
import { DbOptionsPage } from "../pages/db-options/db-options";

@NgModule({
    declarations: [
        MyApp,
        EditRecipePage,
        RecipePage,
        RecipesPage,
        ShoppingListPage,
        TabsPage,
        SigninPage,
        SignupPage,
        DbOptionsPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EditRecipePage,
        RecipePage,
        RecipesPage,
        ShoppingListPage,
        TabsPage,
        SigninPage,
        SignupPage,
        DbOptionsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        ShoppingListService,
        RecipeService,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
