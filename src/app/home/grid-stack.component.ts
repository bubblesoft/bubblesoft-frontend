/**
 * Created by qhyang on 2017/3/7.
 */

import { Subscription } from "rxjs";
import { Compiler, Component, NgModuleFactory, AfterViewInit, OnDestroy } from "@angular/core";

import "gridstack";
import "gridstack/dist/gridstack.css";

import { WidgetsModule } from "../widgets/widgets.module";

import { GridStackService } from "./grid-stack.service";

import { Widget } from "../interfaces";

@Component({
    selector: "grid-stack",
    template: require("./grid-stack.component.pug"),
    styles: [ require("./grid-stack.component.scss") ]
})
export class gridStackComponent implements AfterViewInit, OnDestroy {
    widgets: Widget[];
    widgetsModule: NgModuleFactory<any>;
    subscriptions: Subscription[];

    constructor(compiler: Compiler, private gridStackService: GridStackService) {
        this.widgetsModule = compiler.compileModuleSync(WidgetsModule);
        this.subscriptions = [];
    }

    ngAfterViewInit() {
        let jQuery = require("jquery");

        let options = {
            acceptWidgets: true,
            cellHeight: "auto",
            verticalMargin: 10,
            alwaysShowResizeHandle: true,
            animate: true,
            disableDrag: true,
            disableResize: true,
            handle: ".grid-stack-item-handle",
            removable: true
        };

        this.gridStackService.prepare().subscribe((gridStackData: any) => {
            this.widgets = gridStackData;
            setTimeout(() => {
                this.gridStackService.init(jQuery(".grid-stack").get(0), options).subscribe(() => {
                    this.subscriptions.push(this.gridStackService.on("resizestart").subscribe((event) => {
                        jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
                    }));
                    this.subscriptions.push(this.gridStackService.on("resizestop").subscribe((event) => {
                        jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
                    }));
                    this.subscriptions.push(this.gridStackService.on("dragstart").subscribe((event) => {
                        jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
                    }));
                    this.subscriptions.push(this.gridStackService.on("dragstop").subscribe((event) => {
                        jQuery(event.target).toggleClass("mdl-shadow--2dp mdl-shadow--6dp");
                    }));
                });
            }, 200);
        });
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
        this.gridStackService.destroy();
    }
    onClose(index: number) {
        if (this.widgets[index].type !== "header") {
            this.gridStackService.removeWidget(index);
        }
    }
}
