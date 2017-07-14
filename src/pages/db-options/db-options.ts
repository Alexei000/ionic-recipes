import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
    selector: "db-options",
    templateUrl:  "db-options.html"
})
export class DbOptionsPage {
    constructor(private viewCtrl: ViewController) {
    }

    onAction(action: string) {
        console.log("DbOptionsPage on action " + action);
        this.viewCtrl.dismiss({ action: action });
    }
}