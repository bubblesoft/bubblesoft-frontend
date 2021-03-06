/**
 * Created by qhyang on 2017/3/22.
 */

import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from "@angular/core";

import { BomService } from "../bom.service";
import { ScrollSceneService } from "./scroll-scene.service"

@Directive({ selector: "[scrollUp]" })
export class ScrollUpDirective implements AfterViewInit, OnDestroy {
    @Input() offset: string;
    @Input() duration: string;
    private scrollScene: any;

    constructor(private el: ElementRef, private scrollSceneService: ScrollSceneService, private bomService: BomService) { }

    ngAfterViewInit() {
        this.el.nativeElement.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        `;

        // ScrollMagic
        require("gsap/tweenLite");

        const ScrollMagic = require("scrollmagic");

        require("../../scripts/animation.gsap");

        // build scroll scene
        this.scrollSceneService.addScene(
            this.scrollScene = new ScrollMagic.Scene({
                offset: parseInt(this.offset, 10) / 100 * this.bomService.getWindowHeight(),
                duration: this.duration
            })
                .setTween(this.el.nativeElement, {
                    top: "-120%"
                })
        );
    }

    ngOnDestroy() {
        this.scrollSceneService.removeScene(this.scrollScene);
        this.scrollScene.destroy();
    }
}
