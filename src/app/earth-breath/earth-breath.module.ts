/**
 * Created by qhyang on 2017/2/21.
 */

import { NgModule }      from "@angular/core";

import { HomeComponent } from "./earth-breath.component";
import { HomeRoutingModule } from "./earth-breath-routing.module";

import { JumbotronComponent } from "./jumbotron.component";
import { CrystalNavComponent } from "./crystal-nav.component";
import { globeComponent } from "./globe.component";

import { ScrollSceneService } from "./scroll-scene.service";

import { ScrollPinDirective } from "./scroll-pin.directive";
import { ScrollUpDirective } from "./scroll-up.directive";
import { AstralScrollSceneDirective } from "./astral-scroll-scene.directive";
import { FallingLeavesScrollSceneDirective } from "./falling-leaves-scroll-scene.directive";
import { ScrollSceneTextDirective } from "./scroll-scene-text.directive";
import { StickUpDirective } from "../stick-up.directive";
import { RippleDirective } from "../ripple.directive";

@NgModule({
    imports:      [ HomeRoutingModule ],
    providers:    [ ScrollSceneService ],
    declarations: [
        HomeComponent,
        JumbotronComponent,
        CrystalNavComponent,
        globeComponent,
        ScrollPinDirective,
        ScrollUpDirective,
        AstralScrollSceneDirective,
        FallingLeavesScrollSceneDirective,
        ScrollSceneTextDirective,
        RippleDirective,
        StickUpDirective
    ]
})
export class HomeModule { }