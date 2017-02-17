/**
 * Created by qhyang on 2017/2/17.
 */

import {Component, OnInit} from "@angular/core";

import { BomService } from "./bom.service";

@Component({
    selector: "home-nav",
    template: `
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
    `,
    styles: [require("./home-nav.component.scss")]
})
export class HomeNavComponent implements OnInit{

    constructor(private bomService: BomService) {
    }

    ngOnInit() {
    }
}