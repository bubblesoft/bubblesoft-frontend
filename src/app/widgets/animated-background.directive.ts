/**
 * Created by qhyang on 2017/3/17.
 */

import { Directive, ElementRef, AfterViewInit, Input } from "@angular/core";

import { delay } from "rxjs/operator/delay";

import { GridStackService } from "../home/grid-stack.service";
import { BomService } from "../bom.service";

@Directive({ selector: "[animated-background]" })
export class AnimatedBackgroundDirective implements AfterViewInit {
    @Input() index: string;
    gridItemContainer: HTMLElement;

    constructor(private el: ElementRef, private gridStackService: GridStackService, private bomService: BomService) { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.gridStackService.getWidgetData().subscribe((gridStackData: any) => {
                const jQuery = require("jquery"),
                    type = gridStackData[this.index].config.type;

                this.gridItemContainer = jQuery(this.el.nativeElement).parent().parent().parent().get(0);
                if (type === "wind-and-sand") {
                    let windAndSand = require("../../scripts/wind-and-sand");

                    windAndSand(this.el.nativeElement);
                } else if (type === "random-walkers") {
                    const RandomWalkers = require("../../scripts/random-walkers");

                    let randomWalkers = RandomWalkers(this.el.nativeElement);

                    this.gridStackService.on("resizestop").subscribe((event) => {
                        if (event.target === this.gridItemContainer) {
                            setTimeout(() => randomWalkers.resize(), 300);
                        }
                    });
                    delay.call(this.bomService.windowResize(), 300)
                        .subscribe(() => randomWalkers.resize());
                }
            });
        }, 300);
    }
}
