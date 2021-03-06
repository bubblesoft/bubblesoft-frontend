/**
 * Created by qhyang on 2017/3/17.
 */

import { Directive, ElementRef, OnChanges, Input } from "@angular/core";

import { delay } from "rxjs/operator/delay";

import { GridStackService } from "../home/grid-stack.service";
import { BomService } from "../bom.service";

const jQuery = require("jquery");

@Directive({ selector: "[animated-background]" })
export class AnimatedBackgroundDirective implements OnChanges {
    @Input() index: string;
    @Input() type: string;
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService, private bomService: BomService) { }

    ngOnChanges() {
        jQuery(this.el.nativeElement).empty();
        this.init();
    }

    init() {
        this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().get(0);
        if (this.type === "wind-and-sand") {
            let windAndSand = require("../../scripts/wind-and-sand");

            windAndSand(this.el.nativeElement);
        } else if (this.type === "random-walkers") {
            const RandomWalkers = require("../../scripts/random-walkers");

            let randomWalkers = RandomWalkers(this.el.nativeElement);

            this.gridStackService.on("resizestop").subscribe((event) => {
                if (event.target === this.gridItemContainer) {
                    setTimeout(() => randomWalkers.resize(), 300);
                }
            });
            delay.call(this.bomService.onWindowResize(), 300)
                .subscribe(() => randomWalkers.resize());
        }
    }
}
